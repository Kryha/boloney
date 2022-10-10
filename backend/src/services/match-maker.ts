import { MatchSettings } from "../interfaces";
import { logError } from "../utils";

export const matchmakerMatched: nkruntime.MatchmakerMatchedFunction = (_context, logger, nk, matches): string => {
  logger.info("Match is Made");
  logger.debug(JSON.stringify(matches));

  matches.forEach((match) => {
    const { userId, username } = match.presence;
    logger.info(`Matched user '${userId}' named '${username}'`);
  });

  // TODO: decide upon defaults
  const defaultSettings: MatchSettings = {
    players: 2,
    dicePerPlayer: 5,
    powerupsPerPlayer: 3,
    availablePowerups: ["p1", "p2", "p3", "p4"],
    isUsingFakeCredits: true,
  };

  try {
    const matchId = nk.matchCreate("standard", { ...defaultSettings });
    return matchId;
  } catch (error) {
    throw logError(error, logger);
  }
};
