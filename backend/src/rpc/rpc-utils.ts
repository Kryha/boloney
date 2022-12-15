import { handleError } from "../services";
import { RpcHandler } from "../types";

export const rpcHandler: RpcHandler = (cb) => (ctx, logger, nk, payload) => {
  try {
    const res = cb(ctx, logger, nk, payload);
    return res;
  } catch (error) {
    throw handleError(error, logger);
  }
};
