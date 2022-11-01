import { text } from "../text";
import { AvatarId, isAvatarId, MatchStage, MatchState, Player } from "../types";
import { DEFAULT_MATCH_SETTINGS, handleError, MATCH_STAGES } from "../utils";

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
    throw handleError(error, logger);
  }
};

export const getMessageSender = (state: MatchState, message: nkruntime.MatchMessage, logger: nkruntime.Logger): Player => {
  const messageSender = state.players[message.sender.userId];
  //TODO check if this condition needs to be checked
  if (!messageSender) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);
  return messageSender;
};

export const canTransitionStage = (state: MatchState, nextStage: MatchStage): boolean => {
  if (state.stageReady.length !== state.settings.players) return false;
  state.matchStage = nextStage;
  state.stageReady = [];
  return true;
};

// "endOfMatchStage" has itself as next stage
export const getNextStage = (state: MatchState): MatchStage => {
  if (state.matchStage === "endOfMatchStage") return state.matchStage;
  const currentStageIndex = MATCH_STAGES.indexOf(state.matchStage);
  const nextStage = MATCH_STAGES[currentStageIndex + 1];
  if (!nextStage) return "endOfMatchStage";
  return nextStage;
};

export const getAvailableAvatar = (state: MatchState): AvatarId => {
  const avatarIds = [1, 2, 3, 4, 5, 6, 7];
  const playerArr = Object.values(state.players);

  playerArr.forEach((player) => {
    avatarIds.splice(avatarIds.indexOf(player.avatarId), 1);
  });
  const id = avatarIds[Math.floor(Math.random() * avatarIds.length)];
  if (isAvatarId(id)) return id;
  //TODO add proper error
  throw new Error("");
};
