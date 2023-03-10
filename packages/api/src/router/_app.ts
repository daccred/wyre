import { createTRPCRouter } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { invitationRouter } from "./invitation";
import { payrollRouter } from "./payroll";
import { employeeRouter } from "./employees";
import { userRouter } from "./users";
import { expenseRouter } from "./expense";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  invitations: invitationRouter,
  payroll: payrollRouter,
  employee: employeeRouter,
  expenses: expenseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
