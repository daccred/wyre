import { prisma } from "@wyrecc/db";

import { TRPCError } from "@trpc/server";

import type { ITeamSchema } from "../interfaces";
import { ServerError } from "../utils/server-error";

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
          code: "BAD_REQUEST",
          message: "team already exists",
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
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create team",
        });

      return team;
    } catch (error) {
      ServerError(error);
    }
  }
  static async updatePersonnel(teamId: string, input: ITeamSchema) {
    try {
      const team = await prisma.team.update({
        where: { id: teamId },
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
      });

      if (!team)
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Failed to update team",
        });

      return team;
    } catch (error) {
      ServerError(error);
    }
  }

  static async deletePersonnel(teamId: string) {
    try {
      const team = await prisma.team.delete({
        where: { id: teamId },
      });

      if (!team) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to delete team",
        });
      }
      return "team deleted successfully";
    } catch (error) {
      ServerError(error);
    }
  }

  static async getSinglePersonnel(teamId: string) {
    try {
      const team = await prisma.team.findFirst({
        where: { teamCategory: "EMPLOYEE", id: teamId },
        include: { expense: true, payroll: true },
      });

      if (!team) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team not found",
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
        where: { teamCategory: "CONTRACTOR", id: teamId },
        include: { expense: true, payroll: true },
      });

      if (!team) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team not found",
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
        where: { teamCategory: "EMPLOYEE" },
      });

      if (!teams) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Teams not found",
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
        where: { teamCategory: "CONTRACTOR" },
      });

      if (!teams) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Teams not found",
        });
      }

      return teams;
    } catch (error) {
      ServerError(error);
    }
  }
}
