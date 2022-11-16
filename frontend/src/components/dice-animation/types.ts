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
export const AnyDate = z.preprocess(
  (d) => (typeof d === "object" ? d : ["number", "string"].includes(typeof d) ? new Date(d as number | string) : undefined),
  z.date().optional().nullable()
);

export const BaseDBSchema = z.object({
  id: z.number().int().positive().optional().nullable(),
  createdAt: AnyDate,
  updatedAt: AnyDate,
});

export const DieTypeSchema = z.nativeEnum(DieType);

export const DiceRollSchema = BaseDBSchema.extend({
  type: DieTypeSchema,
  amount: z.preprocess((n) => (typeof n === "string" ? +n : n), z.number().int().positive()),
  result: z.array(z.object({ type: DieTypeSchema, roll: z.number().positive() })),
  campaignId: z.number().int().positive().optional().nullable(),
  color: z.string(),
});
