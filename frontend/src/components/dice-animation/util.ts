import { AvatarColor, Die } from "../../types";
import { DiceRoll, DieType } from "./types";

export const newRoll = (type: DieType, dice: Die[], color: AvatarColor): DiceRoll => {
  const result: DiceRoll["result"] = [];
  const amount = dice.length;
  for (let index = 0; index < dice.length; index++) {
    const roll = dice[index].rolledValue;
    result.push({ type, roll: roll });
  }
  return { type, amount, result, color };
};
