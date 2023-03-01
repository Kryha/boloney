import { MENAGE_A_TROIS_DICE_AMOUNT } from "../constants";
import {
  HistoryBidAction,
  MatchState,
  Player,
  HistoryPlayerAction,
  HistoryRoundEnd,
  HistoryRoundResults,
  HistoryRoundStart,
  HistoryPlayerStats,
  UsePowerUpPayloadBackend,
  HistoryRoundPlayer,
  SaveHistoryPayload,
} from "../types";
import { totalDiceInMatch } from "./match";
import { getPlayerWithRole } from "./player";

export const saveHistoryEvent = (state: MatchState, saveHistoryPayload: SaveHistoryPayload) => {
  switch (saveHistoryPayload.eventType) {
    case "bidAction":
      if (!saveHistoryPayload.senderId) return;
      saveBidHistoryEvent(state, saveHistoryPayload.senderId);
      break;
    case "playerAction":
      if (!saveHistoryPayload.senderId) return;

      if (!saveHistoryPayload.powerUpPayload) saveHealDiceHistoryEvent(state, saveHistoryPayload.senderId);
      else savePowerUpHistoryEvent(state, saveHistoryPayload.senderId, saveHistoryPayload.powerUpPayload);
      break;
    case "roundResults":
      saveRoundEndHistoryEvent(state);
      break;
    case "roundStart":
      saveRoundStartHistoryEvent(state);
      break;
  }
};

const saveHealDiceHistoryEvent = (state: MatchState, senderId: string) => {
  const action: HistoryPlayerAction = {
    eventType: "playerAction",
    activePlayerName: state.players[senderId].username,
    outcome: "-" + state.settings.healPowerUpAmount.toString(),
    actionName: "healDice",
    createdAt: Date.now(),
  };
  state.historyEvents.push(action);
};

const saveBidHistoryEvent = (state: MatchState, senderId: string) => {
  const bid = state.bids[senderId];
  const action: HistoryBidAction = { ...bid, userId: senderId, eventType: "bidAction" };
  state.historyEvents.push(action);
};

const savePowerUpHistoryEvent = (state: MatchState, senderId: string, payload: UsePowerUpPayloadBackend) => {
  const action: HistoryPlayerAction = {
    eventType: "playerAction",
    activePlayerName: state.players[senderId].username,
    actionName: payload.id,
    createdAt: Date.now(),
  };

  switch (payload.id) {
    case "1":
      action.targetPlayerName = state.players[payload.data.targetId].username;
      break;
    case "2":
      action.targetPlayerName = state.players[payload.data.targetId].username;
      break;
    case "3":
      action.outcome = MENAGE_A_TROIS_DICE_AMOUNT.toString();
      break;
    case "4":
      action.outcome = payload.data.recentlyAdded.toString();
      break;
    case "5":
      action.targetPlayerName = state.players[payload.data.targetId].username;
      break;
    case "6":
      break;
    case "7":
      action.targetPlayerName = state.players[payload.data.targetId].username;
      break;
    case "8":
      break;
    case "9":
      if (!payload.data.targetId) return;
      action.targetPlayerName = state.players[payload.data.targetId].username;
      break;
  }

  state.historyEvents.push(action);
};

const saveRoundEndHistoryEvent = (state: MatchState) => {
  const roundEnd: HistoryRoundEnd = {
    roundNumber: state.round,
    actionName: state.action,
    createdAt: Date.now(),
  };
  const winner = getPlayerWithRole(state, "winner");
  const loser = getPlayerWithRole(state, "loser");
  const userTimeout = getPlayerWithRole(state, "timeOut");

  const roundStats = Object.values(state.players).map((player) => {
    const playerStats = {
      userId: player.userId,
      diceAmount: player.diceAmount,
      powerUpsAmount: player.powerUpsAmount,
    };
    return playerStats;
  });

  if (userTimeout) {
    const roundResults = createTimeOutHistoryEvent(roundEnd, userTimeout, roundStats);
    saveHistoryEvent(state, roundResults);
  } else if (state.action === "Exact") {
    const roundResults = createExactHistoryEvent(roundEnd, winner, loser, roundStats);
    if (roundResults) state.historyEvents.push(roundResults);
  } else {
    if (!winner || !loser) return;

    const roundResults = createBoloneyHistoryEvent(roundEnd, winner, loser, roundStats);
    state.historyEvents.push(roundResults);
  }
};

const saveRoundStartHistoryEvent = (state: MatchState) => {
  const totalDice = totalDiceInMatch(state.players);
  const roundStart: HistoryRoundStart = {
    eventType: "roundStart",
    roundNumber: state.round,
    totalDiceAmount: totalDice,
    stageNumber: state.stageNumber,
    roundsUntillDrawRound: state.drawRoundCounter,
  };
  state.historyEvents.push(roundStart);
};

const createBoloneyHistoryEvent = (
  roundEnd: HistoryRoundEnd,
  winner: Player,
  loser: Player,
  roundStats: HistoryPlayerStats[]
): HistoryRoundResults => {
  const roundLoser: HistoryRoundPlayer = {
    playerStats: {
      userId: loser.userId,
      diceAmount: loser.diceAmount,
      powerUpsAmount: loser.powerUpsAmount,
    },
    isWinner: false,
  };

  const roundWinner: HistoryRoundPlayer = {
    playerStats: {
      userId: winner.userId,
      diceAmount: winner.diceAmount,
      powerUpsAmount: winner.powerUpsAmount,
    },
    isWinner: true,
  };

  const roundResults: HistoryRoundResults = {
    eventType: "roundResults",
    roundEnd,
    roundWinner,
    roundLoser,
    roundStats,
  };

  return roundResults;
};

const createExactHistoryEvent = (
  roundEnd: HistoryRoundEnd,
  winner: Player | undefined,
  loser: Player | undefined,
  roundStats: HistoryPlayerStats[]
): HistoryRoundResults | undefined => {
  const playerActive = winner ? winner : loser;
  if (!playerActive) return;

  const roundWinner: HistoryRoundPlayer = {
    playerStats: {
      userId: playerActive.userId,
      diceAmount: playerActive.diceAmount,
      powerUpsAmount: playerActive.powerUpsAmount,
    },
    isWinner: winner ? true : false,
  };

  const roundResults: HistoryRoundResults = {
    eventType: "roundResults",
    roundEnd: roundEnd,
    roundWinner: roundWinner,
    roundStats: roundStats,
  };

  return roundResults;
};

const createTimeOutHistoryEvent = (
  roundEnd: HistoryRoundEnd,
  userTimeout: Player,
  roundStats: HistoryPlayerStats[]
): HistoryRoundResults => {
  const roundLoser: HistoryRoundPlayer = {
    playerStats: {
      userId: userTimeout.userId,
      diceAmount: userTimeout.diceAmount,
      powerUpsAmount: userTimeout.powerUpsAmount,
    },
    isWinner: false,
  };

  const roundResults: HistoryRoundResults = {
    eventType: "roundResults",
    roundEnd,
    roundWinner: roundLoser,
    roundStats,
  };

  return roundResults;
};
