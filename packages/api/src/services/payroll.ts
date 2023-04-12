import { prisma } from '@wyrecc/db';

import { TRPCError } from '@trpc/server';

import type { IPayrollSchema, PayrollScheduleData } from '../interfaces/payroll';
import { createPayrollPublisher } from '../publishers/payroll.publisher';
import { ServerError } from '../utils/server-error';

export class PayrollService {
  static async createPayroll(input: IPayrollSchema) {
    try {
      const payrollExists = await prisma.payroll.findFirst({
        where: {
          title: input.title,
        },
      });

      if (payrollExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Payroll with name ${input.title} already exists`,
        });
      }
      const employees = await prisma.team.findMany({
        where: {
          teamCategory: 'EMPLOYEE',
          id: {
            in: input.employees,
          },
        },
        select: {
          id: true,
        },
      });

      if (!employees || employees.length === 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Add employees to create a payroll',
        });
      }

      const payroll = await prisma.payroll.create({
        data: {
          title: input.title,
          cycle: input.cycle,
          payday: input.payday,
          auto: input.auto,
          suspend: false,
          burden: input.burden,
          currency: input.currency,
          employees: { connect: employees },
        },
      });

      if (!payroll) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create payroll',
        });
      }

      return payroll;
    } catch (error) {
      ServerError(error);
    }
  }

  static async getSinglePayroll(id: string) {
    try {
      const payroll = await prisma.payroll.findUnique({
        where: {
          id,
        },
        include: {
          employees: true,
        },
      });

      if (!payroll)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payroll not found',
        });
      return payroll;
    } catch (error) {
      ServerError(error);
    }
  }

  static async getPayrolls() {
    try {
      const payrolls = await prisma.payroll.findMany({
        include: {
          employees: true,
        },
      });
      if (!payrolls)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payrolls not found',
        });
      return payrolls;
    } catch (error) {
      ServerError(error);
    }
  }

  static async updatePayroll(id: string, input: IPayrollSchema) {
    try {
      const payroll = await prisma.payroll.findUnique({
        where: {
          id,
        },
        include: { employees: true },
      });

      if (!payroll) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payroll not found',
        });
      }

      const employees = await prisma.team.findMany({
        where: {
          id: {
            in: input.employees,
          },
        },
        select: {
          id: true,
        },
      });

      const updatePayroll = await prisma.payroll.update({
        where: {
          id: payroll.id,
        },
        data: {
          title: input.title,
          cycle: input.cycle,
          payday: input.payday,
          auto: input.auto,
          suspend: input.suspend,
          burden: input.burden,
          currency: input.currency,
          employees: { connect: employees },
        },
      });
      if (!updatePayroll) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Failed to update payroll',
        });
      }
      return payroll;
    } catch (error) {
      ServerError(error);
    }
  }

  static async deletePayroll(id: string) {
    try {
      const payroll = await prisma.payroll.delete({
        where: {
          id,
        },
      });

      if (!payroll) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create payroll',
        });
      }
      return 'Payroll deleted successfully';
    } catch (error) {
      ServerError(error);
    }
  }

  static async removeEmployee(payrollId: string, employeeId: string) {
    try {
      const payroll = await prisma.payroll.update({
        where: {
          id: payrollId,
        },
        data: {
          employees: {
            disconnect: {
              id: employeeId,
            },
          },
        },
      });

      if (!payroll) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create payroll',
        });
      }
      return 'Employee removed successfully';
    } catch (error) {
      ServerError(error);
    }
  }

  static async processPayRoll(id: string) {
    try {
      // check for the payroll
      const payroll = await prisma.payroll.findUnique({
        where: { id },
        include: {
          employees: {
            include: {
              bank: true,
              cryptoWallet: true,
              mobileMoney: true,
            },
            where: {
              OR: [
                { cryptoWallet: { is: { NOT: undefined } } },
                { bank: { is: { NOT: undefined } } },
                { mobileMoney: { is: { NOT: undefined } } },
              ],
            },
          },
        },
      });

      
      if (!payroll) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Payroll with id ${id} not found`,
        });
      }
      
      // const processPayrollData: PayrollScheduleData[] = [];
      
      /**
       * In the optimized code, we use Promise.all to run the database queries for each employee in parallel.
       * We also simplify the switch statement by defining a default case that does not modify queueObject.recipientPaymentDetail.
       * Finally, we push the queueObject into the processPayrollData array after all the database queries have been completed.
       **/
      
      const processPayrollData: PayrollScheduleData[] = await Promise.all(
        payroll.employees.map(async (item) => {
          let recipientPaymentDetail = null;
          switch (item.payrollMethod) {
            case 'BANK':
              recipientPaymentDetail = await prisma.bank.findUnique({ where: { personnelId: item.id } });
              break;
              case 'CRYPTO':
                recipientPaymentDetail = await prisma.cryptoWallet.findUnique({
                  where: { personnelId: item.id },
                });
                break;
                case 'MOBILEMONEY':
                  recipientPaymentDetail = await prisma.mobileMoney.findUnique({
                    where: { personnelId: item.id },
                  });
                  break;
                  default:
                    recipientPaymentDetail = await prisma.bank.findUnique({ where: { personnelId: item.id } });
                  }
                  
                  // if (!recipientPaymentDetail) {
                    //   throw new TRPCError({
                      //     code: 'NOT_FOUND',
                      //     message: `Payment details for employee with id ${item.id} not found`,
                      //   });
                      // }
                      
                      return {
                        payroll: id,
                        recipientDetails: item,
                        paymentMethod: item.payrollMethod,
                        recipientPaymentDetail,
                      };
                    })
                    );
                    console.log({payroll, processPayrollData})
                    
                    /* Get the delay params for scheduling */
                    const now = new Date(); // current date and time
                    const diffInMilliseconds = new Date(payroll.payday).getTime() - now.getTime();
                    /**
                     * replace method with a regular expression that matches one or more whitespace characters
                     * (\s+) and replaces them with an underscore character (_).
                     **/
                    const operationName = payroll.title.replace(/\s+/g, '_').toLowerCase();
                    
                    // added the payroll to the queue
                    await createPayrollPublisher({
                      name: operationName,
                      data: payroll.employees as unknown as PayrollScheduleData[],
                      delay: diffInMilliseconds,
                    });
                    // await PayrollQueue.add(PayrollData, { attempts: 5 });
                    
                    return {
                      message: `${operationName} payroll scheduled for ${payroll.payday}`,
                      scheduled: diffInMilliseconds,
                      payload: payroll,
                    };
                  } catch (error) {
                    ServerError(error);
                  }
                }
              }
              