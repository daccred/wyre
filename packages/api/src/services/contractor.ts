import { prisma } from '@wyrecc/db';

import { TRPCError } from '@trpc/server';

import type { contractorSchemaType } from '../interfaces';
import { ServerError } from '../utils/server-error';

export class ContractorService {
  public static async createContractor(payload: contractorSchemaType) {
    try {
      const contractorExist = await prisma.team.findFirst({
        where: { email: payload.email, teamCategory: 'CONTRACTOR' },
      });

      if (contractorExist) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Contractor with email already exist' });
      }

      // create contractor
      const contractor = await prisma.team.create({
        data: {
          firstName: payload.name,
          lastName: payload.name,
          email: payload.email,
          department: payload.department,
          jobRole: payload.jobRole,
          salary: payload.grossSalary,
          signBonus: payload.signingBonus,
          teamCategory: 'CONTRACTOR',
          status: true,
        },
      });

      if (!contractor) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create contractor' });
      }

      return contractor;
    } catch (error) {
      ServerError(error);
    }
  }

  // get all contractors
  static async getAllContractors() {
    try {
      const contractors = await prisma.team.findMany({ where: { teamCategory: 'CONTRACTOR' } });
      return contractors;
    } catch (error) {
      ServerError(error);
    }
  }

  // get contractor by id
  static async getContractorById(id: string) {
    try {
      const contractor = await prisma.team.findUnique({ where: { id } });

      if (!contractor) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Contractor not found' });
      }
    } catch (error) {
      ServerError(error);
    }
  }
}
