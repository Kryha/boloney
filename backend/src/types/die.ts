import { isNumber } from "./primitive";

export interface Die {
  rolledValue: number;
}

export const isDie = (value: unknown): value is Die => {
  const assertedVal = value as Die;

  return assertedVal.rolledValue !== undefined && isNumber(assertedVal.rolledValue);
};

export const isDieArray = (values: unknown): values is Die[] => {
  if (!values || !(values instanceof Array)) return false;
  return values.every((value) => isDie(value));
};

export interface RollDicePayload {
  diceValue: Die[];
}
