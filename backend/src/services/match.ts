import { text } from "../text";
import { AvatarId, isAvatarId, MatchLoopParams, MatchStage, MatchState, Player } from "../types";
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

export const getMessageSender = (state: MatchState, message: nkruntime.MatchMessage): Player | undefined => {
  const messageSender = state.players[message.sender.userId];
  if (!messageSender) return;
  return messageSender;
};

export const canTransitionStage = (state: MatchState, nextStage: MatchStage): boolean => {
  if (state.stageReady.length !== state.settings.players) return false;
  state.matchStage = nextStage;
  state.stageReady = [];
  return true;
};

// TODO: improve function after adding other functionality
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

type MessageCallback = (message: nkruntime.MatchMessage, sender: Player, loopParams: MatchLoopParams) => void;

type StageTransitionCallback = (loopParams: MatchLoopParams, nextStage: MatchStage) => void;

const handleMessages = (loopParams: MatchLoopParams, cb: MessageCallback) => {
  const { messages, state, logger } = loopParams;

  messages.forEach((message) => {
    const messageSender = getMessageSender(state, message);
    if (!messageSender) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);
    cb(message, messageSender, loopParams);
  });
};

export const handleMatchStage = (loopParams: MatchLoopParams, messageCb: MessageCallback, transitionCb?: StageTransitionCallback) => {
  const { state } = loopParams;
  const nextStage = getNextStage(state);

  handleMessages(loopParams, messageCb);
  if (transitionCb && canTransitionStage(state, nextStage)) {
    transitionCb(loopParams, nextStage);
  }
};
