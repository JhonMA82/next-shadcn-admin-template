import z from "zod";

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  career: z.string(),
  status: z.string(),
  grade: z.number(),
  enrolled: z.string(),
});

export type StudentRow = z.infer<typeof studentSchema>;
