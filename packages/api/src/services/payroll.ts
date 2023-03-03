import { IPayrollSchema } from "../interfaces/payroll";
import { TRPCError } from "@trpc/server";
import { prisma } from "@wyre-zayroll/db";

export class PayrollService {
  static async createPayroll(input: IPayrollSchema) {
    try {
      const employees = await prisma.employee.findMany({
        where: {
          id: {
            in: input.employees,
          },
        },
        select: {
          id: true,
        },
      });

      const contractors = await prisma.contractor.findMany({
        where: {
          id: {
            in: input.contractors,
          },
        },
        select: {
          id: true,
        },
      });

      const payroll = await prisma.payroll.create({
        data: {
          title: input.title,
          cycle: input.cycle,
          payday: input.payday,
          auto: input.auto,
          burden: input.burden,
          currency: input.currency,
          contractors: { connect: contractors },
          employees: { connect: employees },
        },
      });

      if (!payroll) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payroll",
        });
      }

      console.warn(payroll);
      return payroll;
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      console.warn(error);
    }
  }

  static async getSinglePayroll(id: string) {
    try {
      const payroll = await prisma.payroll.findUnique({
        where: {
          id,
        },
        select: {
          contractors: true,
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
      throw new Error(JSON.stringify(error as string));
    }
  }

  static async getPayrolls() {
    try {
      const payrolls = await prisma.payroll.findMany({
        select: {
          id: true,
          title: true,
          cycle: true,
          payday: true,
          auto: true,
          burden: true,
          currency: true,
          contractors: true,
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
      throw new Error(JSON.stringify(error as string));
    }
  }

  static async updatePayroll(id: string, input: IPayrollSchema) {
    try {
      const payroll = await prisma.payroll.findUnique({
        where: {
          id,
        },
        include: { contractors: true, employees: true },
      });

      if (!payroll) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Payroll not found",
        });
      }

      const employees = await prisma.employee.findMany({
        where: {
          id: {
            in: input.employees,
          },
        },
        select: {
          id: true,
        },
      });
      const contractors = await prisma.contractor.findMany({
        where: {
          id: {
            in: input.contractors,
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
          burden: input.burden,
          currency: input.currency,
          contractors: { connect: contractors },
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
      throw new Error(JSON.stringify(error as string));
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
      throw new Error(JSON.stringify(error as string));
    }
  }

  static async removeContractor(payrollId: string, contractorId: string) {
    try {
      const payroll = await prisma.payroll.update({
        where: {
          id: payrollId,
        },
        data: {
          contractors: {
            disconnect: {
              id: contractorId,
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
      return "Contractor removed successfully";
    } catch (error) {
      throw new Error(JSON.stringify(error as string));
    }
  }
  static async removeEmployee(payrollId: string, employeeId: string) {
    try {
      const payroll = await prisma.payroll.update({
        where: {
          id: payrollId,
        },
        data: {
          contractors: {
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
      throw new Error(JSON.stringify(error as string));
    }
  }
}
