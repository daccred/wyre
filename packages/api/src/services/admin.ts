/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@wyre-zayroll/db/src";
import { TRPCError } from "@trpc/server";
import type { Admin } from "../interfaces";

export class AdminService {
  static async getAdminById(id?: string) {
    try {
      const getAdmin = await prisma.admin.findFirst({
        where: {
          id,
        },
      });
      if (getAdmin) {
        return getAdmin;
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getAdminByEmail(email?: string) {
    try {
      const getAdmin = await prisma.admin.findFirst({
        where: {
          email,
        },
      });
      if (getAdmin) {
        return getAdmin;
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Admin not found",
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async updateAdmin(data: Admin, id?: string) {
    try {
      const updateAdmin = await prisma.admin.update({
        where: {
          id,
        },
        data,
      });
      if (updateAdmin) {
        return updateAdmin;
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async deleteAdmin(id: string) {
    try {
      const deleteAdmin = await prisma.admin.delete({
        where: {
          id,
        },
      });
      if (deleteAdmin) {
        return deleteAdmin;
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
