import { TRPCError } from "@trpc/server";
import { ADMIN, hashString, SUPER_ADMIN, USER } from "../utils";
import { ISignUp, IVerifyEmail } from "../interfaces";
import { prisma } from "@wyre-zayroll/db";
import { sendEmail } from "@wyre-zayroll/dialog";
import { Prisma } from "@prisma/client";

export class AuthError extends TRPCError {
  constructor(message: string) {
    super({
      code: "UNAUTHORIZED",
      message,
    });
  }
}

export class AuthService {
  static async adminSignUp(input: ISignUp) {
    try {
      // check if admin exists
      const adminExists = await prisma.admin.findFirst({
        where: {
          email: input.email,
        },
      });

      if (adminExists) {
        throw new AuthError("Admin already exists");
      }
      // check if company exists
      const companyExists = await AuthService.checkIfCompanyExists(
        input.companyName
      );

      if (companyExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Company already exists",
        });
      }

      // check if email is an organization
      const isOrganization = AuthService.checkIfEmailIsOrganization(
        input.email
      );
      if (!isOrganization) {
        throw new AuthError("Email is not an organization");
      }

      // create company
      const company = await prisma.company.create({
        data: {
          companyName: input.companyName,
          country: input.country,
          companyEmail: input.email,
          companyPhone: input.companyPhone,
        },
      });

      if (!company) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Company creation failed",
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

      // create admin
      const admin = await prisma.admin.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.companyPhone,
          password: await hashString(input.password),
          companyId: company.id,
          type: SUPER_ADMIN,
          jobRole: input.jobRole,
          verifyId: token.id,
        },
      });

      if (!admin) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create admin",
        });
      }

      //Send verification code to email address
      const response = await AuthService.sendAdminMailVerification(
        admin.email,
        confirmCode
      );

      if (!response) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send verification code",
        });
      }

      return { admin, emailStatus: response };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw new TRPCError({ code: error.code, message: error.message });
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: error.name,
          message: "Prisma Client validation failed",
        });
      }
      console.warn(error);
      throw new Error(JSON.stringify(error as string));
    }
  }

  static async verifyAdminEmail(input: IVerifyEmail) {
    try {
      const { id, token } = input;

      const admin = await prisma.admin.findFirst({
        where: {
          id,
        },
        select: {
          verification: true,
        },
      });

      if (!admin?.verification) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to verify admin email",
        });
      }

      const now = new Date();
      const expireTime = admin.verification.expires;
      if (now > expireTime)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Confirmation code is expired",
        });

      if (token === admin.verification.token) {
        const adminVerfied = await prisma.admin.update({
          where: {
            id: id,
          },
          data: {
            emailVerified: true,
          },

          select: {
            verification: true,
            emailVerified: true,
          },
        });

        return adminVerfied;
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Confirmation code is invalid",
        });
      }
    } catch (error) {
      if (error instanceof TRPCError) {
        throw new TRPCError({ code: error.code, message: error.message });
      }
      console.warn(error);
      throw new Error(JSON.stringify(error as string));
    }
  }

  static async userSignUp(input: ISignUp) {
    try {
      // check if email exists
      const emailExists = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (emailExists) {
        throw new AuthError("Email already exists");
      }
      // create user
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: await hashString(input.password),
          jobRole: input.jobRole,
          type: USER,
          // companyId: input.companyId,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof AuthError) {
        throw new AuthError(error.message);
      }
      throw new Error(JSON.stringify(error as string));
    }
  }

  static async sendAdminMailVerification(email: string, verifyCode: string) {
    try {
      const admin = await prisma.admin.findFirst({
        where: { email: email },
      });

      if (!admin)
        new TRPCError({ code: "NOT_FOUND", message: "Admin not found" });

      const response = await sendEmail({
        from: "admin@tecmie.com",
        subject: "Verify your email",
        to: email,
        textBody: "Email sent",
        userId: admin?.id,
        verifyCode,
      });
      return response;
    } catch (error) {
      if (error instanceof AuthError) {
        throw new AuthError(error.message);
      }
      throw new Error(JSON.stringify(error as string));
    }
  }

  static async checkIfCompanyExists(companyName?: string) {
    const result = await prisma.company.findFirst({
      where: {
        companyName: companyName as string,
      },
    });

    return !!result;
  }

  static checkIfEmailIsOrganization(email: string) {
    // get all the free email domains/clients
    const emailClients = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "icloud.com",
      "mail.com",
      "msn.com",
      "live.com",
      "zoho.com",
      "yandex.com",
      "protonmail.com",
      "gmx.com",
      "mail.ru",
      "inbox.com",
      "ymail.com",
      "hushmail.com",
      "rocketmail.com",
      "lavabit.com",
    ];
    // get the domain from the email
    const domain = email.split("@")[1];
    // check if the domain is in the free email clients
    const isFreeEmail = emailClients.includes(domain as string);
    if (isFreeEmail) {
      return false;
    }
    return true;
  }

  static async checkIfSuperAdmin(userId: string) {
    const result = await prisma.admin.findFirst({
      where: {
        id: userId,
        type: SUPER_ADMIN,
      },
    });
    if (!result) {
      throw new AuthError("You are not a super admin");
    }
    return true;
  }

  static async checkIfAdmin(userId: string) {
    const result = await prisma.admin.findFirst({
      where: {
        id: userId,
        type: ADMIN,
      },
    });
    if (!result) {
      throw new AuthError("You are not an admin");
    }
    return true;
  }
}
