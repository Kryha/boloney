import { text } from "../text";
import { AvatarId, MatchLoopParams, MatchOpCode, MatchStage, MatchState, Player } from "../types";
import { DEFAULT_MATCH_SETTINGS, handleError, MATCH_STAGES, MAX_INACTIVE_TICKS, randomInt } from "../utils";

export const attemptSetPlayerReady = (state: MatchState, userId: string) => {
  if (state.playersReady.includes(userId)) return;
  state.playersReady.push(userId);
  state.players[userId].isReady = true;
};

//This gets called when enough players are in a pool
export const matchmakerMatched: nkruntime.MatchmakerMatchedFunction = (_context, logger, nk, matches) => {
  try {
    matches.forEach((match) => {
      const { userId, username } = match.presence;
      logger.info(`Matched user '${userId}' named '${username}'`);
    });

    const matchId = nk.matchCreate("standard", { ...DEFAULT_MATCH_SETTINGS, players: matches.length });
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
  if (state.matchStage === "endOfMatchStage") return "terminateMatchStage";
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
type StageLogicCallback = (loopParams: MatchLoopParams) => Promise<void>;
type StageTransitionCallback = (loopParams: MatchLoopParams, nextStage: MatchStage) => void;

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
  const { messages, state, logger } = loopParams;

  messages.forEach((message) => {
    const messageSender = getMessageSender(state, message);
    if (!messageSender) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);
    callback(message, messageSender, loopParams);
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

export const setAllPlayersReady = (state: MatchState) => {
  state.playersReady = Object.entries(state.players).map((playerRecord) => playerRecord[1].userId);
};

export const getNextPlayerId = (currentPlayerId: string, playerOrder: string[]): string => {
  const currentPlayerIndex = playerOrder.indexOf(currentPlayerId);
  const isLast = playerOrder.length - 1 === currentPlayerIndex;
  const nextPlayerIndex = isLast ? 0 : currentPlayerIndex + 1;
  return playerOrder[nextPlayerIndex];
};

export const getOtherPresences = (currentPlayerId: string, presences: Record<string, nkruntime.Presence>): nkruntime.Presence[] => {
  return Object.entries(presences)
    .filter((presenceRecord) => presenceRecord[0] !== currentPlayerId)
    .map((presenceRecord) => presenceRecord[1]);
};

export const setActivePlayer = (activePlayerId: string, players: Record<string, Player>): string => {
  resetActivePlayer(players);
  players[activePlayerId].isActive = true;
  return activePlayerId;
};

export const resetActivePlayer = (players: Record<string, Player>): void => {
  Object.entries(players).forEach((player) => (player[1].isActive = false));
};

// TODO improve implementation so we don't send a empty string
export const getActivePlayerId = (players: Record<string, Player>): string => {
  const activePlayer = Object.entries(players).find((player) => player[1].isActive);
  return activePlayer ? activePlayer[1].userId : "";
};
