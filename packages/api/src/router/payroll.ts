import { z } from "zod";

import { payrollSchema } from "../interfaces";
import { PayrollService } from "../services";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const payrollRouter = createTRPCRouter({
  //* *  Mutations *//
  createPayroll: protectedProcedure.input(payrollSchema).mutation(async ({ input }) => {
    const createPayroll = await PayrollService.createPayroll(input);
    return createPayroll;
  }),

  updatePayroll: protectedProcedure
    .input(z.object({ payrollId: z.string(), data: payrollSchema }))
    .mutation(async ({ input }) => {
      const updatePayroll = await PayrollService.updatePayroll(input.payrollId, input.data);
      return updatePayroll;
    }),
  deletePayroll: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    const deletePayroll = await PayrollService.deletePayroll(input.id);
    return deletePayroll;
  }),

  removeEmployee: protectedProcedure
    .input(z.object({ payrollId: z.string(), contractorId: z.string() }))
    .mutation(async ({ input }) => {
      const removeContractor = await PayrollService.removeEmployee(input.payrollId, input.contractorId);
      return removeContractor;
    }),

  processPayroll: protectedProcedure
    .input(z.object({ id: z.string().nonempty() }))
    .mutation(async ({ input }) => {
      const message = await PayrollService.processPayRoll(input.id);
      return message;
    }),

  //* *  Mutations *//

  // * *  Queries *//

  getSinglePayroll: protectedProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    const getSinglePayroll = PayrollService.getSinglePayroll(input.id);
    return getSinglePayroll;
  }),

  getPayrolls: protectedProcedure.query(() => {
    const getPayrolls = PayrollService.getPayrolls();
    return getPayrolls;
  }),

  // * *  Queries *//
});
