import { z } from 'zod';
// import { paymentLinkSchema, privateLinkAccessSchema } from "../interfaces";
import { PaymentService } from '../services';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const paymentLinkRouter = createTRPCRouter({
  // createPaymentLink: protectedProcedure.input(paymentLinkSchema).mutation(async ({ input }) => {
  //   const link = await PaymentService.createPaymentLink(input);
  //   return link;
  // }),
  // updatePaymentLink: protectedProcedure
  //   .input(z.object({ id: z.string(), data: paymentLinkSchema }))
  //   .mutation(async ({ input }) => {
  //     const updatedLink = await PaymentService.updatePaymentLink(input.id, input.data);
  //     return updatedLink;
  //   }),

  // deletePaymentLink: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
  //   const link = await PaymentService.deletePaymentLink(input.id);
  //   return link;
  // }),
  // decryptLinkCode: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
  //   const code = await PaymentService.decryptPaymentLinkCode(input.id);
  //   return code;
  // }),

  // verifyPaymentLink: protectedProcedure.input(privateLinkAccessSchema).mutation(async ({ input }) => {
  //   const link = await PaymentService.verifyPaymentLink(input);
  //   return link;
  // }),

  // getSinglePaymentLink: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
  //   const link = await PaymentService.getSinglePaymentLink(input.id);
  //   return link;
  // }),
  // getPaymentLinks: protectedProcedure.input(z.object({ userId: z.string() })).mutation(async ({ input }) => {
  //   const links = await PaymentService.getUserPaymentLinks(input.userId);
  //   return links;
  // }),

  generateLink: protectedProcedure.input(z.object({ employeeId: z.string() })).mutation(async ({ input }) => {
    const link = await PaymentService.generateLink(input.employeeId);
    return link;
  }),
});
