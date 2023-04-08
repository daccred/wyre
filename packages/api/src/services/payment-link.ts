import * as argon2 from 'argon2';
import { nanoid } from 'nanoid';

import { prisma } from '@wyrecc/db';
import { getBaseUrl, sendEmail, paymentLinkEmail } from '@wyrecc/dialog';

import { TRPCError } from '@trpc/server';

import type { IPaymentLinkSchema, PrivateLinkAccess } from '../interfaces';
import { generateFiveDigitCode, ServerError } from '../utils';
import { EncryptionService } from './encryption';

export class PaymentService {
  static async generateLink(employeeId: string) {
    try {
      const employee = await prisma.team.findFirst({
        where: { id: employeeId },
      });

      if (!employee) throw new TRPCError({ code: 'NOT_FOUND', message: 'Employee not found' });
      const link = `${getBaseUrl()}/employees?email=${employee.email}`;
      const email = paymentLinkEmail({ link });

      const response = await sendEmail({
        from: 'admin@tecmie.com',
        subject: 'Make your payment request',
        to: employee.email,
        textBody: 'Email sent',
        htmlBody: email,
      });

      return { link, response };
    } catch (error) {
      ServerError(error);
    }
  }
  static async getSinglePaymentLink(paymentLinkId: string) {
    try {
      const paymentLink = await prisma.paymentLink.findFirst({
        where: {
          id: paymentLinkId,
          status: 'ACTIVE',
        },
      });
      if (!paymentLink) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payment link does not exist',
        });
      }
      return paymentLink;
    } catch (error) {
      ServerError(error);
    }
  }

  static async getUserPaymentLinks(userId: string) {
    try {
      const userPaymentLinks = prisma.paymentLink.findMany({ where: { userId } });

      if (!userPaymentLinks) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Payment links not found' });
      }
      return userPaymentLinks;
    } catch (error) {
      ServerError(error);
    }
  }

  static async createPaymentLink(data: IPaymentLinkSchema) {
    try {
      let hashedPassword: string;
      let encrypted: string;
      let createPaymentLink;
      let code;
      // check if link is private

      switch (data.type) {
        case 'PRIVATE':
          // generate and hash the five-digit-code
          code = generateFiveDigitCode();
          hashedPassword = await argon2.hash(code);
          encrypted = EncryptionService.encryptData(code);
          // create the payment link
          createPaymentLink = await prisma.paymentLink.create({
            data: {
              ...data,
              password: hashedPassword,
              encryptedPassword: encrypted,
              linkId: nanoid(10),
            },
          });

          if (!createPaymentLink) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to create payment link',
            });
          }
          return {
            createPaymentLink,
            message: code,
          };
        case 'PUBLIC':
          createPaymentLink = await prisma.paymentLink.create({
            data: {
              ...data,
              linkId: nanoid(10),
            },
          });
          if (!createPaymentLink) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to create payment link',
            });
          }
          return createPaymentLink;
      }
    } catch (error) {
      ServerError(error);
    }
  }

  static async updatePaymentLink(id: string, data: IPaymentLinkSchema) {
    try {
      let code;
      let encrypted;
      // check if a link is private or is about to be changed to a private link
      if (data.type && data.type === 'PRIVATE') {
        // generate the five digit code and hash before saving to the database
        code = generateFiveDigitCode();
        data.password = await argon2.hash(code as string);
        encrypted = EncryptionService.encryptData(code as string);
        data.encryptedPassword = encrypted;
      }
      // if the link is to be changed from a private link to a public link the password will be disabled
      if (data.type == 'PUBLIC') {
        // hash the password
        data.password = '';
      }
      const updatePaymentLink = await prisma.paymentLink.update({
        where: {
          id,
        },
        data,
      });
      if (updatePaymentLink) {
        return {
          updatePaymentLink,
          message: code ?? null,
        };
      }
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Payment link not found',
      });
    } catch (error) {
      ServerError(error);
    }
  }

  static async deletePaymentLink(id: string) {
    try {
      const deletePaymentLink = await prisma.paymentLink.delete({
        where: {
          id,
        },
      });

      if (!deletePaymentLink) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete payment link',
        });
      }
      return deletePaymentLink;
    } catch (error) {
      ServerError(error);
    }
  }

  static async verifyPaymentLink(data: PrivateLinkAccess) {
    try {
      const paymentLink = await prisma.paymentLink.findFirst({
        where: {
          linkId: data.id,
          status: 'ACTIVE',
        },
      });
      if (!paymentLink?.password) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payment link does not exist',
        });
      }

      const isPassValid = await argon2.verify(paymentLink.password, data.password);
      if (!isPassValid) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Password is incorrect' });
      }
      return paymentLink;
    } catch (error) {
      ServerError(error);
    }
  }

  static async decryptPaymentLinkCode(id: string) {
    try {
      const paymentLink = await prisma.paymentLink.findFirst({
        where: {
          id,
          status: 'ACTIVE',
        },
      });
      if (!paymentLink?.encryptedPassword) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payment link does not exist',
        });
      }

      const decryptCode = EncryptionService.decryptData(paymentLink.encryptedPassword);
      return { code: decryptCode };
    } catch (error) {
      ServerError(error);
    }
  }
}
