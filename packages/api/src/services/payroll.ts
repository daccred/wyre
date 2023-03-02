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
      });

      if (!employees)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employees not found",
        });

      const contractors = await prisma.contractor.findMany({
        where: {
          id: {
            in: input.contractors,
          },
        },
      });
      if (!contractors)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Contractors not found",
        });

      const payroll = await prisma.payroll.create({
        data: {
          id: input.id,
          title: input.title,
          cycle: input.cycle,
          payday: input.payday,
          auto: input.auto,
          burden: input.burden,
          currency: input.currency,
          employees: {
            createMany: { data: employees },
          },
          contractors: {
            createMany: { data: contractors },
          },
        },
        include: {
          employees: true,
          contractors: true,
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
      throw new Error(JSON.stringify(error as string));
    }
  }

  static async getSinglePayroll(id: string) {
    try {
      const payroll = await prisma.payroll.findUnique({
        where: {
          id,
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
      const payrolls = await prisma.payroll.findMany();
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

  static async updatePayroll(input: IPayrollSchema) {
    try {
      const payroll = await prisma.payroll.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!payroll) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Payroll not found",
        });
      }

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
        },
      });
      if (!updatePayroll) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payroll",
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
