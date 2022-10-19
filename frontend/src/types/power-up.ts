import { z } from "zod";

export const powerUpTypeSchema = z.enum(["p1", "p2", "p3", "p4"]);

export type PowerUpType = z.infer<typeof powerUpTypeSchema>;

// TODO: update type and update type on the backend
export const powerUpSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});

export type PowerUp = z.infer<typeof powerUpSchema>;
