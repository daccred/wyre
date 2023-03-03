import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { AuthService } from "../services";
import { signUpSchema, verifyEmailSchema } from "../interfaces";
import { z } from "zod";

export const authRouter = createTRPCRouter({
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
  sendAdminMailVerification: publicProcedure
    .input(z.object({ email: z.string().email(), verifyCode: z.string() }))
    .mutation(async ({ input }) => {
      const mail = await AuthService.sendAdminMailVerification(
        input.email,
        input.verifyCode
      );
      return mail;
    }),
  verifyAdminEmail: publicProcedure
    .input(verifyEmailSchema)
    .mutation(async ({ input }) => {
      const verified = await AuthService.verifyAdminEmail(input);
      return verified;
    }),
});
