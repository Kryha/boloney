import { AccountKeys, CustomError, ErrorKind, isBasicError, isCustomError, isNkError, isString, StatusCodes } from "../types";

export const errorText: Record<ErrorKind, string> = {
  usernameAlreadyExists: "Username already exists",
  usernameContainsProfanity: "Username contains profanity",
  noUsernamePasswordProvided: "No username/password provided",
  noIdInContext: "No user ID in context",
  noPayload: "No payload provided",
  invalidPayload: "Invalid payload",
  invalidMetadata: "Invalid metadata",
  notFound: "Not found",
  internal: "Internal error",
};

export const errors: Record<ErrorKind, nkruntime.Error> = {
  usernameAlreadyExists: {
    message: errorText.usernameAlreadyExists,
    code: nkruntime.Codes.ALREADY_EXISTS,
  },
  noUsernamePasswordProvided: {
    message: errorText.noUsernamePasswordProvided,
    code: nkruntime.Codes.INVALID_ARGUMENT,
  },
  usernameContainsProfanity: {
    message: errorText.usernameContainsProfanity,
    code: nkruntime.Codes.INVALID_ARGUMENT,
  },
  noIdInContext: {
    message: errorText.noIdInContext,
    code: nkruntime.Codes.UNAUTHENTICATED,
  },
  noPayload: {
    message: errorText.noPayload,
    code: nkruntime.Codes.INVALID_ARGUMENT,
  },
  invalidPayload: {
    message: errorText.invalidPayload,
    code: nkruntime.Codes.INVALID_ARGUMENT,
  },
  invalidMetadata: {
    message: errorText.invalidMetadata,
    code: nkruntime.Codes.INVALID_ARGUMENT,
  },
  notFound: {
    message: errorText.notFound,
    code: nkruntime.Codes.NOT_FOUND,
  },
  internal: {
    message: errorText.internal,
    code: nkruntime.Codes.INTERNAL,
  },
};

export const mapHttpCodeToNakama = (httpCode: StatusCodes): nkruntime.Codes => {
  const httpToNakama: Record<number, nkruntime.Codes> = {
    [StatusCodes.BAD_REQUEST]: nkruntime.Codes.NOT_FOUND,
    [StatusCodes.NOT_FOUND]: nkruntime.Codes.NOT_FOUND,
    [StatusCodes.UNAUTHORIZED]: nkruntime.Codes.PERMISSION_DENIED,
    [StatusCodes.FORBIDDEN]: nkruntime.Codes.PERMISSION_DENIED,
    [StatusCodes.CONFLICT]: nkruntime.Codes.FAILED_PRECONDITION,
    [StatusCodes.GONE]: nkruntime.Codes.NOT_FOUND,
    [StatusCodes.PRECONDITION_FAILED]: nkruntime.Codes.FAILED_PRECONDITION,
    [StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE]: nkruntime.Codes.OUT_OF_RANGE,
    [StatusCodes.INTERNAL_SERVER_ERROR]: nkruntime.Codes.INTERNAL,
    [StatusCodes.NOT_IMPLEMENTED]: nkruntime.Codes.UNIMPLEMENTED,
  };
  return httpToNakama[httpCode] ? httpToNakama[httpCode] : nkruntime.Codes.UNKNOWN;
};

export const ERROR_EXTERNAL_CALL: nkruntime.Error = {
  message: "The contract call failed",
  code: nkruntime.Codes.DATA_LOSS,
};

export const ERROR_WRITING_TO_COLLECTION: nkruntime.Error = {
  message: "Writing to the collection has failed",
  code: nkruntime.Codes.UNKNOWN,
};

export const parseError = (error: unknown, code = nkruntime.Codes.INTERNAL): CustomError => {
  const name = "Error";

  if (isString(error)) return { code, message: error, name };

  if (isCustomError(error)) return error;

  if (isNkError(error)) return { ...error, name };

  if (isBasicError(error)) return { message: error.message, code, name };

  return { message: errorText.internal, code, name };
};

export const handleError = (error: unknown, logger: nkruntime.Logger, code = nkruntime.Codes.INTERNAL): nkruntime.Error => {
  const parsed = parseError(error, code);
  logger.error(parsed.message);
  return parsed;
};

export const handleHttpResponse = (res: nkruntime.HttpResponse, logger: nkruntime.Logger): AccountKeys => {
  const resKind = Math.floor(res.code / 100);
  if (resKind === 2) return JSON.parse(res.body);
  const nakamaCode = mapHttpCodeToNakama(res.code);
  throw handleError(res.body, logger, nakamaCode);
};
