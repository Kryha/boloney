import { EMPTY_DATA, MATCH_STAGES, MAX_INACTIVE_TICKS } from "../constants";
import {
  AvatarId,
  LogicHandler,
  MatchLoopParams,
  MatchOpCode,
  MatchStage,
  MatchState,
  MessageCallback,
  MessageHandler,
  Player,
  StageLogicCallback,
  StageTransitionCallback,
  TransitionHandler,
} from "../types";
import { randomInt } from "../utils";
import { errors, handleError, parseError } from "./error";

export const getMessageSender = (state: MatchState, message: nkruntime.MatchMessage): Player | undefined => {
  const messageSender = state.players[message.sender.userId];
  if (!messageSender) return;
  return messageSender;
};

// "endOfMatchStage" has itself as next stage
export const getNextStage = (state: MatchState): MatchStage => {
  if (state.matchStage === "endOfMatchStage") return "terminateMatchStage";

  const hasMatchTerminated = Object.values(state.players).filter((player) => player.status !== "lost").length <= 1;
  if (state.matchStage === "roundSummaryStage" && !hasMatchTerminated) return "rollDiceStage";

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

export const attemptStageTransition = (loopParams: MatchLoopParams, callback?: StageTransitionCallback): void => {
  const { state } = loopParams;
  const nextStage = getNextStage(state);

  // TODO: consider also players that are not playing anymore in this check.
  if (state.playersReady.length < state.settings.players) return;

  state.matchStage = nextStage;
  state.playersReady = [];

  callback?.(loopParams, nextStage);
};

const handleMessages = (loopParams: MatchLoopParams, callback: MessageCallback) => {
  const { messages, state } = loopParams;

  messages.forEach((message) => {
    const messageSender = getMessageSender(state, message);
    if (!messageSender) throw errors.notFound;
    callback(loopParams, message, messageSender);
  });
};

export const handleMatchStage = (
  loopParams: MatchLoopParams,
  messageCb: MessageCallback,
  stageLogicCb: StageLogicCallback,
  transitionCb?: StageTransitionCallback
) => {
  handleMessages(loopParams, messageCb);
  stageLogicCb(loopParams).then(() => attemptStageTransition(loopParams, transitionCb));
};

// If we have no presences nor messages, increment empty ticks
export const updateEmptyTicks = (state: MatchState, messages: nkruntime.MatchMessage[]): void => {
  if (!state.players || !messages.length) {
    state.emptyTicks++;
  } else {
    state.emptyTicks = 0;
  }
};

// TODO: Add paylod to the message for correctly rendering the end of match stage when match inactive
export const handleInactiveMatch = (state: MatchState, dispatcher: nkruntime.MatchDispatcher): boolean => {
  if (state.emptyTicks > MAX_INACTIVE_TICKS) {
    dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: "endOfMatchStage" }));
    return true;
  }
  return false;
};

//TODO maybe add broadcast event to other players when a player reconnects
export const handlePlayerReconnect = (state: MatchState, presence: nkruntime.Presence, logger: nkruntime.Logger): MatchState => {
  if (state.players[presence.userId].status === "disconnected") {
    state.players[presence.userId].status = "playing";
    logger.info(state.players[presence.userId].userId, "reconnected");
  }
  return state;
};

export const stopLoading = ({ dispatcher, logger }: MatchLoopParams, message: nkruntime.MatchMessage, error?: nkruntime.Error | string) => {
  if (error) {
    const parsedError = parseError(error);
    logger.error("WS error:", parsedError);
    // TODO: send as a notification
    dispatcher.broadcastMessage(MatchOpCode.ERROR, JSON.stringify(parsedError));
  }
  dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [message.sender]);
};

export const messageHandler: MessageHandler = (callback) => (loopParams, message, sender) => {
  try {
    callback(loopParams, message, sender);
  } catch (error) {
    const parsedError = parseError(error);
    stopLoading(loopParams, message, parsedError);
  }
};

export const logicHandler: LogicHandler = (callback) => async (loopParams) => {
  try {
    await callback(loopParams);
  } catch (error) {
    handleError(error, loopParams.logger);
  }
};

export const transitionHandler: TransitionHandler = (callback) => (loopParams, nextStage) => {
  try {
    callback(loopParams, nextStage);
  } catch (error) {
    handleError(error, loopParams.logger);
  }
};

export const resetRound = ({ state }: MatchLoopParams) => {
  state.bids = {};

  Object.values(state.players).forEach((player) => {
    const playerRef = state.players[player.userId];

    playerRef.hasRolledDice = false;
    playerRef.diceValue = [];
    playerRef.actionRole = undefined;
    playerRef.isTarget = false;
  });
};
