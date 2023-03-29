import * as z from "zod";

export const expenseSchema = z.object({
  amount: z.string(),
  description: z.string(),
  date: z.date(),
  type: z.enum(["Reimbursement", "Payment"]),
  status: z.enum(["Approved", "Pending", "Disapproved"]),
  employeeId: z.string(),
  attachment: z.object({
    title: z.string(),
    url: z.string(),
  }),
});

export type IExpenseSchema = z.infer<typeof expenseSchema>;
