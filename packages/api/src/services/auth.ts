import { TRPCError } from "@trpc/server";
import { ADMIN, hashString, SUPER_ADMIN, USER } from "../utils";
import { IEmail, ISignUp, IVerifyEmail } from "../interfaces";
import { prisma } from "@wyre-zayroll/db";
import { sendEmail } from "@wyre-zayroll/dialog";

export class AuthError extends TRPCError {
  constructor(message: string) {
    super({
      code: "UNAUTHORIZED",
      message,
    });
  }
}

export class AuthService {
  static async verifyEmail(input: IVerifyEmail) {
    try {
      const { id, expires } = input;

      const user = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!user)
        new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      const now = new Date();
      const expireTime = new Date(expires);

      if (now > expireTime)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Confirmation link is expired",
        });

      const emailVerified = prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          emailVerified: true,
        },
      });
      return emailVerified;
    } catch (error) {
      if (error instanceof AuthError) {
        throw new AuthError(error.message);
      }
      throw new Error(JSON.stringify(error as string));
    }
  }

  static async sendMailVerification(input: IEmail) {
    try {
      const user = await prisma.user.findFirst({
        where: { email: input.email },
      });

      if (!user)
        new TRPCError({ code: "NOT_FOUND", message: "User not found" });

      const response = await sendEmail({
        from: "admin@tecmie.com",
        subject: "Verify your email",
        to: input.email,
        textBody: "Email sent",
        userId: user?.id,
      });
      return response;
    } catch (error) {
      if (error instanceof AuthError) {
        throw new AuthError(error.message);
      }
      throw new Error(JSON.stringify(error as string));
    }
  }
  static async adminSignUp(input: ISignUp) {
    try {
      // check if company exists
      const companyExists = await AuthService.checkIfCompanyExists(
        input.companyName
      );

      if (companyExists) {
        throw new AuthError("Company already exists");
      }

      // check if email is an organization
      const isOrganization = AuthService.checkIfEmailIsOrganization(
        input.email
      );
      if (!isOrganization) {
        throw new AuthError("Email is not an organization");
      }
      // check if admin exists
      const adminExists = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (adminExists) {
        throw new AuthError("Admin already exists");
      }
      // create company
      const company = await prisma.company.create({
        data: {
          companyName: input.companyName,
          country: input.country,
          companyEmail: input.email,
        },
      });
      // create admin
      const admin = await prisma.admin.create({
        data: {
          name: input.name,
          email: input.email,
          password: await hashString(input.password),
          // company: {
          //     connect: {
          //         id: company.id,
          //     },
          // },
          companyId: company.id,
          type: SUPER_ADMIN,
          jobRole: input.jobRole,
        },
      });
      return admin;
    } catch (error) {
      if (error instanceof AuthError) {
        throw new AuthError(error.message);
      }
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
