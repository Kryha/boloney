import { z } from "zod";

export const dieSchema = z.object({
  rolledValue: z.number().max(6).min(1),
});

export type Die = z.infer<typeof dieSchema>;

export const rollDicePayloadSchema = z.object({
  diceValue: z.array(dieSchema),
});

export type RollDicePayload = z.infer<typeof rollDicePayloadSchema>;
