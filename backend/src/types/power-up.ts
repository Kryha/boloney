import { isNumber, isString } from "./primitive";

export type PowerUpId = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export const isPowerUpId = (value: unknown): value is PowerUpId => {
  const assertedVal = value as PowerUpId;

  return (
    assertedVal === "1" ||
    assertedVal === "2" ||
    assertedVal === "3" ||
    assertedVal === "4" ||
    assertedVal === "5" ||
    assertedVal === "6" ||
    assertedVal === "7" ||
    assertedVal === "8" ||
    assertedVal === "9"
  );
};

export const isPowerUpTypeArray = (types: unknown): types is PowerUpId[] => {
  if (!types) return false;
  if (!(types instanceof Array)) return false;

  const areValid = types.reduce((valid, pt) => valid && isPowerUpId(pt), true);
  return areValid;
};

export interface PowerUpProbability {
  id: string;
  probability: number;
}

export const isPowerUpProbability = (value: unknown): value is PowerUpProbability => {
  const assertedVal = value as PowerUpProbability;

  return (
    assertedVal.id !== undefined && assertedVal.probability !== undefined && isString(assertedVal.id) && isNumber(assertedVal.probability)
  );
};

export const isPowerUpProbabilityArray = (values: unknown): values is PowerUpProbability[] => {
  if (!values) return false;
  if (!(values instanceof Array)) return false;

  const areValid = values.reduce((valid, pp) => valid && isPowerUpProbability(pp), true);
  return areValid;
};
