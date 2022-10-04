import { logError, rpcHandler } from "../utils/error-handling";

export const findMatch = rpcHandler((ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, _payload: string) => {
  if (!ctx.userId) {
    throw logError("No user ID in context", logger);
  }

  let matches: nkruntime.Match[] = [];

  try {
    matches = nk.matchList(1, true);
    logger.info("------- MATCHES -------");
    logger.debug(JSON.stringify(matches));
  } catch (error) {
    throw logError("Error listing matches.", logger);
  }

  let matchIds: string[] = [];
  if (matches.length > 0) {
    // There are one or more ongoing matches the user could join.
    matchIds = matches.map((m) => m.matchId);
  } else {
    // No available matches found, create a new one.
    try {
      logger.debug("NEW GAME CREATION");
      matchIds.push(nk.matchCreate("standard"));
    } catch (error) {
      logger.error("Error creating match: %v", error);
      throw logError(error, logger);
    }
  }

  logger.debug(JSON.stringify(nk.matchGet(matchIds[0])));

  // Try again to check if matchList actually outputs a result
  matches = nk.matchList(1, true);
  logger.info("------- MATCHES V2 -------");
  logger.debug(JSON.stringify(matches));

  return JSON.stringify({ match_id: matchIds[0] });
});
