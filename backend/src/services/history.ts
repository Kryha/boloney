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
  PlayerPublic,
  HistoryRoundEndAction,
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
      if (saveHistoryPayload.roundEndAction) {
        saveRoundEndHistoryEvent(saveHistoryPayload.roundEndAction, state, saveHistoryPayload.senderId);
      }
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

const saveRoundEndHistoryEvent = (roundEndAction: HistoryRoundEndAction, state: MatchState, playerLeftId?: string) => {
  const roundEnd: HistoryRoundEnd = {
    roundNumber: state.round,
    actionName: roundEndAction,
    createdAt: Date.now(),
  };
  const winner = getPlayerWithRole(state, "winner");
  const loser = getPlayerWithRole(state, "loser");
  const userTimeout = getPlayerWithRole(state, "timeOut");

  const roundStats: HistoryPlayerStats[] = Object.values(state.players).map((player) => {
    const playerStats = {
      userId: player.userId,
      diceAmount: player.diceAmount,
      powerUpsAmount: player.powerUpsAmount,
      diceValue: player.diceValue,
    };
    return playerStats;
  });
  const isWinner = winner ? true : false;
  const activePlayer = isWinner ? winner : loser;

  switch (roundEndAction) {
    case "leftMatch":
      if (!playerLeftId) break;
      state.historyEvents.push(createPlayerLeftHistoryEvent(state.players[playerLeftId], roundEnd, roundStats));
      break;
    case "lostByTimeOut":
      if (!userTimeout) break;
      state.historyEvents.push(createTimeOutHistoryEvent(roundEnd, userTimeout, roundStats));
      break;
    case "exact":
      if (!activePlayer) return;
      state.historyEvents.push(createExactHistoryEvent(roundEnd, activePlayer, isWinner, roundStats));
      break;
    case "boloney":
      if (!winner || !loser) break;
      state.historyEvents.push(createBoloneyHistoryEvent(roundEnd, winner, loser, roundStats));
      break;
  }
};

const saveRoundStartHistoryEvent = (state: MatchState) => {
  const historyLength = state.historyEvents.length;
  if (historyLength > 0 && state.historyEvents[historyLength - 1].eventType === "roundStart") return;

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
      diceValue: [],
    },
    isWinner: false,
  };

  const roundWinner: HistoryRoundPlayer = {
    playerStats: {
      userId: winner.userId,
      diceAmount: winner.diceAmount,
      powerUpsAmount: winner.powerUpsAmount,
      diceValue: [],
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
  activePlayer: Player,
  isWinner: boolean,
  roundStats: HistoryPlayerStats[]
): HistoryRoundResults => {
  const roundActivePlayer: HistoryRoundPlayer = {
    playerStats: {
      userId: activePlayer.userId,
      diceAmount: activePlayer.diceAmount,
      powerUpsAmount: activePlayer.powerUpsAmount,
      diceValue: [],
    },
    isWinner: isWinner,
  };

  const roundResults: HistoryRoundResults = {
    eventType: "roundResults",
    roundEnd: roundEnd,
    roundStats: roundStats,
  };

  if (isWinner) {
    roundResults.roundWinner = roundActivePlayer;
  } else {
    roundResults.roundLoser = roundActivePlayer;
  }

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
      diceValue: [],
    },
    isWinner: false,
  };

  const roundResults: HistoryRoundResults = {
    eventType: "roundResults",
    roundEnd,
    roundLoser: roundLoser,
    roundStats,
  };

  return roundResults;
};

const createPlayerLeftHistoryEvent = (
  playerLeft: PlayerPublic,
  roundEnd: HistoryRoundEnd,
  roundStats: HistoryPlayerStats[]
): HistoryRoundResults => {
  const roundLoser: HistoryRoundPlayer = {
    playerStats: {
      userId: playerLeft.userId,
      diceAmount: playerLeft.diceAmount,
      powerUpsAmount: playerLeft.powerUpsAmount,
      diceValue: [],
    },
    isWinner: false,
  };

  return {
    eventType: "roundResults",
    roundEnd: roundEnd,
    roundLoser: roundLoser,
    roundStats: roundStats,
  };
};
