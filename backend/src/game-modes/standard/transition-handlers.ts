import {
  calcDrawRoundCounter,
  calcStageNumber,
  hidePlayersData,
  matchStageDuration,
  resetRound,
  setActivePlayer,
  transitionHandler,
} from "../../services";
import { getPowerUp } from "../../toolkit-api";
import { isPowerUpId, MatchOpCode, PlayerGetPowerUpsPayloadBackend, RoundSummaryTransitionPayloadBackend } from "../../types";
import { shuffleArray } from "../../utils";

export const handleBasicTransition = transitionHandler(({ state, dispatcher }, nextStage) => {
  state.timerHasStarted = false;
  dispatcher.broadcastMessage(
    MatchOpCode.STAGE_TRANSITION,
    JSON.stringify({ matchStage: nextStage, remainingStageTime: matchStageDuration[nextStage] })
  );
});

export const handleLobbyTransition = transitionHandler(({ state, dispatcher }, nextStage) => {
  state.playerOrder = shuffleArray(state.playerOrder);
  const activePlayerId = state.playerOrder[0];
  setActivePlayer(activePlayerId, state.players);

  // TODO: We may need to combine this into one message
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_ORDER_SHUFFLE, JSON.stringify({ playerOrder: state.playerOrder }));
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify({ activePlayerId }));
  dispatcher.broadcastMessage(
    MatchOpCode.STAGE_TRANSITION,
    JSON.stringify({ matchStage: nextStage, remainingStageTime: matchStageDuration[nextStage] })
  );
});

export const handleRoundSummaryTransition = transitionHandler(async (loopParams, nextStage) => {
  const { dispatcher, state } = loopParams;

  state.timerHasStarted = false;
  resetRound(loopParams);

  const playersList = Object.values(state.players);

  // update round and round counter
  const totalDice = playersList.reduce((total, player) => total + player.diceAmount, 0);
  state.stageNumber = calcStageNumber(totalDice, state.settings.stageNumberDivisor);

  if (state.drawRoundCounter <= 0) {
    // re-calculate round counter after it reaches 0
    state.drawRoundCounter = calcDrawRoundCounter(state.stageNumber, state.settings.drawRoundOffset);
  } else if (state.drawRoundCounter === 1) {
    state.drawRoundCounter--;
    // give each player a new power-up when the counter reaches 0
    await Promise.all(
      playersList.map(async (player) => {
        if (player.powerUpIds.length >= state.settings.maxPowerUpAmount) return;

        // TODO: add ZK logic here
        const powerUpId = await getPowerUp(state.settings.powerUpProbability);
        if (isPowerUpId(powerUpId)) player.powerUpIds.push(powerUpId);

        const payload: PlayerGetPowerUpsPayloadBackend = player.powerUpIds;
        dispatcher.broadcastMessage(MatchOpCode.PLAYER_GET_POWERUPS, JSON.stringify(payload), [state.presences[player.userId]]);
      })
    );
  } else {
    state.drawRoundCounter--;
  }

  state.round++;

  const payload: RoundSummaryTransitionPayloadBackend = {
    leaderboard: state.leaderboard,
    round: state.round,
    drawRoundCounter: state.drawRoundCounter,
    players: hidePlayersData(state.players),
    stageNumber: state.stageNumber,
  };
  dispatcher.broadcastMessage(MatchOpCode.ROUND_SUMMARY_TRANSITION, JSON.stringify(payload));

  dispatcher.broadcastMessage(
    MatchOpCode.STAGE_TRANSITION,
    JSON.stringify({ matchStage: nextStage, remainingStageTime: matchStageDuration[nextStage] })
  );
});
