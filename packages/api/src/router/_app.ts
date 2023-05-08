import { createTRPCRouter } from '../trpc';
import { authRouter } from './auth';
import { contractorRouter } from './contractor';
import { exampleRouter } from './example';
import { expenseRouter } from './expense';
import { invitationRouter } from './invitation';
import { paymentLinkRouter } from './payment-link';
import { payrollRouter } from './payroll';
import { teamRouter } from './team';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  invitations: invitationRouter,
  payroll: payrollRouter,
  team: teamRouter,
  expenses: expenseRouter,
  contractor: contractorRouter,
  payment: paymentLinkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
