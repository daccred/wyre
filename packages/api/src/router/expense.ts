import { z } from 'zod';
import { expenseSchema } from '../interfaces';
import { ExpenseService } from '../services';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const expenseRouter = createTRPCRouter({
  createExpense: protectedProcedure.input(expenseSchema).mutation(({ input }) => {
    const expense = ExpenseService.createExpense(input);
    return expense;
  }),

  updateExpense: protectedProcedure
    .input(z.object({ expensId: z.string(), data: expenseSchema }))
    .mutation(({ input }) => {
      const expense = ExpenseService.updateExpense(input.expensId, input.data);
      return expense;
    }),

  deleteExpense: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ input }) => {
    const expense = ExpenseService.deleteExpense(input.id);
    return expense;
  }),

  getExpenses: protectedProcedure.query(() => {
    const expenses = ExpenseService.getExpenses();
    return expenses;
  }),

  getSingleExpense: protectedProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    const expense = ExpenseService.getSingleExpense(input.id);
    return expense;
  }),

  getEmployeeExpense: protectedProcedure.input(z.object({ userId: z.string() })).query(({ input }) => {
    const expenses = ExpenseService.getPersonnelExpenses(input.userId);
    return expenses;
  }),
});
