import { TRPCError } from "@trpc/server";
import { prisma } from "@wyre-zayroll/db";
import { IEmployeeSchema } from "../interfaces";
import { ServicesError } from "./ServiceErrors";

export class EmployeeService {
  static async createEmployee(input: IEmployeeSchema) {
    try {
      const employeeExists = await prisma.employee.findUnique({
        where: {
          email: input.email,
        },
      });

      if (employeeExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "employee already exists",
        });
      }
      const employee = await prisma.employee.create({
        data: {
          name: input.name,
          email: input.email,
          department: input.department,
          jobRole: input.jobRole,
          salary: input.salary,
          signBonus: input.signBonus,
          category: input.category,
        },
      });

      if (!employee)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create employee",
        });

      return employee;
    } catch (error) {
      ServicesError(error);
    }
  }
  static async updateEmployee(employeeId: string, input: IEmployeeSchema) {
    try {
      const employee = await prisma.employee.update({
        where: { id: employeeId },
        data: {
          name: input.name,
          email: input.email,
          department: input.department,
          jobRole: input.jobRole,
          salary: input.salary,
          status: input.status,
          category: input.category,
        },
      });

      if (!employee)
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Failed to update employee",
        });

      return employee;
    } catch (error) {
      ServicesError(error);
    }
  }
  static async deleteEmployee(employeeId: string) {
    try {
      const employee = await prisma.employee.delete({
        where: { id: employeeId },
      });

      if (!employee) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to delete employee",
        });
      }
      return "employee deleted successfully";
    } catch (error) {
      ServicesError(error);
    }
  }

  static async getSingleEmployee(employeeId: string) {
    try {
      const employee = await prisma.employee.findFirst({
        where: { category: "EMPLOYEE", id: employeeId },
        include: { expense: true, payroll: true },
      });

      if (!employee) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employee not found",
        });
      }
      return employee;
    } catch (error) {
      ServicesError(error);
    }
  }

  static async getSingleContractor(employeeId: string) {
    try {
      const employee = await prisma.employee.findFirst({
        where: { category: "CONTRACTOR", id: employeeId },
      });

      if (!employee) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employee not found",
        });
      }
      return employee;
    } catch (error) {
      ServicesError(error);
    }
  }
  static async getEmployees() {
    try {
      const employees = await prisma.employee.findMany({
        where: { category: "EMPLOYEE" },
      });

      if (!employees) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employees not found",
        });
      }

      return employees;
    } catch (error) {
      ServicesError(error);
    }
  }
  static async getContractors() {
    try {
      const employees = await prisma.employee.findMany({
        where: { category: "CONTRACTOR" },
      });

      if (!employees) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employees not found",
        });
      }

      return employees;
    } catch (error) {
      ServicesError(error);
    }
  }
}
