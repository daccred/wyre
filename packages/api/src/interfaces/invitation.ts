import * as z from "zod";

// create an interface for invitation

export interface Invitation {
  id?: string;
  email?: string;
  description?: string;
  token?: string;
  category?: string;
  expires?: Date;
  adminId?: string;
  companyId?: string;
}

// convert the interface to a zod schema
export const InvitationSchema = z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  description: z.string().optional(),
  token: z.string().optional(),
  category: z.string().optional(),
  expires: z.date().optional(),
  adminId: z.string().optional(),
  companyId: z.string().optional(),
});

// export the schema as a type
export type InvitationSchemaType = z.infer<typeof InvitationSchema>;
