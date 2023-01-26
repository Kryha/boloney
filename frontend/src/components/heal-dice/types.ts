import { z } from "zod";
import { powerUpIdSchema } from "../../types";

export const healDicePowerUpSelectionSchema = z.object({
  key: z.number(),
  powerUpId: powerUpIdSchema,
});

export type HealDicePowerUpSelection = z.infer<typeof healDicePowerUpSelectionSchema>;
