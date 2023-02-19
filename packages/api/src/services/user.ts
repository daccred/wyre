/* eslint-disable @typescript-eslint/no-explicit-any */
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
