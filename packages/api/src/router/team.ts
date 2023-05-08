import { z } from 'zod';
import { teamSchema, updateTeamSchema } from '../interfaces';
import { TeamService } from '../services';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const teamRouter = createTRPCRouter({
  createPersonnel: protectedProcedure.input(teamSchema).mutation(async ({ input }) => {
    const employee = await TeamService.createPersonnel(input);
    return employee;
  }),

  updatePersonnel: protectedProcedure
    .input(z.object({ id: z.string(), data: updateTeamSchema }))
    .mutation(async ({ input }) => {
      const employee = await TeamService.updatePersonnel(input.id, input.data);
      return employee;
    }),

  getSinglePersonnel: protectedProcedure
    .input(z.object({ personnelId: z.string() }))
    .query(async ({ input }) => {
      const employee = await TeamService.getSinglePersonnel(input.personnelId);
      return employee;
    }),

  getPersonnel: protectedProcedure.query(async () => {
    const employees = await TeamService.getPersonnel();
    return employees;
  }),

  getSingleContractor: protectedProcedure
    .input(z.object({ contractorId: z.string() }))
    .query(async ({ input }) => {
      const contractor = await TeamService.getSingleContractor(input.contractorId);
      return contractor;
    }),
  getContractors: protectedProcedure.query(async () => {
    const contractors = await TeamService.getContractors();
    return contractors;
  }),

  updateCompensation: protectedProcedure
    .input(
      z.object({
        personnelId: z.string(),
        salary: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const personnel = await TeamService.updateCompensation(input.personnelId, input.salary);
      return personnel;
    }),

  updatePaymentMethod: protectedProcedure
    .input(
      z.object({
        personnelId: z.string(),
        paymentMethod: z.enum(['CRYPTO', 'BANK', 'MOBILEMONEY']),
      })
    )
    .mutation(async ({ input }) => {
      const personnel = await TeamService.updatePaymentMethod(input.personnelId, input.paymentMethod);
      return personnel;
    }),
});
