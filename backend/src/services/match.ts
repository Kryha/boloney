import { text } from "../text";
import { AvatarId, MatchLoopParams, MatchStage, MatchState, Player } from "../types";
import { DEFAULT_MATCH_SETTINGS, handleError, MATCH_STAGES, randomInt } from "../utils";

export const matchmakerMatched: nkruntime.MatchmakerMatchedFunction = (_context, logger, nk, matches) => {
  try {
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

// TODO: improve function after adding other functionality
// "endOfMatchStage" has itself as next stage
export const getNextStage = (state: MatchState): MatchStage => {
  if (state.matchStage === "endOfMatchStage") return state.matchStage;
  const currentStageIndex = MATCH_STAGES.indexOf(state.matchStage);
  const nextStage = MATCH_STAGES[currentStageIndex + 1];
  if (!nextStage) return "endOfMatchStage";
  return nextStage;
};

export const getAvailableAvatar = (state: MatchState): AvatarId | undefined => {
  const availableIds: AvatarId[] = [1, 2, 3, 4, 5, 6, 7];
  const players = Object.values(state.players);
  players.forEach((player) => {
    availableIds.splice(availableIds.indexOf(player.avatarId), 1);
  });
  const id = availableIds[randomInt(availableIds.length - 1)];
  if (!id) return;
  return id;
};

type MessageCallback = (message: nkruntime.MatchMessage, sender: Player, loopParams: MatchLoopParams) => void;

type StageTransitionCallback = (loopParams: MatchLoopParams, nextStage: MatchStage) => void;

export const attemptStageTransition = (loopParams: MatchLoopParams, cb?: StageTransitionCallback): void => {
  const { state } = loopParams;
  const nextStage = getNextStage(state);

  // TODO: consider also players that are not playing anymore in this check
  if (state.playersReady.length < state.settings.players) return;
  state.matchStage = nextStage;
  state.playersReady = [];

  cb && cb(loopParams, nextStage);
};

const handleMessages = (loopParams: MatchLoopParams, cb: MessageCallback) => {
  const { messages, state, logger } = loopParams;

  messages.forEach((message) => {
    const messageSender = getMessageSender(state, message);
    if (!messageSender) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);
    cb(message, messageSender, loopParams);
  });
};

export const handleMatchStage = (loopParams: MatchLoopParams, messageCb: MessageCallback, transitionCb?: StageTransitionCallback) => {
  handleMessages(loopParams, messageCb);
  attemptStageTransition(loopParams, transitionCb);
};
