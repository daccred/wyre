import { payrollSchema } from "../interfaces/payroll";
import { PayrollService } from "../services/payroll";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const payrollRouter = createTRPCRouter({
  //* *  Mutations *//
  createPayroll: protectedProcedure
    .input(payrollSchema)
    .mutation(async ({ input }) => {
      const createPayroll = await PayrollService.createPayroll(input);
      return createPayroll;
    }),

  updatePayroll: protectedProcedure
    .input(payrollSchema)
    .mutation(async ({ input }) => {
      const updatePayroll = await PayrollService.updatePayroll(input);
      return updatePayroll;
    }),
  deletePayroll: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const deletePayroll = await PayrollService.deletePayroll(input.id);
      return deletePayroll;
    }),
  removeContractor: protectedProcedure
    .input(z.object({ payrollId: z.string(), contractorId: z.string() }))
    .mutation(async ({ input }) => {
      const removeContractor = await PayrollService.removeContractor(
        input.payrollId,
        input.contractorId
      );
      return removeContractor;
    }),
  removeEmployee: protectedProcedure
    .input(z.object({ payrollId: z.string(), contractorId: z.string() }))
    .mutation(async ({ input }) => {
      const removeContractor = await PayrollService.removeContractor(
        input.payrollId,
        input.contractorId
      );
      return removeContractor;
    }),

  //* *  Mutations *//
});
