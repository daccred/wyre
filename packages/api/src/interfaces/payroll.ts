import { z } from 'zod';

import type { ITeamSchema } from './team';

export const payrollSchema = z.object({
  title: z.string(),
  cycle: z.enum(['daily', 'bi-weekly', 'monthly']),
  auto: z.boolean(),
  suspend: z.boolean(),
  payday: z.date(),
  currency: z.enum(['USD', 'GHS', 'NGN', 'GBP', 'EUR', 'KES', 'RWF', 'UGX', 'TZS', 'ZMW', 'ZAR']),
  burden: z.number(),
  employees: z.array(z.string()),
});

export type IPayrollSchema = z.infer<typeof payrollSchema>;

export interface PayrollScheduleData {
  payroll: string;
  recipientDetails: ITeamSchema | unknown;
  paymentMethod: ITeamSchema['payrollMethod'];
  recipientPaymentDetail: unknown;
}

export interface PayrollTaskOptions {
  delay: number;
  name: string;
  data: PayrollScheduleData[];
}

export interface PayrollRepeatableTaskOptions {
  repeat: number;
  data: PayrollScheduleData[];
  name: string;
}
