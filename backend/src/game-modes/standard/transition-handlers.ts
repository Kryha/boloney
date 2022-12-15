import { resetRound, setActivePlayer, transitionHandler } from "../../services";
import { LeaderboardUpdatePayloadBackend, MatchOpCode, PlayerUpdatePayloadBackend } from "../../types";
import { shuffleArray } from "../../utils";

export const handleBasicTransition = transitionHandler(({ dispatcher }, nextStage) => {
  dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
});

export const handleLobbyTransition = transitionHandler(({ state, dispatcher }, nextStage) => {
  state.playerOrder = shuffleArray(state.playerOrder);
  const activePlayerId = state.playerOrder[0];
  setActivePlayer(activePlayerId, state.players);

  // TODO: We may need to combine this into one message
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_ORDER_SHUFFLE, JSON.stringify({ playerOrder: state.playerOrder }));
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify({ activePlayerId }));
  dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
});

export const handleSummaryTransition = transitionHandler((loopParams, nextStage) => {
  const { dispatcher, state } = loopParams;
  resetRound(loopParams);

  const leaderboardPayload: LeaderboardUpdatePayloadBackend = { leaderboard: state.leaderboard };
  dispatcher.broadcastMessage(MatchOpCode.LEADERBOARD_UPDATE, JSON.stringify(leaderboardPayload));

  dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));

  const payload: PlayerUpdatePayloadBackend = { players: state.players };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_UPDATE, JSON.stringify(payload));
});
