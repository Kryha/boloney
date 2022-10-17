import { text } from "../text";
import { isMatchSettings } from "../types";
import { handleError, rpcHandler } from "../utils";

export const createMatch = rpcHandler((ctx, logger, nk, payload) => {
  if (!ctx.userId) throw handleError(text.error.noIdInContext, logger);
  if (!payload) throw handleError(text.error.noPayload, logger);

  const matchSettings = JSON.parse(payload);

  if (!isMatchSettings(matchSettings)) throw handleError(text.error.invalidPayload, logger, nkruntime.Codes.INVALID_ARGUMENT);

  const matchId = nk.matchCreate("standard", matchSettings);

  return JSON.stringify({ match_id: matchId });
});
