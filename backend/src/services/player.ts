import { EMPTY_DATA } from "../constants";
import { rollDice } from "../toolkit-api";
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
  RollDicePayload,
  MatchOpCode,
  ActionRole,
} from "../types";
import { totalDiceInMatch } from "./match";
import { sendMatchNotification } from "./notification";

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

export const getPlayerWithRole = (state: MatchState, actionRole: ActionRole): Player | undefined => {
  const playersValues = Object.values(state.players);
  return playersValues.find((player) => player.actionRole === actionRole);
};

export const getOtherPresences = (currentPlayerId: string, presences: Record<string, nkruntime.Presence>): nkruntime.Presence[] => {
  return Object.entries(presences)
    .filter((presenceRecord) => presenceRecord[0] !== currentPlayerId)
    .map((presenceRecord) => presenceRecord[1]);
};

export const getFilteredPlayerIds = (players: Record<string, Player>, playerId: string): string[] => {
  return Object.values(players)
    .filter((player) => player.userId !== playerId)
    .map((player) => player.userId);
};

export const rollDiceForPlayer = async (loopParams: MatchLoopParams, playerId: string) => {
  const { state, dispatcher } = loopParams;
  const player = state.players[playerId];

  //!! Setting the hasRolledDice variable to true before the dice are rolled prevent the users ability to spam !!
  player.hasRolledDice = true;

  try {
    const diceValue = await rollDice(loopParams, player.diceAmount);

    if (!diceValue) throw Error("Rolling dice has failed");

    player.diceValue = diceValue;

    const payload: RollDicePayload = { diceValue };
    dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [state.presences[playerId]]);
    dispatcher.broadcastMessage(MatchOpCode.ROLL_DICE, JSON.stringify(payload), [state.presences[playerId]]);
  } catch (error) {
    player.hasRolledDice = false;
    throw error;
  }
};

export const handlePlayerLostRound = (loopParams: MatchLoopParams, playerId: string, isTimeOut: boolean) => {
  const { state } = loopParams;
  state.players[playerId].diceAmount -= 1;
  state.players[playerId].actionRole = isTimeOut ? "timeOut" : "loser";

  if (state.players[playerId].diceAmount <= 0) {
    handlePlayerLostMatch(loopParams, state.players[playerId], NotificationOpCode.PLAYER_LOST);
  }
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
    const player = state.players[playerId];

    player.diceAmount = player.diceValue.length;
    player.powerUpsAmount = player.powerUpIds.length;
  });
};

export const updatePlayerPowerUpAmount = (loopParams: MatchLoopParams, playerIds: string[]): void => {
  const { state } = loopParams;

  playerIds.forEach((playerId) => {
    const player = state.players[playerId];

    player.powerUpsAmount = player.powerUpIds.length;
  });
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
  sendMatchNotification(loopParams, opCode, notificationContent, loser.userId);
};

export const getLatestBid = (bids: Record<string, Bid>): BidWithUserId | undefined =>
  Object.entries(bids).reduce((prevLatest: BidWithUserId | undefined, [k, bid]) => {
    if (!prevLatest || prevLatest.createdAt < bid.createdAt) return { userId: k, ...bid };

    return prevLatest;
  }, undefined);

export const isBidMaxTotal = (playersRecord: Record<string, Player>, bid: BidPayloadFrontend) => {
  const totalDice = totalDiceInMatch(playersRecord);
  return totalDice >= bid.amount;
};

export const isBidHigher = (previousHighest: Bid, newHighest: BidPayloadFrontend): boolean => {
  if (!previousHighest) return true;
  const isHigherAmount = previousHighest.amount < newHighest.amount;
  const isHigherFace = previousHighest.face < newHighest.face;

  return isHigherAmount || isHigherFace;
};
