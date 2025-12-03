import { z } from "zod";

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  status: z.enum(["active", "inactive", "graduated"]),
  enrollmentDate: z.string(),
  program: z.string(),
  gpa: z.number(),
});

export type Student = z.infer<typeof studentSchema>;
