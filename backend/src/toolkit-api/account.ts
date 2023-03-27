import { handleHttpResponse } from "../services";
import { AleoAccount } from "../types";
import { httpRequest, tkUrl } from "../utils";

export const createAleoAccount = (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama): AleoAccount => {
  const url = tkUrl(ctx, "/account/create");
  const res = httpRequest(nk, url, "post", undefined);
  return handleHttpResponse(res, logger);
};
