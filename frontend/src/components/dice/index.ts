import { z } from "zod";
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
});
export type DiceRoll = z.infer<typeof DiceRollSchema>;

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export const newRoll = (type: DieType, amount: number): DiceRoll => {
  const result: DiceRoll["result"] = [];
  for (let index = 0; index < amount; index++) {
    const sides = +type.toString().replace("d", "");
    const roll = sides === 100 ? getRandomInt(0, sides) : getRandomInt(1, sides + 1);
    result.push({ type, roll: 6 });
  }
  return { type, amount, result };
};
