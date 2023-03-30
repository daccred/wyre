import { z } from "zod";

export const privateLinkAccessSchema = z.object({
  id: z.string(),
  password: z.string(),
  encryptedPassword: z.string().optional(),
});
export const paymentLinkSchema = z.object({
  linkId: z.string(),
  amount: z.number(),
  description: z.string(),
  type: z.enum(["PUBLIC", "PRIVATE"]),
  password: z.string(),
  encryptedPassword: z.string(),
  currency: z.enum(["NGN", "GHS", "USD", "EUR"]),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  wyreRequests: z.array(z.string()),
});

export type IPaymentLinkSchema = z.infer<typeof paymentLinkSchema>;
export type PrivateLinkAccess = z.infer<typeof privateLinkAccessSchema>;
