import { prisma } from "@wyre-zayroll/db";
import { TRPCError } from "@trpc/server";
import type { IUserSchema } from "../interfaces";
import { ServicesError } from "./ServiceErrors";
import { hashString } from "../utils";

export const i = { send_json: true, send_form: false };

export class UserService {
  static async createUser(input: IUserSchema) {
    try {
      // check if email exists
      const emailExists = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (emailExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already exists",
        });
      }

      //Handle email verification
      const confirmCode = JSON.stringify(
        Math.floor(100000 + Math.random() * 900000)
      ); // generates a random 6-digit code

      const token = await prisma.verificationToken.create({
        data: {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          token: confirmCode,
        },
      });

      if (!token) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Token creation failed",
        });
      }
      // create user
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: await hashString(input.password),
          jobRole: input.jobRole,
          type: "USER",
          phone: input.phone,
          verifyId: token.id,

          // companyId: input.companyId,
        },
      });
      return user;
    } catch (error) {
      ServicesError(error);
    }
  }
  static async getSingleUser(id: string) {
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
      const users = await prisma.user.findMany({});
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

  static async updateUser(id: string, data: IUserSchema) {
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
      ServicesError(error);
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
      ServicesError(error);
    }
  }
}
