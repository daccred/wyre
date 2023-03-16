import { prisma } from "@wyrecc/db";

import { TRPCError } from "@trpc/server";

import type { contractorSchemaType } from "../interfaces";
import { ServicesError } from "./ServiceErrors";

export class ContractorService {
  public static async createContractor(payload: contractorSchemaType) {
    try {
      const contractorExist = await prisma.employee.findFirst({
        where: { email: payload.email, category: "CONTRACTOR" },
      });

      if (contractorExist) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Contractor with email already exist" });
      }

      // create contractor
      const contractor = await prisma.employee.create({
        data: {
          name: payload.name,
          email: payload.email,
          department: payload.department,
          jobRole: payload.jobRole,
          salary: payload.grossSalary,
          signBonus: payload.signingBonus,
          category: "CONTRACTOR",
          status: true,
        },
      });

      if (!contractor) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create contractor" });
      }

      return contractor;
    } catch (error) {
      ServicesError(error);
    }
  }

  // get all contractors
  static async getAllContractors() {
    try {
      const contractors = await prisma.employee.findMany({ where: { category: "CONTRACTOR" } });
      return contractors;
    } catch (error) {
      ServicesError(error);
    }
  }

  // get contractor by id
  static async getContractorById(id: string) {
    try {
      const contractor = await prisma.employee.findUnique({ where: { id } });

      if (!contractor) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Contractor not found" });
      }
    } catch (error) {
      ServicesError(error);
    }
  }
}
