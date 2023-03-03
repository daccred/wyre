import { TRPCError } from "@trpc/server";
import { prisma } from "@wyre-zayroll/db";
import { IContractorSchema } from "../interfaces";

function ContractorError(error: unknown) {
  if (error instanceof TRPCError) throw error;
  console.warn(error);
  return error;
}

export class ContractorService {
  static async createContractor(input: IContractorSchema) {
    try {
      const contractorExists = await prisma.contractor.findUnique({
        where: {
          email: input.email,
        },
      });

      if (contractorExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Contractor already exists",
        });
      }
      const contractor = await prisma.contractor.create({
        data: {
          name: input.name,
          email: input.email,
          department: input.department,
          jobRole: input.jobRole,
          salary: input.salary,
          signBonus: input.signBonus,
        },
      });

      if (!contractor)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create contractor",
        });

      return contractor;
    } catch (error) {
      ContractorError(error);
    }
  }
  static async updateContractor(
    contractorId: string,
    input: IContractorSchema
  ) {
    try {
      const contractor = await prisma.contractor.update({
        where: { id: contractorId },
        data: {
          name: input.name,
          email: input.email,
          department: input.department,
          jobRole: input.jobRole,
          salary: input.salary,
        },
      });

      if (!contractor)
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Failed to update contractor",
        });

      return contractor;
    } catch (error) {
      ContractorError(error);
    }
  }
  static async deleteContractor(contractorId: string) {
    try {
      const contractor = await prisma.contractor.delete({
        where: { id: contractorId },
      });

      if (!contractor) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to delete payroll",
        });
      }
      return "Contractor deleted successfully";
    } catch (error) {
      ContractorError(error);
    }
  }
  static async getSingleContractor(contractorId: string) {
    try {
      const contractor = await prisma.contractor.findUnique({
        where: { id: contractorId },
      });

      if (!contractor) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Contractor not found",
        });
      }
      return contractor;
    } catch (error) {
      ContractorError(error);
    }
  }
  static async getContractors() {
    try {
      const contractors = await prisma.contractor.findMany();

      if (!contractors) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Contractors not found",
        });
      }

      return contractors;
    } catch (error) {
      ContractorError(error);
    }
  }
}
