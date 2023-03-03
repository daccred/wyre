import { prisma } from "@wyre-zayroll/db/src";
import { TRPCError } from "@trpc/server";
import { Invitation } from "../interfaces";
import { AuthService } from "./auth";
import { AdminService } from "./admin";
import { nanoid } from "nanoid";

export class InvitationService {
  static async createInvitation(input: Invitation) {
    try {
      const getAdmin = await AdminService.getAdminByEmail(input.adminId);
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
          email: input.email as string,
          description: input.description as string,
          token: nanoid(10),
          category: input.category as string,
          adminId: input.adminId as string,
          companyId: getAdmin.companyId as string,
        },
      });
      // TODO: send email to the user
      return invitation;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: JSON.stringify(error as string),
      });
    }
  }

  static async getInvitations(companyId: string) {
    try {
      const invitations = await prisma.invitation.findMany({
        where: {
          companyId: companyId,
        },
      });
      return invitations;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: JSON.stringify(error as string),
      });
    }
  }

  static async getAdminInvitations(adminId: string) {
    try {
      const invitations = await prisma.invitation.findMany({
        where: {
          adminId: adminId,
        },
      });
      return invitations;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: JSON.stringify(error as string),
      });
    }
  }

  static async getInvitation(id: string) {
    try {
      const invitation = await prisma.invitation.findUnique({
        where: {
          id: id,
        },
      });
      return invitation;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: JSON.stringify(error as string),
      });
    }
  }

  static async deleteInvitation(id: string) {
    try {
      const invitation = await prisma.invitation.delete({
        where: {
          id: id,
        },
      });
      return invitation;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: JSON.stringify(error as string),
      });
    }
  }
}
