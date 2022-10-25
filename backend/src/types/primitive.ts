export const isString = (value: unknown): value is string => typeof value === "string";

export const isNumber = (value: unknown): value is number => typeof value === "number";

export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

// !!! for some reason this throws an error when working with match state
export const isObject = (value: unknown): value is object => typeof value === "object";
