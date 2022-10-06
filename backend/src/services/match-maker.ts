import { MatchSettings } from "../interfaces";
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
    logger.debug(matchId);
    return matchId;
  } catch (error) {
    throw logError(error, logger);
  }
};
