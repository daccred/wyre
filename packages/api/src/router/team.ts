import { z } from "zod";

import { teamSchema } from "../interfaces";
import { TeamService } from "../services";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const teamRouter = createTRPCRouter({
  createEmployee: protectedProcedure.input(teamSchema).mutation(({ input }) => {
    const employee = TeamService.createEmployee(input);
    return employee;
  }),

  updateEmployee: protectedProcedure
    .input(z.object({ id: z.string(), data: teamSchema }))
    .mutation(({ input }) => {
      const employee = TeamService.updateEmployee(input.id, input.data);

      return employee;
    }),

  // deleteTeam: protectedProcedure.input(z.string()).mutation(({ input }) => {
  //   const deleteTeam = TeamService.deleteTeam(input);

  //   return deleteTeam;
  // }),

  getSingleEmployee: protectedProcedure.input(z.string()).query(({ input }) => {
    const employee = TeamService.getSingleEmployee(input);
    return employee;
  }),

  getEmployees: protectedProcedure.query(() => {
    const employees = TeamService.getEmployees();
    return employees;
  }),

  getSingleContractor: protectedProcedure.input(z.string()).query(({ input }) => {
    const contractor = TeamService.getSingleContractor(input);
    return contractor;
  }),
  getContractors: protectedProcedure.query(() => {
    const contractors = TeamService.getContractors();
    return contractors;
  }),
});
