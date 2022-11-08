export const isString = (value: unknown): value is string => typeof value === "string";

export const isNumber = (value: unknown): value is number => typeof value === "number";

export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export const isObject = (value: unknown): value is object => typeof value === "object";

export const isStringArray = (value: unknown): value is string[] => {
  if (!value) return false;
  if (!(value instanceof Array)) return false;

  const areValid = value.reduce((valid, v) => valid && isString(v), true);

  return areValid;
};
