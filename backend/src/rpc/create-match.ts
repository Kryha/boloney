import { MatchSettings } from "../interfaces";
import { logError, rpcHandler } from "../utils/error-handling";

export const createMatch = rpcHandler((ctx, logger, nk, payload) => {
  if (!ctx.userId) throw logError("No user ID in context", logger);
  if (!payload) throw logError("No payload provided", logger);

  const matchSettings: MatchSettings = JSON.parse(payload);
  logger.debug(`Match Settings: ${JSON.stringify(matchSettings)}`);

  let matchId = "";

  try {
    matchId = nk.matchCreate("standard", matchSettings);
  } catch (error) {
    logger.error("Error creating match: %v", error);
    throw logError(error, logger);
  }

  return JSON.stringify({ match_id: matchId });
});
