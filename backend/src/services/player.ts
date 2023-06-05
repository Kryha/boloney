import { EMPTY_DATA } from "../constants";
import { rollDice } from "../toolkit-api";
import {
  MatchLoopParams,
  MatchState,
  Player,
  PlayerPublic,
  RollDicePayload,
  MatchOpCode,
  PlayerJoinedPayloadBackend,
  NotificationOpCode,
  NotificationContentPlayerLost,
} from "../types";
import { getSecondsFromTicks } from "../utils";
import { saveHistoryEvent } from "./history";
import { sendMatchNotification } from "./notification";
import { getPlayerAccount } from "./storage";

export const handlePlayerLostRound = (loopParams: MatchLoopParams, playerId: string, isTimeOut: boolean) => {
  const { state } = loopParams;
  state.players[playerId].diceAmount -= 1;
  state.players[playerId].actionRole = isTimeOut ? "timeOut" : "loser";

  if (isTimeOut) {
    saveHistoryEvent(state, { eventType: "roundResults", roundEndAction: "lostByTimeOut" });
    state.action = "lostByTimeOut";
  }

  if (state.players[playerId].diceAmount <= 0) {
    handlePlayerLostMatch(loopParams, state.players[playerId], NotificationOpCode.PLAYER_LOST);
  }
};

export const handlePlayerLostMatch = (loopParams: MatchLoopParams, loser: Player, opCode: NotificationOpCode) => {
  const { state } = loopParams;
  state.leaderboard.unshift({ ...hidePlayerData(loser), lostAtRound: state.round });

  loser.status = "lost";

  const playersInGame = Object.values(state.players).filter((player) => player.status !== "lost");

  if (playersInGame.length === 1) {
    state.leaderboard.unshift({ ...hidePlayerData(playersInGame[0]), lostAtRound: state.round });
  }

  const notificationContent: NotificationContentPlayerLost = {
    activePlayerName: loser.username,
  };
  const receiversIds = getFilteredPlayerIds(state.players, [loser.userId]);
  if (!isMatchEnded(state.players)) sendMatchNotification(loopParams, opCode, notificationContent, receiversIds);
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
      dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [presence]);
    })
  );
};

export const attemptSetPlayerReady = (state: MatchState, userId: string) => {
  if (state.playersReady.includes(userId)) return;
  state.playersReady.push(userId);
  state.players[userId].isReady = true;
};

export const setLosersAsReady = (state: MatchState) => {
  Object.values(state.players).forEach((player) => {
    if (player.status === "lost") attemptSetPlayerReady(state, player.userId);
  });
};

export const setAllPlayersReady = (state: MatchState) => {
  state.playersReady = Object.keys(state.players).map((playerId) => state.players[playerId].userId);
};

export const getNextPlayerId = (currentPlayerId: string, state: MatchState): string => {
  const currentPlayerIndex = state.playerOrder.indexOf(currentPlayerId);

  let nextPlayerId: string;
  let nextPlayer: Player;
  let nextPlayerIndex: number | undefined;
  do {
    const addend = nextPlayerIndex === undefined ? currentPlayerIndex : nextPlayerIndex;
    nextPlayerIndex = (addend + 1) % state.playerOrder.length;
    nextPlayerId = state.playerOrder[nextPlayerIndex];
    nextPlayer = state.players[nextPlayerId];
  } while (nextPlayer.status === "lost");

  return nextPlayerId;
};

export const getOtherPresences = (currentPlayerId: string, presences: Record<string, nkruntime.Presence>): nkruntime.Presence[] => {
  return Object.entries(presences)
    .filter((presenceRecord) => presenceRecord[0] !== currentPlayerId)
    .map((presenceRecord) => presenceRecord[1]);
};

/*
 * Filters out the specified player ids.
 */
export const getFilteredPlayerIds = (players: Record<string, Player>, playerIds: string[]): string[] => {
  return Object.values(players)
    .filter((player) => !playerIds.includes(player.userId))
    .map((player) => player.userId);
};

export const rollDiceForPlayer = (loopParams: MatchLoopParams, playerId: string) => {
  const { state, dispatcher, nk } = loopParams;
  const player = state.players[playerId];

  // Set hasRolledDice to true before the dice roll to prevent users spamming calls
  player.hasRolledDice = true;

  const { address, privateKey, viewKey } = getPlayerAccount(nk, playerId);

  const diceValue = rollDice(loopParams, player.diceAmount, player, { address, privateKey, viewKey });

  player.diceValue = diceValue;

  const payload: RollDicePayload = { diceValue };
  dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [state.presences[playerId]]);
  dispatcher.broadcastMessage(MatchOpCode.ROLL_DICE, JSON.stringify(payload), [state.presences[playerId]]);
};

export const areAllPlayersReady = (state: MatchState): boolean => {
  return Object.values(state.players).every((player) => player.isReady);
};

export const setActivePlayer = (activePlayerId: string, players: Record<string, Player>): string => {
  resetActivePlayer(players);
  players[activePlayerId].isActive = true;
  return activePlayerId;
};

export const handleActivePlayerTurnEnds = (loopParams: MatchLoopParams, currentPlayerId: string) => {
  const { state } = loopParams;

  const nextActivePlayerId = getNextPlayerId(currentPlayerId, state);
  setActivePlayer(nextActivePlayerId, state.players);

  state.timerHasStarted = false;
  state.activePowerUp = undefined;

  return nextActivePlayerId;
};

export const resetActivePlayer = (players: Record<string, Player>): void => {
  Object.keys(players).forEach((playerId) => (players[playerId].isActive = false));
};

export const isMatchEnded = (players: Record<string, Player>): boolean => {
  const playersLeft = Object.values(players).filter((player) => player.status !== "lost");

  return playersLeft.length <= 1;
};

export const getActivePlayerId = (players: Record<string, Player>): string | undefined => {
  const activePlayer = Object.values(players).find((player) => player.isActive);

  return activePlayer ? activePlayer.userId : undefined;
};

export const updatePlayerPublicData = (loopParams: MatchLoopParams, playerIds: string[]): void => {
  const { state } = loopParams;

  playerIds.forEach((playerId) => {
    if (state.players[playerId].status === "lost") return;

    const player = state.players[playerId];

    player.diceAmount = player.diceValue.length;
    player.powerUpsAmount = player.powerUpIds.length;
  });
};

export const updatePlayerPowerUpAmount = (loopParams: MatchLoopParams, playerIds: string[]): void => {
  const { state } = loopParams;

  playerIds.forEach((playerId) => {
    if (state.players[playerId].status === "lost") return;

    const player = state.players[playerId];

    player.powerUpsAmount = player.powerUpIds.length;
  });
};

export const hidePlayerData = (player: Player): PlayerPublic => {
  const { diceValue: _, powerUpIds: __, hashChain: ___, ...publicData } = player;

  return publicData;
};

export const hidePlayersData = (players: Record<string, Player>): Record<string, PlayerPublic> => {
  return Object.entries(players).reduce((processed, [key, player]) => {
    return { ...processed, [key]: hidePlayerData(player) };
  }, {} as Record<string, PlayerPublic>);
};

export const clearPlayerState = (player: Player): Player => {
  const newPlayer: Player = {
    ...player,
    diceValue: [],
    powerUpIds: [],
    diceAmount: 0,
    powerUpsAmount: 0,
  };

  return newPlayer;
};
