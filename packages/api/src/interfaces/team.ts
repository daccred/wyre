import { z } from 'zod';

export const teamSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  department: z.string(),
  jobRole: z.string(),
  category: z.enum(['CONTRACTOR', 'EMPLOYEE']),
  salary: z.string(),
  signBonus: z.string(),
  status: z.boolean().default(true),
  payrollMethod: z.enum(['CRYPTO', 'BANK', 'MOBILEMONEY']),
  mobileMoney: z
    .object({
      provider: z.string(),
      phoneNumber: z.string(),
      allocation: z.number(),
      personnelId: z.string(),
    })
    .optional(),
  bank: z
    .object({
      name: z.string(),
      accountNumber: z.string(),
      bankCode: z.string(),
      country: z.string(),
      swiftCode: z.string(),
      routingNumber: z.string(),
      accountType: z.string(),
      allocation: z.number(),
      personnelId: z.string(),
    })
    .optional(),
  cryptoWallet: z
    .object({
      currency: z.string(),
      address: z.string(),
      network: z.string(),
      allocation: z.number(),
      personnelId: z.string(),
    })
    .optional(),
});

export type ITeamSchema = z.infer<typeof teamSchema>;
