import { z } from 'zod';

export const contractorSchema = z.object({
  email: z.string().email(),
  department: z.string(),
  jobRole: z.string(),
  grossSalary: z.string(),
  signingBonus: z.string(),
  status: z.boolean(),
  name: z.string(),
  category: z.string(),
});

export type contractorSchemaType = z.infer<typeof contractorSchema>;
