import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export interface SignUp {
  email: string;
  password: string;
  name: string;
  companyName?: string;
  country?: string;
  jobRole?: string;
  companyId?: string;
}

export const signUpSchema = loginSchema.extend({
  name: z.string(),
  companyName: z.string().optional(),
  country: z.string().optional(),
  jobRole: z.string().optional(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
