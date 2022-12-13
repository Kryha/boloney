import {
  BidPayloadBackend,
  BoloneyPayloadBackend,
  ExactPayloadBackend,
  isBidPayloadFrontend,
  MatchLoopParams,
  MatchOpCode,
  MatchState,
  Player,
} from "../types";
import { EMPTY_DATA, hidePlayerData, hidePlayersData } from "../utils";
import { getLatestBid, isBidHigher, isBidMaxTotal } from "./bid";

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

const getNextPlayerId = (currentPlayerId: string, state: MatchState): string => {
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

export const setActivePlayer = (activePlayerId: string, players: Record<string, Player>): string => {
  resetActivePlayer(players);
  players[activePlayerId].isActive = true;
  return activePlayerId;
};

export const resetActivePlayer = (players: Record<string, Player>): void => {
  Object.keys(players).forEach((playerId) => (players[playerId].isActive = false));
};

export const getActivePlayerId = (players: Record<string, Player>): string | undefined => {
  const activePlayer = Object.values(players).find((player) => player.isActive);
  return activePlayer ? activePlayer.userId : undefined;
};

const getTotalDiceWithFace = (players: Record<string, Player>, face: number) =>
  Object.values(players).reduce(
    (total, player) =>
      total +
      player.diceValue.reduce((subTotal, die) => {
        if (die.rolledValue === face) return subTotal + 1;
        return subTotal;
      }, 0),
    0
  );

const handlePlayerLoss = (state: MatchState, loser: Player) => {
  state.leaderboard.unshift(hidePlayerData(loser));

  loser.status = "lost";

  const playersInGame = Object.values(state.players).filter((player) => player.status !== "lost");
  if (playersInGame.length === 1) {
    state.leaderboard.unshift(hidePlayerData(playersInGame[0]));
  }
};

export const handleActivePlayerMessages = (message: nkruntime.MatchMessage, sender: Player, loopParams: MatchLoopParams) => {
  const { state, dispatcher, logger, nk } = loopParams;

  // TODO: move and generalise this after implementing error handling with ws calls
  const stopLoading = () => {
    dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [message.sender]);
  };

  // TODO: define handler functions in other files instead of writing logic directly in the switch
  switch (message.opCode) {
    case MatchOpCode.PLAYER_PLACE_BID: {
      logger.info(sender.username, "placed Bid");
      const data = JSON.parse(nk.binaryToString(message.data));

      if (!isBidPayloadFrontend(data)) return stopLoading();

      const latestBid = getLatestBid(state.bids);

      if (!isBidMaxTotal(state.players, data)) return stopLoading();
      if (latestBid && !isBidHigher(latestBid, data)) return stopLoading();

      state.bids[sender.userId] = { ...data, createdAt: Date.now() };

      const nextActivePlayerId = getNextPlayerId(sender.userId, state);
      setActivePlayer(nextActivePlayerId, state.players);

      const placeBidPayload: BidPayloadBackend = state.bids;
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_PLACE_BID, JSON.stringify(placeBidPayload));
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify({ activePlayerId: nextActivePlayerId }));
      stopLoading();

      break;
    }
    case MatchOpCode.PLAYER_CALL_BOLONEY: {
      logger.info(sender.username, "called Boloney");

      setActivePlayer(sender.userId, state.players);

      const bid = getLatestBid(state.bids);
      if (!bid) return stopLoading();

      const totalDice = getTotalDiceWithFace(state.players, bid.face);

      const target = state.players[bid.userId];
      target.isTarget = true;

      const [winner, loser] = bid.amount <= totalDice ? [target, sender] : [sender, target];

      // TODO: implement ZK lose dice logic
      loser.diceAmount -= 1;
      loser.actionRole = "loser";
      winner.actionRole = "winner";

      if (loser.diceAmount <= 0) handlePlayerLoss(state, loser);

      setAllPlayersReady(state);

      const payload: BoloneyPayloadBackend = { players: hidePlayersData(state.players) };
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_BOLONEY, JSON.stringify(payload));

      const nextPlayerId = getNextPlayerId(sender.userId, state);
      setActivePlayer(nextPlayerId, state.players);

      stopLoading();

      break;
    }
    case MatchOpCode.PLAYER_CALL_EXACT: {
      logger.info(sender.username, "called Exact");

      setActivePlayer(sender.userId, state.players);

      const bid = getLatestBid(state.bids);
      if (!bid) return stopLoading();

      const totalDice = getTotalDiceWithFace(state.players, bid.face);

      const target = state.players[bid.userId];
      target.isTarget = true;

      const [winner, loser] = bid.amount === totalDice ? [sender, target] : [target, sender];

      // TODO: implement ZK lose dice logic
      loser.diceAmount -= 1;
      loser.actionRole = "loser";
      winner.actionRole = "winner";

      if (loser.diceAmount <= 0) handlePlayerLoss(state, loser);

      setAllPlayersReady(state);

      const payload: ExactPayloadBackend = { players: hidePlayersData(state.players) };
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_EXACT, JSON.stringify(payload));

      const nextPlayerId = getNextPlayerId(sender.userId, state);
      setActivePlayer(nextPlayerId, state.players);

      stopLoading();

      break;
    }
    default:
      logger.info("Unknown OP_CODE received: ", message.opCode);
      break;
  }
};
