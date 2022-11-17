import { z } from "zod";

export enum DieType {
  D4 = "d4",
  D6 = "d6",
  D8 = "d8",
  D10 = "d10",
  D12 = "d12",
  D20 = "d20",
  D100 = "d100",
}

export const baseDBSchema = z.object({
  id: z.number().int().positive().optional().nullable(),
});

export const dieTypeSchema = z.nativeEnum(DieType);

export const diceRollSchema = baseDBSchema.extend({
  type: dieTypeSchema,
  amount: z.preprocess((n) => (typeof n === "string" ? Number(n) : n), z.number().int().positive()),
  result: z.array(z.object({ type: dieTypeSchema, roll: z.number().positive() })),
  campaignId: z.number().int().positive().optional().nullable(),
  color: z.string(),
});
