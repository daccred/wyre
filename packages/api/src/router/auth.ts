import { z } from 'zod';
import { UserSchema, resetPasswordSchema, signUpSchema, verifyEmailSchema } from '../interfaces';
import { AuthService, UserService } from '../services';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'You are logged in and can see this secret message!';
  }),
  adminSignUp: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
    const admin = await AuthService.adminSignUp(input);
    return admin;
  }),
  userSignup: publicProcedure.input(UserSchema).mutation(async ({ input }) => {
    const user = await UserService.createUser(input);
    return user;
  }),
  verifyAdminEmail: publicProcedure.input(verifyEmailSchema).mutation(async ({ input }) => {
    const verified = await AuthService.verifyEmail(input);
    return verified;
  }),
  sendForgetPassword: publicProcedure.input(z.object({ email: z.string() })).mutation(async ({ input }) => {
    const email = AuthService.sendForgotPasswordEmail(input.email);
    return email;
  }),

  resetPassword: publicProcedure.input(resetPasswordSchema).mutation(async ({ input }) => {
    const pass = AuthService.resetPassword(input);
    return pass;
  }),
});
