import { createTRPCRouter } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { invitationRouter } from "./invitation";
import { payrollRouter } from "./payroll";
import { employeeRouter } from "./employees";
import { userRouter } from "./users";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  users: userRouter,
  invitations: invitationRouter,
  payroll: payrollRouter,
  employees: employeeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
