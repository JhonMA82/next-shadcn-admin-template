import z from "zod";

export const enrollmentSchema = z.object({
  id: z.string(),
  student: z.string(),
  career: z.string(),
  plan: z.string(),
  status: z.string(),
  documents: z.number(),
  total: z.number(),
  submitted: z.string(),
});

export type EnrollmentRow = z.infer<typeof enrollmentSchema>;
