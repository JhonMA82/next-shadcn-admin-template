import { z } from "zod";

export const teacherSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  status: z.enum(["active", "inactive", "on-leave"]),
  hireDate: z.string(),
  department: z.string(),
  rating: z.number(),
});

export type Teacher = z.infer<typeof teacherSchema>;
