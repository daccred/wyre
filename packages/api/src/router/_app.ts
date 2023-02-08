import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { userRouter } from "./users";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
