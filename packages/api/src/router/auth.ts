import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { AuthService } from "../services";
import { loginSchema, signUpSchema, verifyEmailSchema } from "../interfaces";
import _ from "lodash";

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
  sendMailVerification: publicProcedure
    .input(loginSchema.omit({ password: true }))
    .mutation(async ({ input }) => {
      const mail = await AuthService.sendMailVerification(input);
      return mail;
    }),
  verifyUserEmail: publicProcedure
    .input(verifyEmailSchema)
    .mutation(async ({ input }) => {
      const verified = await AuthService.verifyEmail(input);
      return verified;
    }),
});
