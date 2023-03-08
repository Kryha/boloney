import { EMPTY_DATA, MATCH_STAGES, MAX_INACTIVE_TICKS } from "../constants";
import { getPowerUp } from "../toolkit-api";
import {
  Action,
  AvatarId,
  isPowerUpId,
  LogicHandler,
  MatchLoopParams,
  MatchOpCode,
  MatchStage,
  MatchState,
  MessageCallback,
  MessageHandler,
  NotificationOpCode,
  Player,
  PlayerGetPowerUpsPayloadBackend,
  PlayerJoinedPayloadBackend,
  PlayerLeftPayloadBackend,
  RoundSummaryTransitionPayloadBackend,
  StageLogicCallback,
  StageTransitionCallback,
  StageTransitionPayloadBackend,
  TransitionHandler,
} from "../types";
import { randomInt } from "../utils";
import { errors, handleError, parseError } from "./error";
import { saveHistoryEvent } from "./history";
import {
  clearPlayerState,
  getActivePlayerId,
  handleActivePlayerTurnEnds,
  handlePlayerLostMatch,
  hidePlayersData,
  isMatchEnded,
  updatePlayerPowerUpAmount,
} from "./player";
import { getSecondsFromTicks, matchStageDuration } from "./timer";

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
    const payload: StageTransitionPayloadBackend = { matchStage: "endOfMatchStage", round: state.round };
    dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify(payload));
    return true;
  }
  return false;
};

export const handlePlayerLeftDuringMatch = (loopParams: MatchLoopParams, senderId: string) => {
  const { state, dispatcher } = loopParams;
  const player = state.players[senderId];

  if (player.status === "lost") return;

  saveHistoryEvent(state, { eventType: "roundResults", senderId: senderId, roundEndAction: "leftMatch" });
  handlePlayerLostMatch(loopParams, player, NotificationOpCode.PLAYER_LEFT);

  const payload: PlayerLeftPayloadBackend = {
    players: hidePlayersData(state.players),
    playerOrder: state.playerOrder,
    playerLeftId: senderId,
    round: state.round,
  };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_LEFT, JSON.stringify(payload));

  state.players[senderId] = clearPlayerState(player);

  if (isMatchEnded(state.players)) {
    state.matchStage = "endOfMatchStage";
  } else {
    state.matchStage = "rollDiceStage";
  }
  handleRoundEnding(loopParams, state.matchStage);
};

export const handlePlayerLeftDuringLobby = (state: MatchState, senderId: string, dispatcher: nkruntime.MatchDispatcher) => {
  state.playerOrder = state.playerOrder.filter((value) => state.players[value].userId !== senderId);
  delete state.players[senderId];
  const payload: PlayerLeftPayloadBackend = {
    players: hidePlayersData(state.players),
    playerLeftId: senderId,
    playerOrder: state.playerOrder,
    round: 0,
  };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_LEFT, JSON.stringify(payload));
  updatePlayersState(state, dispatcher);
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
  state.playersReady = [];

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
    playerRef.isReady = false;
  });
};

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
          matchStage: state.matchStage,
          players: hiddenPlayersData,
          playerOrder: state.playerOrder,
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

// TODO: discuss on how to improve integration with the corresponding transition handler
export const handleRoundEnding = (loopParams: MatchLoopParams, nextStage: MatchStage) => {
  const { dispatcher, state } = loopParams;

  state.timerHasStarted = false;
  resetRound(loopParams);

  const playersList = Object.values(state.players);

  // update round and round counter
  const totalDice = playersList.reduce((total, player) => total + player.diceAmount, 0);
  state.stageNumber = calcStageNumber(totalDice, state.settings.stageNumberDivisor);

  if (state.drawRoundCounter <= 0) {
    // re-calculate round counter after it reaches 0
    state.drawRoundCounter = calcDrawRoundCounter(state.stageNumber, state.settings.drawRoundOffset);
  } else if (state.drawRoundCounter === 1) {
    state.drawRoundCounter--;

    // give each player a new power-up when the counter reaches 0
    playersList.forEach((player) => {
      if (player.status === "lost" || player.powerUpIds.length >= state.settings.maxPowerUpAmount) return;

      const powerUpId = getPowerUp(loopParams);
      if (isPowerUpId(powerUpId)) player.powerUpIds.push(powerUpId);
      updatePlayerPowerUpAmount(loopParams, [player.userId]);

      const payload: PlayerGetPowerUpsPayloadBackend = player.powerUpIds;
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_GET_POWERUPS, JSON.stringify(payload), [state.presences[player.userId]]);
    });
  } else {
    state.drawRoundCounter--;
  }

  state.round++;

  const activePlayer = getActivePlayerId(state.players);
  if (activePlayer) {
    handleActivePlayerTurnEnds(loopParams, activePlayer);
  }

  const roundSummaryTransitionPayload: RoundSummaryTransitionPayloadBackend = {
    leaderboard: state.leaderboard,
    round: state.round,
    drawRoundCounter: state.drawRoundCounter,
    players: hidePlayersData(state.players),
    stageNumber: state.stageNumber,
  };
  const stageTransitionPayload: StageTransitionPayloadBackend = {
    matchStage: nextStage,
    remainingStageTime: matchStageDuration[nextStage],
    round: state.round,
  };
  saveHistoryEvent(state, { eventType: "roundStart" });

  dispatcher.broadcastMessage(MatchOpCode.ROUND_SUMMARY_TRANSITION, JSON.stringify(roundSummaryTransitionPayload));
  dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify(stageTransitionPayload));
};
