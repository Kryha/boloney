import { isNumber } from "./primitive";

export interface Die {
  rolledValue: number;
}

export const isDie = (value: unknown): value is Die => {
  const assertedVal = value as Die;

  return assertedVal.rolledValue !== undefined && isNumber(assertedVal.rolledValue);
};
