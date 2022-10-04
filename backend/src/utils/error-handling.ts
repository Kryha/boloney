import { isBasicError } from "../interfaces/error";
import { AccountKeys } from "../interfaces/models";

export const ERROR_EXTERNAL_CALL: nkruntime.Error = {
  message: "The contract call failed",
  code: nkruntime.Codes.DATA_LOSS,
};

export const ERROR_WRITING_TO_COLLECTION: nkruntime.Error = {
  message: "Writing to the collection has failed",
  code: nkruntime.Codes.UNKNOWN,
};

export const logError = (error: unknown, logger: nkruntime.Logger, code = nkruntime.Codes.INTERNAL): nkruntime.Error => {
  let message: string;
  if (typeof error === "string") {
    message = error;
  } else if (isBasicError(error)) {
    message = error.message;
  } else {
    message = "An error occurred.";
  }

  logger.error(message);

  return { message, code };
};

export const handleHttpResponse = (res: nkruntime.HttpResponse, logger: nkruntime.Logger): AccountKeys => {
  switch (Math.floor(res.code / 100)) {
    case 4: {
      throw logError(res.body, logger, res.code);
    }
    case 5: {
      throw logError(res.body, logger, res.code);
    }
    case 2: {
      return JSON.parse(res.body);
    }
    default: {
      throw logError(res.body, logger, res.code);
    }
  }
};

type RpcHandler = (cb: nkruntime.RpcFunction) => nkruntime.RpcFunction;

export const rpcHandler: RpcHandler = (cb) => (ctx, logger, nk, payload) => {
  try {
    const res = cb(ctx, logger, nk, payload);
    return res;
  } catch (error) {
    throw logError(error, logger);
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
    throw logError(error, logger);
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
    throw logError(error, logger);
  }
};
