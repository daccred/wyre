import { PayrollQueue } from "../bullQueue/payroll-queue";
import type { PayrollQueueSchema } from "../interfaces/payroll-queue";

import { prisma } from "@wyrecc/db";

import { TRPCError } from "@trpc/server";

import type { IPayrollSchema } from "../interfaces/payroll";
import { ServerError } from "../utils/server-error";

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
          code: "BAD_REQUEST",
          message: `Payroll with name ${input.title} already exists`,
        });
      }
      const employees = await prisma.team.findMany({
        where: {
          teamCategory: "EMPLOYEE",
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
          code: "BAD_REQUEST",
          message: "Add employees to create a payroll",
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
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payroll",
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
          code: "NOT_FOUND",
          message: "Payroll not found",
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
          code: "NOT_FOUND",
          message: "Payrolls not found",
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
          code: "NOT_FOUND",
          message: "Payroll not found",
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
          code: "PRECONDITION_FAILED",
          message: "Failed to update payroll",
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
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payroll",
        });
      }
      return "Payroll deleted successfully";
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
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payroll",
        });
      }
      return "Employee removed successfully";
    } catch (error) {
      ServerError(error);
    }
  }

  static async processPayRoll(id: string) {
    // check for the payroll
    const payroll = await prisma.payroll.findUnique({ where: { id }, include: { employees: true } });
    if (payroll === null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Payroll with id ${id} not found`,
      });
    }
    const PayrollData: Array<PayrollQueueSchema> = [];
    // looping through the employees
    payroll.employees.map(async (item) => {
      const queueObject: PayrollQueueSchema = {
        payroll: id,
        recipientDetails: item,
        paymentMethod: item.payrollMethod,
        recipientPaymentDetail: null,
      };
      switch (item.payrollMethod) {
        case "BANK": {
          const bank = await prisma.bank.findUnique({ where: { personnelId: item.id } });
          queueObject["recipientPaymentDetail"] = bank;
          break;
        }
        case "CRYPTO": {
          const wallet = await prisma.cryptoWallet.findUnique({ where: { personnelId: item.id } });
          queueObject["recipientPaymentDetail"] = wallet;
          break;
        }
        case "MOBILEMONEY": {
          const mobileMoney = await prisma.mobileMoney.findUnique({ where: { personnelId: item.id } });
          queueObject["recipientPaymentDetail"] = mobileMoney;
          break;
        }
        default: {
          const bank = await prisma.bank.findUnique({ where: { personnelId: item.id } });
          queueObject["recipientPaymentDetail"] = bank;
        }
      }
      PayrollData.push(queueObject);
    });
    // added the payroll to the queue
    await PayrollQueue.add(PayrollData, { attempts: 5 });

    return "Payroll added to the queue";
  }
}
