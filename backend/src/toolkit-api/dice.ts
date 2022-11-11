import { range } from "../utils";

export const rollDice = async (diceAmount: number) => {
  const value = range(diceAmount, 1).map(() => Math.floor(Math.random() * 6) + 1);
  return value;
};
