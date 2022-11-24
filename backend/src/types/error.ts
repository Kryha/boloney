import { isNumber, isString } from "./primitive";

export interface BasicError {
  message: string;
}
export interface CustomError extends nkruntime.Error {
  name: string;
}

export const isBasicError = (error: unknown): error is BasicError => {
  const assertedVal = error as BasicError;

  return assertedVal.message !== undefined && isString(assertedVal.message);
};

export const isNkError = (error: unknown): error is nkruntime.Error => {
  const assertedVal = error as nkruntime.Error;

  return isBasicError(assertedVal) && isNumber(assertedVal.code) && assertedVal.code >= 1 && assertedVal.code <= 16;
};

export const isCustomError = (error: unknown): error is CustomError => {
  const assertedVal = error as CustomError;

  return isNkError(assertedVal) && assertedVal.name !== undefined && isString(assertedVal.name);
};
