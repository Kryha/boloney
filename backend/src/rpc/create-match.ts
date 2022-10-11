import { MatchSettings } from "../interfaces";
import { error } from "../text";
import { logError, rpcHandler } from "../utils/error-handling";

export const createMatch = rpcHandler((ctx, logger, nk, payload) => {
  if (!ctx.userId) throw logError(error.noIdInContext, logger);
  if (!payload) throw logError(error.noPayload, logger);

  // TODO: define and handle types with Zod
  const matchSettings: MatchSettings = JSON.parse(payload);
  logger.debug(`Match Settings: ${JSON.stringify(matchSettings)}`);

  const matchId = nk.matchCreate("standard", matchSettings);

  return JSON.stringify({ match_id: matchId });
});
