import type { ITeamSchema } from "./team";

export interface PayrollQueueSchema {
  payroll: string;
  recipientDetails: ITeamSchema | unknown;
  paymentMethod: string;
  recipientPaymentDetail: unknown;
}
