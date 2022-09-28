import { AccountKeys } from "../interfaces/models";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const ERROR_EXTERNAL_CALL: nkruntime.Error = {
  message: "The contract call failed",
  code: nkruntime.Codes.DATA_LOSS,
};

export const ERROR_WRITING_TO_COLLECTION: nkruntime.Error = {
  message: "Writing to the collection has failed",
  code: nkruntime.Codes.UNKNOWN,
};

export const logError = (error: string, code: nkruntime.Codes, logger: nkruntime.Logger): nkruntime.Error => {
  logger.error(error);
  return { message: error, code };
};

export const handleHttpResponse = (res: nkruntime.HttpResponse, logger: nkruntime.Logger): AccountKeys => {
  switch (Math.floor(res.code / 100)) {
    case 4: {
      throw logError(res.body, res.code, logger);
    }
    case 5: {
      throw logError(res.body, res.code, logger);
    }
    case 2: {
      return JSON.parse(res.body);
    }
    default: {
      throw logError(res.body, res.code, logger);
    }
  }
};
