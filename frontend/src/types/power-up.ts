import { z } from "zod";

export const powerUpTypeSchema = z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);

export type PowerUpType = z.infer<typeof powerUpTypeSchema>;

// TODO: update type
export const powerUpSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});

export type PowerUp = z.infer<typeof powerUpSchema>;
