/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@wyrecc/db';

import { TRPCError } from '@trpc/server';

import type { ITeamSchema, IUpdateTeamSchema } from '../interfaces';
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
  static async updatePersonnel(teamMemberID: string, input: IUpdateTeamSchema) {
    const { mobileMoney, cryptoWallet, bank, ...profile } = input;
    try {
      const updatedTeamMember = await prisma.$transaction([
        prisma.team.update({
          where: { id: teamMemberID },
          data: {
            ...profile,
            // firstName: input.name,
            // lastName: input.name,
            // email: input.email,
            // department: input.department,
            // jobRole: input.jobRole,
            // salary: input.salary,
            // status: input.status,
            // teamCategory: input.category,
          },
        }),

        /**
         * We use the upsert method so that we can create
         * new payment methods if we dont have any from the user
         * */
        prisma.mobileMoney.upsert({
          where: { personnelId: teamMemberID },
          create: {
            provider: mobileMoney?.provider as string,
            phoneNumber: mobileMoney?.phoneNumber as string,
            allocation: mobileMoney?.allocation as number,
            personnelId: teamMemberID,
          },
          update: {
            ...input.mobileMoney,
            personnelId: teamMemberID,
          },
        }),
        prisma.bank.upsert({
          where: { personnelId: teamMemberID },
          create: {
            name: bank?.name as string,
            country: bank?.country as string,
            bankCode: bank?.bankCode as string,
            swiftCode: bank?.swiftCode as string,
            allocation: bank?.allocation as number,
            accountType: bank?.accountType as string,
            routingNumber: bank?.routingNumber as string,
            accountNumber: bank?.accountNumber as string,
            personnelId: teamMemberID,
          },
          update: { ...input.bank, personnelId: teamMemberID },
        }),
        prisma.cryptoWallet.upsert({
          where: { personnelId: teamMemberID },
          create: input.cryptoWallet as any,
          update: { ...cryptoWallet, personnelId: teamMemberID },
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
