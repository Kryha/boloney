import { DEFAULT_MATCH_SETTINGS, logError } from "../utils";

export const matchmakerMatched: nkruntime.MatchmakerMatchedFunction = (_context, logger, nk, matches) => {
  try {
    logger.info("Match is Made");
    logger.debug(JSON.stringify(matches));

    matches.forEach((match) => {
      const { userId, username } = match.presence;
      logger.info(`Matched user '${userId}' named '${username}'`);
    });

    const matchId = nk.matchCreate("standard", DEFAULT_MATCH_SETTINGS);
    return matchId;
  } catch (error) {
    throw logError(error, logger);
  }
};
