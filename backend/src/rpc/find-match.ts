import { logError, rpcHandler } from "../utils/error-handling";

export const findMatch = rpcHandler((ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, _payload: string) => {
  if (!ctx.userId) {
    throw logError("No user ID in context", logger);
  }

  let matches: nkruntime.Match[] = [];

  try {
    // TODO: add public-only to query
    const query = "*";
    matches = nk.matchList(5, null, null, null, 1, query);
    logger.info("------- MATCHESSSSSSS -------");
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

  logger.debug(matchIds[0]);

  return JSON.stringify(matchIds[0]);
});
