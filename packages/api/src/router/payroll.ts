import { payrollSchema } from "../interfaces/payroll";
import { PayrollService } from "../services/payroll";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const payrollRouter = router({
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
    .input(z.object({ payrollId: z.string(), employeeId: z.string() }))
    .mutation(async ({ input }) => {
      const removeEmployee = await PayrollService.removeEmployee(
        input.payrollId,
        input.employeeId
      );
      return removeEmployee;
    }),

  //* *  Mutations *//

  //* *  Queries *//
  getSinglePayroll: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const payroll = await PayrollService.getSinglePayroll(input.id);
      return payroll;
    }),
  getPayrolls: protectedProcedure.query(async () => {
    const payrolls = await PayrollService.getPayrolls();
    return payrolls;
  }),
  //* *  Queries *//
});
