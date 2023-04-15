import type { z } from 'zod';
import { prisma } from '@wyrecc/db';
import { TRPCError } from '@trpc/server';
import type { ITeamSchema, updateTeamSchema } from '../interfaces';
import { ServerError } from '../utils/server-error';

type IUpdateTeamSchema = z.infer<typeof updateTeamSchema>;
export class TeamService {
  static async createPersonnel(input: ITeamSchema) {
    try {
      const teamExists = await prisma.team.findUnique({
        where: {
          email: input.email,
        },
      });

      if (teamExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'team already exists',
        });
      }
      const team = await prisma.team.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          department: input.department,
          jobRole: input.jobRole,
          salary: input.salary,
          signBonus: input.signBonus,
          teamCategory: input.category,
        },
      });

      if (!team)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create team',
        });

      return team;
    } catch (error) {
      ServerError(error);
    }
  }
  static async updateCompensation(personnelId: string, salary: string) {
    try {
      const personnel = await prisma.team.delete({
        where: { id: personnelId },
      });
      if (!personnel) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to delete team',
        });
      }
      const updatedPersonnel = await prisma.team.update({
        where: { id: personnel.id },
        data: {
          salary,
        },
      });

      return `Salary has been updated to ${updatedPersonnel.salary}`;
    } catch (error) {
      ServerError(error);
    }
  }

  static async updatePaymentMethod(personnelId: string, payrollMethod: 'CRYPTO' | 'BANK' | 'MOBILEMONEY') {
    try {
      const personnel = await prisma.team.delete({
        where: { id: personnelId },
      });
      if (!personnel) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to delete team',
        });
      }
      const updatedPersonnel = await prisma.team.update({
        where: { id: personnel.id },
        data: {
          payrollMethod,
        },
      });
      return `Payement method updated to ${updatedPersonnel.payrollMethod}`;
    } catch (error) {
      ServerError(error);
    }
  }
  static async updatePersonnel(teamId: string, input: IUpdateTeamSchema) {
    try {
      const team = await prisma.team.update({
        where: { id: teamId },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          department: input.department,
          jobRole: input.jobRole,
          salary: input.salary,
          status: input.status,
          teamCategory: input.category,
        },
      });

      if (!team)
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Failed to update team',
        });

      return team;
    } catch (error) {
      ServerError(error);
    }
  }

  static async deletePersonnel(personnelId: string) {
    try {
      const personnel = await prisma.team.delete({
        where: { id: personnelId },
      });

      if (!personnel) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to delete team',
        });
      }
      return 'team deleted successfully';
    } catch (error) {
      ServerError(error);
    }
  }

  static async getSinglePersonnel(teamId: string) {
    try {
      const team = await prisma.team.findFirst({
        where: { teamCategory: 'EMPLOYEE', id: teamId },
        include: { expense: true, payrolls: true },
      });

      if (!team) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Team not found',
        });
      }
      return team;
    } catch (error) {
      ServerError(error);
    }
  }

  static async getSingleContractor(teamId: string) {
    try {
      const team = await prisma.team.findFirst({
        where: { teamCategory: 'CONTRACTOR', id: teamId },
        include: { expense: true, payrolls: true },
      });

      if (!team) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Team not found',
        });
      }
      return team;
    } catch (error) {
      ServerError(error);
    }
  }

  static async getPersonnel() {
    try {
      const teams = await prisma.team.findMany({
        where: { teamCategory: 'EMPLOYEE' },
      });

      if (!teams) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Teams not found',
        });
      }

      return teams;
    } catch (error) {
      ServerError(error);
    }
  }
  static async getContractors() {
    try {
      const teams = await prisma.team.findMany({
        where: { teamCategory: 'CONTRACTOR' },
      });

      if (!teams) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Teams not found',
        });
      }

      return teams;
    } catch (error) {
      ServerError(error);
    }
  }
}
