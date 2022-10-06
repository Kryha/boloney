import { logError } from "../utils";

export const matchmakerMatched = (
  _context: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  matches: nkruntime.MatchmakerResult[]
): string => {
  logger.info("Match is Made");
  logger.debug(JSON.stringify(matches));

  matches.forEach(function (match) {
    logger.info("Matched user '%s' named '%s'", match.presence.userId, match.presence.username);

    Object.keys(match.properties).forEach(function (key) {
      logger.info("Matched on '%s' value '%v'", key, match.properties[key]);
    });
  });

  try {
    const matchId = nk.matchCreate("standard", { invited: matches });
    logger.debug(matchId);
    return matchId;
  } catch (error) {
    throw logError(error, logger);
  }
};
