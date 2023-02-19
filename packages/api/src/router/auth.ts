import { router, publicProcedure, protectedProcedure } from "../trpc";
import { AuthService } from "../services";
import { signUpSchema } from "../interfaces";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  adminSignUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input }) => {
      const admin = await AuthService.adminSignUp(input);
      return admin;
    }),
  userSignup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input }) => {
      const user = await AuthService.userSignUp(input);
      return user;
    }),
});
