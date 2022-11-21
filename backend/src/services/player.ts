import { MatchOpCode, MatchState, Player } from "../types";

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

// TODO: Refactor using the same pattern as "handleMatchStage"
export const handleActivePlayerMessages = (
  message: nkruntime.MatchMessage,
  sender: Player,
  state: MatchState,
  dispatcher: nkruntime.MatchDispatcher,
  logger: nkruntime.Logger,
  otherPresences: nkruntime.Presence[]
) => {
  let nextActivePlayerId = "";

  switch (message.opCode) {
    case MatchOpCode.PLAYER_PLACE_BID:
      logger.info(sender.username, " placed BID");

      // TODO: Add "PlaceBid" logic
      // TODO: Add "lastBid" property to the MatchState
      nextActivePlayerId = setActivePlayer(getNextPlayerId(sender.userId, state.playerOrder), state.players);
      // Set next active player

      // Broadcast PlaceBid action to everyone else
      dispatcher.broadcastMessage(
        MatchOpCode.PLAYER_PLACE_BID,
        JSON.stringify({ player: sender.userId, lastBid: message.data }),
        otherPresences
      );

      dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify({ activePlayerId: nextActivePlayerId }));
      break;
    case MatchOpCode.PLAYER_CALL_BOLONEY:
      logger.info(sender.username, " Called Boloney: ");

      setActivePlayer(sender.userId, state.players);

      // TODO: Add "CallBoloney" logic

      // Broadcast action to everyone else
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_BOLONEY, JSON.stringify({ player: sender.userId }), otherPresences);

      // TODO: Transition stage to Round Summary only after rendering outcome in the client
      setAllPlayersReady(state);
      break;
    case MatchOpCode.PLAYER_CALL_EXACT:
      logger.info(sender.username, " Called Exact");

      // TODO: Add "CallExact" logic

      // Broadcast action to everyone else
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_EXACT, JSON.stringify({ player: sender.userId }), otherPresences);

      setActivePlayer(sender.userId, state.players);

      // TODO: Transition stage to Round Summary only after rendering outcome in the client
      setAllPlayersReady(state); // We set all the players in order to trigger the stage transition
      break;
    default:
      logger.info("Unknown OP_CODE recieved: ", message.opCode);
      break;
  }
};
