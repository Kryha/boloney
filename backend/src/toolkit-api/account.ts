import { TOOLKIT_ENDPOINTS } from "../constants";
import { AleoAccount, httpError, isHttpError } from "../types";
import { tkUrl } from "../utils";
import { handleToolkitRequest } from "./request-handler";

export const createAleoAccount = (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama): AleoAccount => {
  const url = tkUrl(ctx, TOOLKIT_ENDPOINTS.account.create);
  const res = handleToolkitRequest(url, "post", undefined, nk, logger);

  if (isHttpError(res)) throw httpError(res.code, res.body);

  return JSON.parse(res.body);
};
