import * as z from "zod";

export const expenseSchema = z.object({
  amount: z.string(),
  description: z.string(),
  employees: z.array(z.string()),
});

export type IExpenseSchema = z.infer<typeof expenseSchema>;
