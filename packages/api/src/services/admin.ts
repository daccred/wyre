import { prisma } from "@wyre-zayroll/db/src";
import { TRPCError } from "@trpc/server";
import type { IUserSchema } from "../interfaces";
import { ServicesError } from "./ServiceErrors";

export class AdminService {
  public input: IUserSchema;
  constructor(input: IUserSchema) {
    this.input = input;
    AdminService.isAdmin(input)
      .then((res) => res)
      .catch(() => {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to perform this action",
        });
      });
  }

  static async isAdmin(input: IUserSchema) {
    try {
      const admin = await prisma.user.findFirst({
        where: {
          id: input.id,
          type: input.type,
        },
      });

      if (!admin) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to perform this action",
        });
      }
    } catch (error) {
      ServicesError(error);
    }
  }
  static async getUserById(id?: string) {
    try {
      const getuser = await prisma.user.findFirst({
        where: {
          id,
        },
      });
      if (getuser) {
        return getuser;
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    } catch (error) {
      ServicesError(error);
    }
  }

  static async getuserByEmail(email?: string) {
    try {
      const getuser = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (getuser) {
        return getuser;
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "user not found",
      });
    } catch (error) {
      ServicesError(error);
    }
  }

  static async updateuser(data: IUserSchema, id?: string) {
    try {
      const updateuser = await prisma.user.update({
        where: {
          id,
        },
        data,
      });
      if (updateuser) {
        return updateuser;
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    } catch (error) {
      ServicesError(error);
    }
  }

  static async deleteuser(id: string) {
    try {
      const deleteuser = await prisma.user.delete({
        where: {
          id,
        },
      });
      if (deleteuser) {
        return deleteuser;
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    } catch (error) {
      ServicesError(error);
    }
  }
}
