import { IExpenseSchema } from "../interfaces";
import { ServicesError } from "./ServiceErrors";
import { prisma } from "@wyre-zayroll/db";
import { TRPCError } from "@trpc/server";

export class ExpenseService {
  static async createExpense(input: IExpenseSchema) {
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

      if (!employees || employees.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employees not found",
        });
      }

      const expense = await prisma.expense.create({
        data: {
          amount: input.amount,
          description: input.description,
          employees: { connect: employees },
        },
      });

      if (!expense) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create expense",
        });
      }

      return expense;
    } catch (error) {
      ServicesError(error);
      console.error(error);
    }
  }

  static async updateExpense(expenseId: string, input: IExpenseSchema) {
    try {
      const employees = await prisma.employee.findMany({
        where: {
          category: "EMPLOYEE",
          id: {
            in: input.employees,
          },
        },
        select: {
          id: true,
        },
      });
      const expense = await prisma.expense.update({
        where: { id: expenseId },
        data: {
          amount: input.amount,
          description: input.description,
          employees: { connect: employees },
        },
      });

      if (!expense) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to update expense",
        });
      }

      return expense;
    } catch (error) {
      ServicesError(error);
    }
  }

  static async deleteExpense(expenseId: string) {
    try {
      const expense = await prisma.expense.delete({
        where: { id: expenseId },
      });

      if (!expense) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to delete expense",
        });
      }
      return expense;
    } catch (error) {
      ServicesError(error);
    }
  }

  static async getSingleExpense(expenseId: string) {
    try {
      const expense = await prisma.expense.findUnique({
        where: { id: expenseId },
        include: { employees: true },
      });
      if (!expense) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Expense not found",
        });
      }
    } catch (error) {
      ServicesError(error);
    }
  }

  static async getExpenses() {
    try {
      const expenses = await prisma.expense.findMany({
        include: { employees: true },
      });
      if (!expenses) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Expenses not found",
        });
      }
      return expenses;
    } catch (error) {
      ServicesError(error);
    }
  }
}
