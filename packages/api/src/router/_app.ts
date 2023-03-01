import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { invitationRouter } from "./invitation";
import { payrollRouter } from "./payroll";
import { userRouter } from "./users";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  users: userRouter,
  invitations: invitationRouter,
  payroll: payrollRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
