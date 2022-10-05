import { logError, rpcHandler } from "../utils/error-handling";

export const createMatch = rpcHandler((ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string) => {
  if (!ctx.userId) throw logError("No user ID in context", logger);
  if (!payload) throw logError("No payload provided", logger);

  const matchSettings = JSON.parse(payload);
  logger.debug(JSON.stringify(matchSettings));

  let matchId = "";

  try {
    matchId = nk.matchCreate("standard", matchSettings);
  } catch (error) {
    logger.error("Error creating match: %v", error);
    throw logError(error, logger);
  }

  return JSON.stringify({ match_id: matchId });
});
