import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  department: z.string(),
  jobRole: z.string(),
  category: z.enum(["CONTRACTOR", "EMPLOYEE"]),
  salary: z.string(),
  signBonus: z.string(),
  status: z.boolean(),
});

export type IEmployeeSchema = z.infer<typeof employeeSchema>;
