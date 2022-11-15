import { Die } from "../types";
import { randomInt, range } from "../utils";

// TODO: implement zk magic and call to toolkit
export const rollDice = async (diceAmount: number): Promise<Die[]> => {
  const value = range(diceAmount, 1).map(() => ({ rolledValue: randomInt(6, 1) }));
  return value;
};
