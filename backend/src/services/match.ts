import { EMPTY_DATA, MATCH_STAGES, MATCH_STAGE_DURATION, MAX_INACTIVE_TICKS } from "../constants";
import { getPowerUp } from "../toolkit-api";
import {
  AvatarId,
  isHttpError,
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
  PlayerLeftPayloadBackend,
  RoundSummaryTransitionPayloadBackend,
  StageLogicCallback,
  StageTransitionCallback,
  StageTransitionPayloadBackend,
  TransitionHandler,
} from "../types";
import { randomInt } from "../utils";
import { getDiceValues } from "../utils/die";
import { errors, sendError, handleErrorSideEffects, handleMatchMessageError } from "./error";
import { saveHistoryEvent } from "./history";
import {
  clearPlayerState,
  getActivePlayerId,
  handleActivePlayerTurnEnds,
  handlePlayerLostMatch,
  hidePlayersData,
  isMatchEnded,
  updatePlayerPowerUpAmount,
  updatePlayersState,
} from "./player";
import { getPlayerAccount } from "./storage";

export const getMessageSender = (state: MatchState, message: nkruntime.MatchMessage): Player | undefined => {
  const messageSender = state.players[message.sender.userId];
  if (!messageSender) return;
  return messageSender;
};

export const stopLoading = (loopParams: MatchLoopParams, sender: nkruntime.Presence, error?: nkruntime.Error | string) => {
  const { dispatcher } = loopParams;

  if (error) sendError(loopParams, sender, error);
  dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [sender]);
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
  state.rollBackAttempts = 0;
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
    diceValue: getDiceValues(state.players),
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
    diceValue: getDiceValues(state.players),
  };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_LEFT, JSON.stringify(payload));
  updatePlayersState(state, dispatcher);
};

export const messageHandler: MessageHandler = (callback) => async (loopParams, message, sender) => {
  const { state } = loopParams;
  const deepCopy = structuredClone(state);

  try {
    await callback(loopParams, message, sender);
    state.rollBackAttempts = 0;
  } catch (error) {
    handleMatchMessageError(loopParams, deepCopy, error, message, sender);
  }
};

// If the callback throws an error, the match will be terminated straight away
export const logicHandler: LogicHandler = (callback) => async (loopParams) => {
  const { logger, state, dispatcher } = loopParams;
  const deepCopy = structuredClone(state);

  try {
    await callback(loopParams);
  } catch (error) {
    logger.error("Runtime error while performing internal logic: ", error);

    let opCode = MatchOpCode.PLAYER_GET_POWERUPS;
    // Any error which is not an HTTP error should be handled as in this case of PLAYER_GET_POWERUPS
    if (isHttpError(error)) opCode = error.opCode ?? opCode;

    handleErrorSideEffects(loopParams, deepCopy, opCode, isHttpError(error));
    dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA);
  }
};

export const transitionHandler: TransitionHandler = (callback) => async (loopParams, nextStage) => {
  const { dispatcher, state, logger } = loopParams;
  const deepCopy = structuredClone(state);

  try {
    await callback(loopParams, nextStage);
  } catch (error) {
    const opCode = getOpCodeFromStage(state.matchStage);
    handleErrorSideEffects(loopParams, deepCopy, opCode, isHttpError(error));
    dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA);
    logger.error("Runtime error while performing transition logic " + opCode + JSON.stringify(error, null, 2));
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

// TODO: discuss on how to improve integration with the corresponding transition handler
export const handleRoundEnding = async (loopParams: MatchLoopParams, nextStage: MatchStage) => {
  const { dispatcher, state, nk } = loopParams;

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

      const { address, viewKey, privateKey } = getPlayerAccount(nk, player.userId);

      const powerUpId = getPowerUp(loopParams, { address, viewKey, privateKey });
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
    remainingStageTime: MATCH_STAGE_DURATION[nextStage],
    round: state.round,
  };
  saveHistoryEvent(state, { eventType: "roundStart" });

  dispatcher.broadcastMessage(MatchOpCode.ROUND_SUMMARY_TRANSITION, JSON.stringify(roundSummaryTransitionPayload));
  dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify(stageTransitionPayload));
};

const getOpCodeFromStage = (stage: MatchStage): MatchOpCode => {
  switch (stage) {
    case "roundSummaryStage":
      return MatchOpCode.ROUND_SUMMARY_TRANSITION;
    case "getPowerUpStage":
      return MatchOpCode.PLAYER_GET_POWERUPS;
    case "lobbyStage":
      return MatchOpCode.STAGE_TRANSITION;
    default:
      return MatchOpCode.PLAYER_LOST_BY_TIMEOUT;
  }
};
