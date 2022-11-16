import { z } from "zod";
import { Die } from "../../types";
import { BaseDBSchema } from "./util";

export enum DieType {
  D4 = "d4",
  D6 = "d6",
  D8 = "d8",
  D10 = "d10",
  D12 = "d12",
  D20 = "d20",
  D100 = "d100",
}

export const DieTypeSchema = z.nativeEnum(DieType);

export const DiceRollSchema = BaseDBSchema.extend({
  type: DieTypeSchema,
  amount: z.preprocess((n) => (typeof n === "string" ? +n : n), z.number().int().positive()),
  result: z.array(z.object({ type: DieTypeSchema, roll: z.number().positive() })),
  campaignId: z.number().int().positive().optional().nullable(),
  color: z.string(),
});
export type DiceRoll = z.infer<typeof DiceRollSchema>;

export const newRoll = (type: DieType, dice: Die[], color: string): DiceRoll => {
  const result: DiceRoll["result"] = [];
  const amount = dice.length;
  for (let index = 0; index < dice.length; index++) {
    const roll = dice[index].rolledValue;
    result.push({ type, roll: roll });
  }
  return { type, amount, result, color };
};
