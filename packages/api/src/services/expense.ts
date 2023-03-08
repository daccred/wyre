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
          code: "NOT_FOUND",
          message: "Failed to create expense",
        });
      }

      return expense;
    } catch (error) {
      ServicesError(error);
    }
  }
}
