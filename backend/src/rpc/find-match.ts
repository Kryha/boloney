import { logError, rpcHandler } from "../utils/error-handling";

export const findMatch = rpcHandler((ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, _payload: string) => {
  if (!ctx.userId) throw logError("No user ID in context", logger);

  let matches: nkruntime.Match[] = [];

  try {
    matches = nk.matchList(100, true);
    logger.debug("------- MATCHES -------", JSON.stringify(matches));
  } catch (error) {
    throw logError("Error listing matches", logger);
  }

  let matchIds: string[] = [];
  if (matches.length > 0) {
    matchIds = matches.map((m) => m.matchId);
  }

  return JSON.stringify({ match_ids: matchIds });
});
