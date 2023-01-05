import {
  Bid,
  BidPayloadFrontend,
  BidWithUserId,
  MatchLoopParams,
  MatchState,
  NotificationOpCode,
  NotificationContentPlayerLost,
  Player,
  PlayerPublic,
} from "../types";
import { sendNotification } from "./notification";

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

export const getFilteredPlayerIds = (players: Record<string, Player>, playerId: string): string[] => {
  return Object.values(players).reduce((acc, player) => {
    return player.userId !== playerId ? acc.concat(player.userId) : acc;
  }, [] as string[]);
};

export const setActivePlayer = (activePlayerId: string, players: Record<string, Player>): string => {
  resetActivePlayer(players);
  players[activePlayerId].isActive = true;
  return activePlayerId;
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

export const hidePlayerData = (player: Player): PlayerPublic => {
  const copy = Object.assign({}, player); // making a hard copy of the object
  const { diceValue: _, powerUpIds: __, ...publicData } = copy;
  return publicData;
};

export const hidePlayersData = (players: Record<string, Player>): Record<string, PlayerPublic> => {
  return Object.entries(players).reduce((processed, [key, player]) => {
    return { ...processed, [key]: hidePlayerData(player) };
  }, {} as Record<string, PlayerPublic>);
};

export const getTotalDiceWithFace = (players: Record<string, Player>, face: number) =>
  Object.values(players).reduce(
    (total, player) =>
      total +
      player.diceValue.reduce((subTotal, die) => {
        if (die.rolledValue === face) return subTotal + 1;
        return subTotal;
      }, 0),
    0
  );

export const handlePlayerLoss = (loopParams: MatchLoopParams, loser: Player, opCode: NotificationOpCode) => {
  const { nk, state } = loopParams;
  state.leaderboard.unshift({ ...hidePlayerData(loser), lostAtRound: state.round });

  loser.status = "lost";

  const playersInGame = Object.values(state.players).filter((player) => player.status !== "lost");
  if (playersInGame.length === 1) {
    state.leaderboard.unshift({ ...hidePlayerData(playersInGame[0]), lostAtRound: state.round });
  }
  const notificationContent: NotificationContentPlayerLost = {
    activePlayerName: loser.username,
  };
  sendNotification(nk, getFilteredPlayerIds(state.players, loser.userId), opCode, notificationContent);
};

export const getLatestBid = (bids: Record<string, Bid>): BidWithUserId | undefined =>
  Object.entries(bids).reduce((prevLatest: BidWithUserId | undefined, [k, bid]) => {
    if (!prevLatest || prevLatest.createdAt < bid.createdAt) return { userId: k, ...bid };
    return prevLatest;
  }, undefined);

export const isBidMaxTotal = (playersRecord: Record<string, Player>, bid: BidPayloadFrontend) => {
  const players = Object.values(playersRecord);
  const totalDice = players.reduce((total, player) => total + player.diceAmount, 0);
  return totalDice >= bid.amount;
};

export const isBidHigher = (previousHighest: Bid, newHighest: BidPayloadFrontend): boolean => {
  if (!previousHighest) return true;
  const isHigherAmount = previousHighest.amount < newHighest.amount;
  const isHigherFace = previousHighest.face < newHighest.face;

  return isHigherAmount || isHigherFace;
};
