import * as z from "zod";

export const expenseSchema = z.object({
  amount: z.string(),
  description: z.string(),
  date: z.date(),
  type: z.enum(["Reimbursement", "Payment"]),
  status: z.enum(["Pending", "Failed", "Success"]),
  employees: z.array(z.string()),
});

export type IExpenseSchema = z.infer<typeof expenseSchema>;
