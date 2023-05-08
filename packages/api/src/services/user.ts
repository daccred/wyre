import { prisma } from '@wyrecc/db';
import { TRPCError } from '@trpc/server';
import type { IUserSchema } from '../interfaces';
import { hashString } from '../utils';
import { ServerError } from '../utils/server-error';
import { AuthService } from './auth';

export const i = { send_json: true, send_form: false };

export class UserService {
  static async createUser(userId: string, input: IUserSchema) {
    try {
      // check if email exists
      const emailExists = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (emailExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Email already exists',
        });
      }
      if (input.type == 'ADMIN') {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'User cannot be admin' });
      }
      //Handle email verification
      const confirmCode = JSON.stringify(Math.floor(100000 + Math.random() * 900000)); // generates a random 6-digit code

      // create user
      const user = await prisma.user.create({
        data: {
          id: userId,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: await hashString(input.password),
          jobRole: input.jobRole,
          type: 'USER',
          phone: input.phone,
          companyId: input.companyId,
          verification: {
            create: {
              token: confirmCode,
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create user',
        });
      }
      const response = await AuthService.sendEmailVerification(user.email, confirmCode);
      if (!response) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send verification code',
        });
      }

      return { user, emailStatus: response };
    } catch (error) {
      ServerError(error);
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
        code: 'NOT_FOUND',
        message: 'User not found',
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
          code: 'NOT_FOUND',
          message: 'Users not found',
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
      if (data.type == 'ADMIN') {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'User cannot be admin' });
      }
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
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    } catch (error) {
      ServerError(error);
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
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    } catch (error) {
      ServerError(error);
    }
  }
}
