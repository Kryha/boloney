import { z } from "zod";

export const powerUpIdSchema = z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);

export type PowerUpId = z.infer<typeof powerUpIdSchema>;

export const powerUpIdArraySchema = z.array(powerUpIdSchema);

export const powerUpProbabilitySchema = z.object({
  id: powerUpIdSchema,
  probability: z.number().min(0).max(100),
});

export type PowerUpProbability = z.infer<typeof powerUpProbabilitySchema>;

export const powerUpSchema = z.object({
  id: powerUpIdSchema,
  name: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  icon: z.string(),
  cardImage: z.string(),
});
export type PowerUp = z.infer<typeof powerUpSchema>;
