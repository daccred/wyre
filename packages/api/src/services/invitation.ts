import { nanoid } from "nanoid";

import { prisma } from "@wyrecc/db/src";

import { TRPCError } from "@trpc/server";

import type { InvitationSchemaType } from "../interfaces";
import { ServerError } from "../utils/server-error";
import { AuthService } from "./auth";

export class InvitationService {
  static async createInvitation(input: InvitationSchemaType) {
    try {
      const getAdmin = await prisma.user.findFirst({
        where: {
          email: input.email,
          type: "ADMIN" || "SUPER_ADMIN",
        },
      });
      if (!getAdmin) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Admin not found" });
      }
      //check if user has sufficient access
      const isSuperAdmin = await AuthService.checkIfSuperAdmin(getAdmin.id);
      if (!isSuperAdmin) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You do not have sufficient access for this action",
        });
      }

      // create the invitation
      const invitation = await prisma.invitation.create({
        data: {
          email: input?.email,
          description: input.description,
          token: nanoid(10),
          category: input.category,
          userId: getAdmin.id,
          companyId: getAdmin.companyId,
        },
      });
      // TODO: send email to the user
      return invitation;
    } catch (error) {
      ServerError(error);
    }
  }

  static async getInvitations(companyId: string) {
    try {
      const invitations = await prisma.invitation.findMany({
        where: {
          companyId: companyId,
        },
      });

      if (!invitations) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No invitations found",
        });
      }
      return invitations;
    } catch (error) {
      ServerError(error);
    }
  }

  static async getAdminInvitations(adminId: string) {
    try {
      const invitations = await prisma.invitation.findMany({
        where: {
          userId: adminId,
        },
      });
      if (!invitations) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No invitations found",
        });
      }
      return invitations;
    } catch (error) {
      ServerError(error);
    }
  }

  static async getInvitation(id: string) {
    try {
      const invitation = await prisma.invitation.findUnique({
        where: {
          id: id,
        },
      });
      if (!invitation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No invitations found",
        });
      }
      return invitation;
    } catch (error) {
      ServerError(error);
    }
  }

  static async deleteInvitation(id: string) {
    try {
      const invitation = await prisma.invitation.delete({
        where: {
          id: id,
        },
      });
      if (!invitation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete invitation",
        });
      }
      return invitation;
    } catch (error) {
      ServerError(error);
    }
  }
}
