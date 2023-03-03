import { z } from "zod";

export const payrollSchema = z.object({
  id: z.string(),
  title: z.string(),
  cycle: z.enum(["daily", "bi-weekly", "monthly"]),
  auto: z.boolean(),
  payday: z.string(),
  currency: z.enum(["USD", "GHC", "NGN", "CNY", "GBP", "EUR"]),
  burden: z.number(),
  employees: z.array(z.string()).optional(),
  contractors: z.array(z.string()).optional(),
});

export type IPayrollSchema = z.infer<typeof payrollSchema>;
