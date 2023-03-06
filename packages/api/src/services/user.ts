import { prisma } from "@wyre-zayroll/db/src";
import { TRPCError } from "@trpc/server";
import type { User } from "../interfaces";

export const config = { send_json: true, send_form: false };

export class UserService {
  static async getUserById(id?: string) {
    try {
      const getUser = await prisma.user.findFirst({
        where: {
          id,
        },
      });
      if (getUser) {
        return getUser;
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getUsers() {
    try {
      const users = await prisma.admin.findMany({
        include: {
          verification: true,
        },
      });
      if (!users) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Users not found",
        });
      }
      return users;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw new TRPCError({ code: error.code, message: error.message });
      }
      throw new Error(error as string);
    }
  }

  static async updateUser(data: User, id?: string) {
    try {
      const updateUser = await prisma.user.update({
        where: {
          id,
        },
        data,
      });
      if (updateUser) {
        return updateUser;
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async deleteUser(id: string) {
    try {
      const deleteUser = await prisma.user.delete({
        where: {
          id,
        },
      });
      if (deleteUser) {
        return deleteUser;
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
