/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@wyrecc/db';

import { TRPCError } from '@trpc/server';

import type { ITeamSchema } from '../interfaces';
import { ServerError } from '../utils/server-error';

export class TeamService {
  static async createPersonnel(input: ITeamSchema) {
    try {
      const teamPersonnelExists = await prisma.team.findUnique({
        where: {
          email: input.email,
        },
      });

      if (teamPersonnelExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'team already exists',
        });
      }
      const team = await prisma.team.create({
        data: {
          firstName: input.name,
          lastName: input.name,
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
          message: 'Failed to update payment method',
        });
      }
      const updatedPersonnel = await prisma.team.update({
        where: { id: personnel.id },
        data: {
          payrollMethod,
        },
      });
      return `Payment method updated to ${updatedPersonnel.payrollMethod}`;
    } catch (error) {
      ServerError(error);
    }
  }
  static async updatePersonnel(teamMemberID: string, input: ITeamSchema) {
    try {
      const updatedTeamMember = await prisma.$transaction([
        prisma.team.update({
          where: { id: teamMemberID },
          data: {
            firstName: input.name,
            lastName: input.name,
            email: input.email,
            department: input.department,
            jobRole: input.jobRole,
            salary: input.salary,
            status: input.status,
            teamCategory: input.category,
          },
        }),

        /**
         * We use the upsert method so that we can create
         * new payment methods if we dont have any from the user
         * */
        prisma.mobileMoney.upsert({
          where: { personnelId: teamMemberID },
          create: input.mobileMoney as any,
          update: input.mobileMoney as any,
        }),
        prisma.bank.upsert({
          where: { personnelId: teamMemberID },
          create: input.bank as any,
          update: input.bank as any,
        }),
        prisma.cryptoWallet.upsert({
          where: { personnelId: teamMemberID },
          create: input.cryptoWallet as any,
          update: input.cryptoWallet as any,
        }),
      ]);
      if (!updatedTeamMember)
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Failed to update TeamMember',
        });

      return updatedTeamMember;
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
        include: { expense: true, payroll: true },
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
        include: { expense: true, payroll: true },
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
