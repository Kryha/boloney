import { errors } from "../services";
import { isMatchSettings } from "../types";
import { rpcHandler } from "./rpc-utils";

export const createMatch = rpcHandler((ctx, _logger, nk, payload) => {
  if (!ctx.userId) throw errors.noIdInContext;
  if (!payload) throw errors.noPayload;

  const matchSettings = JSON.parse(payload);

  if (!isMatchSettings(matchSettings)) throw errors.invalidPayload;

  const matchId = nk.matchCreate("standard", matchSettings);

  return JSON.stringify({ match_id: matchId });
});
