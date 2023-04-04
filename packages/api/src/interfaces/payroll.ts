import { z } from "zod";

export const payrollSchema = z.object({
  title: z.string(),
  cycle: z.enum(["daily", "bi-weekly", "monthly"]),
  auto: z.boolean(),
  suspend: z.boolean(),
  payday: z.date(),
  currency: z.enum(["USD", "GHS", "NGN", "GBP", "EUR", "KES", "RWF", "UGX", "TZS", "ZMW", "ZAR"]),
  burden: z.number(),
  employees: z.array(z.string()),
});

export type IPayrollSchema = z.infer<typeof payrollSchema>;
