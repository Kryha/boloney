import { BidPayloadBackend, isBidPayloadFrontend, MatchLoopParams, MatchOpCode, MatchState, Player } from "../types";
import { EMPTY_DATA } from "../utils";
import { getLatestBid, isBidHigher, isBidMaxTotal } from "./bid";

export const attemptSetPlayerReady = (state: MatchState, userId: string) => {
  if (state.playersReady.includes(userId)) return;
  state.playersReady.push(userId);
  state.players[userId].isReady = true;
};

export const setAllPlayersReady = (state: MatchState) => {
  state.playersReady = Object.keys(state.players).map((playerId) => state.players[playerId].userId);
};

export const getNextPlayerId = (currentPlayerId: string, playerIdsMatchOrder: string[]): string => {
  const currentPlayerIndex = playerIdsMatchOrder.indexOf(currentPlayerId);
  const nextPlayerIndex = (currentPlayerIndex + 1) % playerIdsMatchOrder.length;
  return playerIdsMatchOrder[nextPlayerIndex];
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

export const handleActivePlayerMessages = (message: nkruntime.MatchMessage, sender: Player, loopParams: MatchLoopParams) => {
  const { state, dispatcher, logger, nk } = loopParams;

  // TODO: move and generalise this after implementing error handling with ws calls
  const stopLoading = () => {
    dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [message.sender]);
  };

  switch (message.opCode) {
    case MatchOpCode.PLAYER_PLACE_BID: {
      logger.info(sender.username, " placed BID");
      const data = JSON.parse(nk.binaryToString(message.data));

      if (!isBidPayloadFrontend(data)) return stopLoading();

      const latestBid = getLatestBid(state.bids);

      if (!isBidMaxTotal(state.players, data)) return stopLoading();
      if (latestBid && !isBidHigher(latestBid, data)) return stopLoading();

      state.bids[sender.userId] = { ...data, createdAt: Date.now() };

      const nextActivePlayerId = getNextPlayerId(sender.userId, state.playerOrder);
      setActivePlayer(nextActivePlayerId, state.players);

      const placeBidPayload: BidPayloadBackend = state.bids;
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_PLACE_BID, JSON.stringify(placeBidPayload));
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify({ activePlayerId: nextActivePlayerId }));
      // TODO: implement loading for other calls as well
      stopLoading();

      break;
    }
    case MatchOpCode.PLAYER_CALL_BOLONEY:
      logger.info(sender.username, " Called Boloney: ");

      setActivePlayer(sender.userId, state.players);

      // TODO: Add "CallBoloney" logic

      // Broadcast action to everyone else
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_BOLONEY, JSON.stringify({ player: sender.userId }));

      // TODO: Transition stage to Round Summary only after rendering outcome in the client
      setAllPlayersReady(state);
      break;
    case MatchOpCode.PLAYER_CALL_EXACT:
      logger.info(sender.username, " Called Exact");

      // TODO: Add "CallExact" logic

      // Broadcast action to everyone else
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_EXACT, JSON.stringify({ player: sender.userId }));

      setActivePlayer(sender.userId, state.players);

      // TODO: Transition stage to Round Summary only after rendering outcome in the client
      setAllPlayersReady(state); // We set all the players in order to trigger the stage transition
      break;
    default:
      logger.info("Unknown OP_CODE recieved: ", message.opCode);
      break;
  }
};
