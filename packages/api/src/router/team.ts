import { z } from "zod";

import { teamSchema } from "../interfaces";
import { TeamService } from "../services";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const teamRouter = createTRPCRouter({
  createPersonnel: protectedProcedure.input(teamSchema).mutation(({ input }) => {
    const employee = TeamService.createPersonnel(input);
    return employee;
  }),

  updatePersonnel: protectedProcedure
    .input(z.object({ id: z.string(), data: teamSchema }))
    .mutation(({ input }) => {
      const employee = TeamService.updatePersonnel(input.id, input.data);

      return employee;
    }),

  getSinglePersonnel: protectedProcedure.input(z.string()).query(({ input }) => {
    const employee = TeamService.getSinglePersonnel(input);
    return employee;
  }),

  getPersonnel: protectedProcedure.query(() => {
    const employees = TeamService.getPersonnel();
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
