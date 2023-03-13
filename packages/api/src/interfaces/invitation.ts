import * as z from "zod";

// create an interface for invitation

// convert the interface to a zod schema
export const InvitationSchema = z.object({
  // id: z.string().optional(),
  email: z.string(),
  description: z.string(),
  token: z.string().optional(),
  category: z.string(),
  expires: z.date().optional(),
  adminId: z.string().optional(),
  // companyId: z.string().optional(),
});

// export the schema as a type
export type InvitationSchemaType = z.infer<typeof InvitationSchema>;
