import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { contractorSchema } from "../interfaces";
import { ContractorService } from "../services";

export const contractorRouter = createTRPCRouter({
  createContractor: protectedProcedure
    .input(contractorSchema)
    .mutation(({ input }) => {
      const contractor = ContractorService.createContractor(input);
      return contractor;
    }),

  updateContractor: protectedProcedure
    .input(z.object({ id: z.string(), data: contractorSchema }))
    .mutation(({ input }) => {
      const updateContractor = ContractorService.updateContractor(
        input.id,
        input.data
      );

      return updateContractor;
    }),

  deleteContractor: protectedProcedure
    .input(z.string())
    .mutation(({ input }) => {
      const deleteContractor = ContractorService.deleteContractor(input);
      return deleteContractor;
    }),

  getSingleContractor: protectedProcedure
    .input(z.string())
    .query(({ input }) => {
      const contractor = ContractorService.getSingleContractor(input);
      return contractor;
    }),

  getContractors: protectedProcedure.query(() => {
    const contractors = ContractorService.getContractors();
    return contractors;
  }),
});
