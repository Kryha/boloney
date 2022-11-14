import { Die } from "../types";
import { range } from "../utils";

export const rollDice = async (diceAmount: number): Promise<Die[]> => {
  const value = range(diceAmount, 1).map(() => ({ rolledValue: Math.floor(Math.random() * 6) + 1 }));
  return value;
};
