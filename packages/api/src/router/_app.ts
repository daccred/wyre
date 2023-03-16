import { createTRPCRouter } from "../trpc";
import { authRouter } from "./auth";
import { ContractorRouter } from "./contractor";
import { employeeRouter } from "./employees";
import { exampleRouter } from "./example";
import { expenseRouter } from "./expense";
import { invitationRouter } from "./invitation";
import { payrollRouter } from "./payroll";
import { userRouter } from "./users";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  invitations: invitationRouter,
  payroll: payrollRouter,
  employee: employeeRouter,
  expenses: expenseRouter,
  contractor: ContractorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
