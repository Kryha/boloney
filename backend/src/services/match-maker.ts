import { getErrorMessage } from "../utils/error-handling";

export const matchmakerMatched = (
  context: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  matches: nkruntime.MatchmakerResult[]
): string => {
  logger.info("Match is Made");
  matches.forEach(function (match) {
    logger.info("Matched user '%s' named '%s'", match.presence.userId, match.presence.username);

    Object.keys(match.properties).forEach(function (key) {
      logger.info("Matched on '%s' value '%v'", key, match.properties[key]);
    });
  });

  try {
    const matchId = nk.matchCreate("standard", { invited: matches });
    return matchId;
  } catch (err) {
    logger.error(getErrorMessage(err));
    throw err;
  }
};
