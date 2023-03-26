import { z } from "zod";

export const teamSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  department: z.string(),
  jobRole: z.string(),
  category: z.enum(["CONTRACTOR", "EMPLOYEE"]),
  salary: z.string(),
  signBonus: z.string(),
  status: z.boolean().default(true),
});

export type ITeamSchema = z.infer<typeof teamSchema>;
