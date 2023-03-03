import { z } from "zod";

export const payrollSchema = z.object({
  title: z.string(),
  cycle: z.enum(["daily", "bi-weekly", "monthly"]),
  auto: z.boolean(),
  payday: z.date(),
  currency: z.enum(["USD", "GHC", "NGN", "CNY", "GBP", "EUR"]),
  burden: z.number(),
  employees: z.array(z.string()),
  contractors: z.array(z.string()),
});

export type IPayrollSchema = z.infer<typeof payrollSchema>;
