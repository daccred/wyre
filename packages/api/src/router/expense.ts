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

  deleteExpense: protectedProcedure.input(z.string()).mutation(({ input }) => {
    const expense = ExpenseService.deleteExpense(input);
    return expense;
  }),

  getExpenses: protectedProcedure.query(() => {
    const expenses = ExpenseService.getExpenses();
    return expenses;
  }),

  getSingleExpense: protectedProcedure.input(z.string()).query(({ input }) => {
    const expense = ExpenseService.getSingleExpense(input);
    return expense;
  }),
});
