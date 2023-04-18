import { isMatchOpCode, MatchOpCode } from "./match";
import { isNumber, isString } from "./primitive";
import { StatusCodes } from "./status-codes";

export type ErrorKind =
  | "usernameAlreadyExists"
  | "noUsernamePasswordProvided"
  | "usernameContainsProfanity"
  | "noIdInContext"
  | "noPayload"
  | "invalidPayload"
  | "invalidMetadata"
  | "notFound"
  | "internal";

export type ErrorNotificationMessage = "unknownError" | "rollDiceError" | "usePowerUpError" | "healDiceError" | "invalidPayloadError";

export interface BasicError {
  message: string;
}
export interface CustomError extends nkruntime.Error {
  name: string;
}

export interface HttpError {
  httpCode: StatusCodes;
  message: string;
  opCode?: MatchOpCode;
}

export const isInternalServerError = (code: StatusCodes): boolean => {
  return code >= 500 && code < 600;
};

export const isBadRequestError = (code: StatusCodes): boolean => {
  return code >= 400 && code < 500;
};

export const isErrorStatusCode = (code: unknown): code is StatusCodes => {
  const assertedVal = code as StatusCodes;

  return isNumber(assertedVal) && (isInternalServerError(assertedVal) || isBadRequestError(assertedVal));
};

export const isHttpError = (error: unknown): error is HttpError => {
  const assertedVal = error as HttpError;

  return (
    assertedVal.httpCode !== undefined &&
    isErrorStatusCode(assertedVal.httpCode) &&
    assertedVal.message !== undefined &&
    isString(assertedVal.message) &&
    (assertedVal.opCode === undefined || isMatchOpCode(assertedVal.opCode))
  );
};

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
