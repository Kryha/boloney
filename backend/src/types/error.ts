export interface BasicError {
  message: string;
}

export const isBasicError = (error: unknown): error is BasicError => {
  const assertedVal = error as BasicError;

  return assertedVal.message !== undefined && typeof assertedVal.message === "string";
};

export const isNkError = (error: unknown): error is nkruntime.Error => {
  const assertedVal = error as nkruntime.Error;

  return isBasicError(assertedVal) && typeof assertedVal.code === "number" && assertedVal.code >= 1 && assertedVal.code <= 16;
};
