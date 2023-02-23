import { EMPTY_DATA, MATCH_STAGES, MAX_INACTIVE_TICKS } from "../constants";
import {
  Action,
  AvatarId,
  LogicHandler,
  MatchLoopParams,
  MatchOpCode,
  MatchStage,
  MatchState,
  MessageCallback,
  MessageHandler,
  NotificationOpCode,
  Player,
  PlayerJoinedPayloadBackend,
  PlayerLeftPayloadBackend,
  StageLogicCallback,
  StageTransitionCallback,
  StageTransitionPayloadBackend,
  TransitionHandler,
} from "../types";
import { randomInt } from "../utils";
import { errors, handleError, parseError } from "./error";
import { getActivePlayerId, getNextPlayerId, handlePlayerLostMatch, hidePlayersData, isMatchEnded, setActivePlayer } from "./player";
import { getSecondsFromTicks } from "./timer";

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

// TODO: Add payload to the message for correctly rendering the end of match stage when match inactive
export const handleInactiveMatch = (state: MatchState, dispatcher: nkruntime.MatchDispatcher): boolean => {
  if (state.emptyTicks > MAX_INACTIVE_TICKS) {
    const payload: StageTransitionPayloadBackend = { matchStage: "endOfMatchStage" };
    dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify(payload));
    return true;
  }
  return false;
};

export const handlePlayerLeftDuringMatch = (loopParams: MatchLoopParams, senderId: string) => {
  const player = loopParams.state.players[senderId];

  handlePlayerLostMatch(loopParams, player, NotificationOpCode.PLAYER_LEFT);
  player.diceValue = [];
  player.diceAmount = 0;
  resetRound(loopParams);

  if (isMatchEnded(loopParams.state.players)) {
    loopParams.state.matchStage = "endOfMatchStage";
    const payloadMatchEnded: PlayerLeftPayloadBackend = {
      players: hidePlayersData(loopParams.state.players),
      playerOrder: loopParams.state.playerOrder,
      leaderboard: loopParams.state.leaderboard,
      stage: loopParams.state.matchStage,
    };
    loopParams.dispatcher.broadcastMessage(MatchOpCode.PLAYER_LEFT, JSON.stringify(payloadMatchEnded));
    return;
  }

  let activePlayerId = getActivePlayerId(loopParams.state.players);
  if (activePlayerId === senderId) setActivePlayer(getNextPlayerId(activePlayerId, loopParams.state), loopParams.state.players);
  activePlayerId = getActivePlayerId(loopParams.state.players);
  loopParams.state.matchStage = "getPowerUpStage";

  const payloadMatchContinues: PlayerLeftPayloadBackend = {
    players: hidePlayersData(loopParams.state.players),
    playerOrder: loopParams.state.playerOrder,
    leaderboard: loopParams.state.leaderboard,
    stage: loopParams.state.matchStage,
  };
  loopParams.dispatcher.broadcastMessage(MatchOpCode.PLAYER_LEFT, JSON.stringify(payloadMatchContinues));
};

export const handlePlayerLeftDuringLobby = (state: MatchState, sender: string, dispatcher: nkruntime.MatchDispatcher) => {
  state.playerOrder = state.playerOrder.slice().filter((value) => state.players[value].userId !== sender);
  delete state.players[sender];
  const payload: PlayerLeftPayloadBackend = {
    players: hidePlayersData(state.players),
    playerOrder: state.playerOrder,
    stage: state.matchStage,
  };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_LEFT, JSON.stringify(payload));
};

export const stopLoading = ({ dispatcher, logger }: MatchLoopParams, sender: nkruntime.Presence, error?: nkruntime.Error | string) => {
  if (error) {
    const parsedError = parseError(error);
    logger.error("WS error:", parsedError);
    dispatcher.broadcastMessage(MatchOpCode.ERROR, JSON.stringify(parsedError));
  }
  dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [sender]);
};

export const messageHandler: MessageHandler = (callback) => (loopParams, message, sender) => {
  try {
    callback(loopParams, message, sender);
  } catch (error) {
    const parsedError = parseError(error);
    stopLoading(loopParams, message.sender, parsedError);
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

export const calcStageNumber = (totalDice: number, stageNumberDivisor: number): number => {
  const res = Math.round(totalDice / stageNumberDivisor);
  if (res < 1) return 1;
  return res;
};

export const calcDrawRoundCounter = (stageNumber: number, drawRoundOffset: number) => {
  const res = Math.floor(stageNumber + drawRoundOffset);
  if (res < 1) return 1;
  return res;
};

export const resetRound = ({ state }: MatchLoopParams) => {
  state.bids = {};

  Object.values(state.players).forEach((player) => {
    const playerRef = state.players[player.userId];

    if (playerRef.extraDice !== 0) {
      playerRef.diceAmount = playerRef.diceAmount - playerRef.extraDice;
      playerRef.extraDice = 0;
    }
    playerRef.arePowerUpsDisabled = false;
    playerRef.hasRolledDice = false;
    playerRef.diceValue = [];
    playerRef.actionRole = undefined;
    playerRef.isTarget = false;
  });
};

// TODO: Remove after checking reload on Match Summary
export const setAction = (action: Action, state: MatchState) => {
  state.action = action;
};

export const updatePlayersState = (state: MatchState, dispatcher: nkruntime.MatchDispatcher) => {
  const hiddenPlayersData = hidePlayersData(state.players);

  Promise.all(
    Object.values(state.presences).map(async (presence) => {
      const player = state.players[presence.userId];
      const turnActionStep = state.matchStage === "roundSummaryStage" ? "results" : state.turnActionStep;
      const payload: PlayerJoinedPayloadBackend = {
        matchState: {
          players: hiddenPlayersData,
          playerOrder: state.playerOrder,
          matchStage: state.matchStage,
          powerUpIds: player.powerUpIds,
          matchSettings: state.settings,
          leaderboard: state.leaderboard,
          hasRolledDice: player.hasRolledDice,
          diceValue: player.diceValue,
          bids: state.bids,
          round: state.round,
          stageNumber: state.stageNumber,
          drawRoundCounter: state.drawRoundCounter,
          turnActionStep: turnActionStep,
          lastAction: state.action,
          historyEvents: state.historyEvents,
        },
        remainingStageTime: getSecondsFromTicks(state.ticksBeforeTimeOut),
      };
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_JOINED, JSON.stringify(payload), [presence]);
    })
  );
};

export const totalDiceInMatch = (playersRecord: Record<string, Player>) => {
  const players = Object.values(playersRecord);
  const totalDice = players.reduce((total, player) => total + player.diceAmount, 0);
  return totalDice;
};
