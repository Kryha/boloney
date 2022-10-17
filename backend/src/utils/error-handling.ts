import { AccountKeys, isBasicError, isNkError } from "../types";

export const ERROR_EXTERNAL_CALL: nkruntime.Error = {
  message: "The contract call failed",
  code: nkruntime.Codes.DATA_LOSS,
};

export const ERROR_WRITING_TO_COLLECTION: nkruntime.Error = {
  message: "Writing to the collection has failed",
  code: nkruntime.Codes.UNKNOWN,
};

export const parseError = (error: unknown, code = nkruntime.Codes.INTERNAL): nkruntime.Error => {
  if (typeof error === "string") return { code, message: error };

  if (isNkError(error)) return error;

  if (isBasicError(error)) return { message: error.message, code };

  return { message: "An error occurred.", code };
};

export const handleError = (error: unknown, logger: nkruntime.Logger, code = nkruntime.Codes.INTERNAL): nkruntime.Error => {
  const parsed = parseError(error, code);
  logger.error(parsed.message);
  return parsed;
};

export const handleHttpResponse = (res: nkruntime.HttpResponse, logger: nkruntime.Logger): AccountKeys => {
  const resKind = Math.floor(res.code / 100);
  if (resKind === 2) return JSON.parse(res.body);
  throw handleError(res.body, logger, res.code);
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
