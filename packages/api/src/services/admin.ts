import { prisma } from '@wyrecc/db/src';

import { TRPCError } from '@trpc/server';

import type { IUserSchema } from '../interfaces';
import { ServerError } from '../utils/server-error';

export class AdminService {
  // public adminId: string;
  // constructor(adminId: string) {
  //   this.adminId = adminId;
  //   AdminService.isAdmin(adminId)
  //     .then((res) => res)
  //     .catch(() => {
  //       throw new TRPCError({
  //         code: "UNAUTHORIZED",
  //         message: "You do not have permission to perform this action",
  //       });
  //     });
  // }

  static async isAdmin(adminId: string) {
    try {
      const admin = await prisma.user.findFirst({
        where: {
          id: adminId,
          type: 'ADMIN',
        },
      });

      if (!admin) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You do not have permission to perform this action',
        });
      }
    } catch (error) {
      ServerError(error);
    }
  }
  static async getAdmin(id?: string) {
    try {
      const getuser = await prisma.user.findFirst({
        where: {
          id,
          type: 'ADMIN',
        },
      });
      if (getuser) {
        return getuser;
      }
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Admin not found',
      });
    } catch (error) {
      ServerError(error);
    }
  }

  static async getAdminByEmail(email?: string) {
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
        code: 'NOT_FOUND',
        message: 'user not found',
      });
    } catch (error) {
      ServerError(error);
    }
  }

  static async updateAdmin(data: IUserSchema, id?: string) {
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
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    } catch (error) {
      ServerError(error);
    }
  }

  static async deleteAdmin(id: string) {
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
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    } catch (error) {
      ServerError(error);
    }
  }
}
