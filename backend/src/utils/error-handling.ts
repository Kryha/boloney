import { AccountKeys } from "../interfaces/models";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const ERROR_BAD_INPUT: nkruntime.Error = {
  message: "input contained invalid data",
  code: nkruntime.Codes.INVALID_ARGUMENT,
};

export const USERNAME_EXISTS: nkruntime.Error = {
  message: "Username already exists",
  code: nkruntime.Codes.ALREADY_EXISTS,
};

export const ERROR_EXTERNAL_CALL: nkruntime.Error = {
  message: "The contract call failed",
  code: nkruntime.Codes.DATA_LOSS,
};

export const ERROR_WRITING_TO_COLLECTION: nkruntime.Error = {
  message: "Writing to the collection has failed",
  code: nkruntime.Codes.UNKNOWN,
};

export const logError = (error: string, logger: nkruntime.Logger): Error => {
  logger.error(error);
  return new Error(error);
};

export const handleHttpResponse = (res: nkruntime.HttpResponse, logger: nkruntime.Logger): AccountKeys => {
  switch (Math.floor(res.code / 100)) {
    case 4: {
      throw logError(res.body, logger);
    }
    case 5: {
      throw logError(res.body, logger);
    }
    case 2: {
      return JSON.parse(res.body);
    }
    default: {
      throw logError(`Http code: ${res.code} -> ${res.body}`, logger);
    }
  }
};
