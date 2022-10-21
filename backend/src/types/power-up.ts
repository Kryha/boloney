import { isNumber, isString } from "./primitive";

export type PowerupType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export const isPowerupType = (value: unknown): value is PowerupType => {
  const assertedVal = value as PowerupType;

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

export const isPowerupTypeArray = (types: unknown): types is PowerupType[] => {
  if (!types) return false;
  if (!(types instanceof Array)) return false;

  const areValid = types.reduce((valid, pt) => valid && isPowerupType(pt), true);
  return areValid;
};

export interface PowerUp {
  id: string;
  name: string;
  image: string;
}

export const isPowerUp = (value: unknown): value is PowerUp => {
  const assertedVal = value as PowerUp;

  return (
    assertedVal.id !== undefined &&
    assertedVal.name !== undefined &&
    assertedVal.image !== undefined &&
    isString(assertedVal.id) &&
    isString(assertedVal.name) &&
    isString(assertedVal.name)
  );
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
