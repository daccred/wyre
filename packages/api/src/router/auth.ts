import { z } from 'zod';
import { resetPasswordSchema, signUpSchema, verifyEmailSchema } from '../interfaces';
import { AuthService } from '../services';
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
  verifyAdminEmail: publicProcedure.input(verifyEmailSchema).mutation(async ({ input }) => {
    const verified = await AuthService.verifyAdminEmail(input);
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
