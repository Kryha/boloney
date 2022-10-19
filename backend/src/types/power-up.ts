export type PowerupType = "p1" | "p2" | "p3" | "p4";

export const isPowerupType = (value: unknown): value is PowerupType => {
  const assertedVal = value as PowerupType;

  return assertedVal === "p1" || assertedVal === "p2" || assertedVal === "p3" || assertedVal === "p4";
};

export const isPowerupTypeArray = (types: unknown): types is PowerupType[] => {
  if (!types) return false;
  if (!(types instanceof Array)) return false;

  const areValid = types.reduce((valid, pt) => valid && isPowerupType(pt), true);
  return areValid;
};
