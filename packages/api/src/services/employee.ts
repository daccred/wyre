import { prisma } from "@wyrecc/db";

import { TRPCError } from "@trpc/server";

import type { IEmployeeSchema } from "../interfaces";
import { ServerError } from "../utils/server-error";

export class EmployeeService {
  static async createEmployee(input: IEmployeeSchema) {
    try {
      const employeeExists = await prisma.team.findUnique({
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
      const employee = await prisma.team.create({
        data: {
          firstName: input.name,
          lastName: input.name,
          email: input.email,
          department: input.department,
          jobRole: input.jobRole,
          salary: input.salary,
          signBonus: input.signBonus,
          teamCategory: input.category,
        },
      });

      if (!employee)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create employee",
        });

      return employee;
    } catch (error) {
      ServerError(error);
    }
  }
  static async updateEmployee(employeeId: string, input: IEmployeeSchema) {
    try {
      const employee = await prisma.team.update({
        where: { id: employeeId },
        data: {
          firstName: input.name,
          lastName: input.name,
          email: input.email,
          department: input.department,
          jobRole: input.jobRole,
          salary: input.salary,
          status: input.status,
          teamCategory: input.category,
        },
      });

      if (!employee)
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Failed to update employee",
        });

      return employee;
    } catch (error) {
      ServerError(error);
    }
  }
  static async deleteEmployee(employeeId: string) {
    try {
      const employee = await prisma.team.delete({
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
      ServerError(error);
    }
  }

  static async getSingleEmployee(employeeId: string) {
    try {
      const employee = await prisma.team.findFirst({
        where: { teamCategory: "EMPLOYEE", id: employeeId },
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
      ServerError(error);
    }
  }

  static async getSingleContractor(employeeId: string) {
    try {
      const employee = await prisma.team.findFirst({
        where: { teamCategory: "CONTRACTOR", id: employeeId },
      });

      if (!employee) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employee not found",
        });
      }
      return employee;
    } catch (error) {
      ServerError(error);
    }
  }
  static async getEmployees() {
    try {
      const employees = await prisma.team.findMany({
        where: { teamCategory: "EMPLOYEE" },
      });

      if (!employees) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employees not found",
        });
      }

      return employees;
    } catch (error) {
      ServerError(error);
    }
  }
  static async getContractors() {
    try {
      const employees = await prisma.team.findMany({
        where: { teamCategory: "CONTRACTOR" },
      });

      if (!employees) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employees not found",
        });
      }

      return employees;
    } catch (error) {
      ServerError(error);
    }
  }
}
