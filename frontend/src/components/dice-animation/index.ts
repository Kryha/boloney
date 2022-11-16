import { z } from "zod";
import { Die } from "../../types";
import { DiceRollSchema, DieType } from "./types";

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
