import * as z from 'zod';

// create an interface for the user

// convert the interface to a zod schema
export const UserSchema = z.object({
  // id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  type: z.enum(['ADMIN', 'USER']),
  phone: z.string(),
  password: z.string(),
  emailVerified: z.boolean(),
  image: z.string(),
  jobRole: z.string(),
  // category: z.string(),
  companyId: z.string(),
});

export type IUserSchema = z.infer<typeof UserSchema>;
