import { z } from "zod";

import { contractorSchema } from "../interfaces";
import { ContractorService } from "../services/contractor";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const ContractorRouter = createTRPCRouter({
  createContractor: protectedProcedure.input(contractorSchema).mutation(async ({ input }) => {
    const contractor = ContractorService.createContractor(input);
    return contractor;
  }),
  getContractors: protectedProcedure.query(() => {
    const contractors = ContractorService.getAllContractors();
    return contractors;
  }),
  getContractorById: protectedProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    const contractor = ContractorService.getContractorById(input.id);
    return contractor;
  }),
});
