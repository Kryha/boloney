import { setActivePlayer, transitionHandler, matchStageDuration, handleRoundEnding } from "../../services";
import { MatchOpCode, PlayerActivePayloadBackend, PlayerOrderShufflePayloadBackend, StageTransitionPayloadBackend } from "../../types";
import { shuffleArray } from "../../utils";

export const handleBasicTransition = transitionHandler(async ({ state, dispatcher }, nextStage) => {
  state.timerHasStarted = false;

  const payload: StageTransitionPayloadBackend = {
    matchStage: nextStage,
    remainingStageTime: matchStageDuration[nextStage],
    round: state.round,
  };
  dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify(payload));
});

export const handleLobbyTransition = transitionHandler(async (loopParams, nextStage) => {
  const { state, dispatcher } = loopParams;
  state.playerOrder = shuffleArray(state.playerOrder);

  const activePlayerId = state.playerOrder[0];
  setActivePlayer(activePlayerId, state.players);

  const stageTransitionPayload: StageTransitionPayloadBackend = {
    matchStage: nextStage,
    remainingStageTime: matchStageDuration[nextStage],
    round: state.round,
  };
  const playerOrderShufflePayload: PlayerOrderShufflePayloadBackend = { playerOrder: state.playerOrder };
  const playerActivePayload: PlayerActivePayloadBackend = { activePlayerId, remainingStageTime: matchStageDuration.getPowerUpStage };

  dispatcher.broadcastMessage(MatchOpCode.PLAYER_ORDER_SHUFFLE, JSON.stringify(playerOrderShufflePayload));
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify(playerActivePayload));
  dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify(stageTransitionPayload));
});

export const handleRoundSummaryTransition = transitionHandler(handleRoundEnding);
