import { prisma } from '@wyrecc/db';

import { TRPCError } from '@trpc/server';

import type { IExpenseSchema } from '../interfaces';
import { ServerError } from '../utils/server-error';

export class ExpenseService {
  static async createExpense(input: IExpenseSchema) {
    try {
      const employee = await prisma.team.findFirst({
        where: {
          id: {
            in: input.employeeId,
          },
        },
        select: {
          id: true,
        },
      });

      if (!employee) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Employee not found',
        });
      }

      const expense = await prisma.expense.create({
        data: {
          amount: input.amount,
          date: input.date,
          type: input.type,
          status: input.status,
          description: input.description,
          attachment: {
            create: {
              title: input.attachment.title,
              url: input.attachment.url,
            },
          },
          employeeId: employee.id,
        },
      });

      if (!expense) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create expense',
        });
      }

      return expense;
    } catch (error) {
      ServerError(error);
      console.error(error);
    }
  }

  static async updateExpense(expenseId: string, input: IExpenseSchema) {
    try {
      const employee = await prisma.team.findFirst({
        where: {
          teamCategory: 'EMPLOYEE',
          id: input.employeeId,
        },
        select: {
          id: true,
        },
      });
      if (!employee) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Employee not found' });
      }
      const expense = await prisma.expense.update({
        where: { id: expenseId },
        data: {
          date: input.date,
          type: input.type,
          status: input.status,
          amount: input.amount,
          description: input.description,
          employeeId: employee.id,
        },
      });

      if (!expense) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to update expense',
        });
      }

      return expense;
    } catch (error) {
      ServerError(error);
    }
  }

  static async deleteExpense(expenseId: string) {
    try {
      const expense = await prisma.expense.delete({
        where: { id: expenseId },
      });

      if (!expense) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to delete expense',
        });
      }
      return expense;
    } catch (error) {
      ServerError(error);
    }
  }

  static async getSingleExpense(expenseId: string) {
    try {
      const expense = await prisma.expense.findUnique({
        where: { id: expenseId },
        include: { employee: true, attachment: true },
      });
      if (!expense) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Expense not found',
        });
      }
    } catch (error) {
      ServerError(error);
    }
  }

  static async getExpenses() {
    try {
      const expenses = await prisma.expense.findMany({
        include: { employee: true, attachment: true },
      });
      if (!expenses) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Expenses not found',
        });
      }
      return expenses;
    } catch (error) {
      ServerError(error);
    }
  }
}
