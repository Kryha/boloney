import { z } from "zod";

export const dieSchema = z.object({
  rolledValue: z.number().max(6).min(1),
});

export type Die = z.infer<typeof dieSchema>;
