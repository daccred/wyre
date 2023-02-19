import * as z from "zod";
// create an interface for the user
export interface User {
  id?: string;
  name?: string;
  email?: string;
  userType?: string;
  phone?: string;
  password?: string;
  emailVerified?: boolean;
  image?: string;
  jobRole?: string;
  category?: string;
  companyId?: string;
}

// convert the interface to a zod schema
export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  userType: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional(),
  jobRole: z.string().optional(),
  category: z.string().optional(),
  companyId: z.string().optional(),
});

export type IUserSchema = z.infer<typeof UserSchema>;
