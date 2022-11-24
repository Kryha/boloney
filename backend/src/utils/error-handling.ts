import { AccountKeys, CustomError, isBasicError, isCustomError, isNkError, isString } from "../types";
import { StatusCodes } from "./status-codes";

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

  return { message: "An error occurred.", code, name };
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

type RpcHandler = (cb: nkruntime.RpcFunction) => nkruntime.RpcFunction;

export const rpcHandler: RpcHandler = (cb) => (ctx, logger, nk, payload) => {
  try {
    const res = cb(ctx, logger, nk, payload);
    return res;
  } catch (error) {
    throw handleError(error, logger);
  }
};

type BeforeAuthHookHandler = (
  cb: nkruntime.BeforeHookFunction<nkruntime.AuthenticateCustomRequest>
) => nkruntime.BeforeHookFunction<nkruntime.AuthenticateCustomRequest>;

export const beforeHookHandler: BeforeAuthHookHandler = (cb) => (ctx, logger, nk, data) => {
  try {
    const res = cb(ctx, logger, nk, data);
    return res;
  } catch (error) {
    throw handleError(error, logger);
  }
};

type AfterAuthHookHandler = (
  cb: nkruntime.AfterHookFunction<nkruntime.Session, nkruntime.AuthenticateCustomRequest>
) => nkruntime.AfterHookFunction<nkruntime.Session, nkruntime.AuthenticateCustomRequest>;

export const afterHookHandler: AfterAuthHookHandler = (cb) => (ctx, logger, nk, data, request) => {
  try {
    const res = cb(ctx, logger, nk, data, request);
    return res;
  } catch (error) {
    throw handleError(error, logger);
  }
};
