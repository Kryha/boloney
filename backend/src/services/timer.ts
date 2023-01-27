import { TICK_RATE } from "../constants";
import { MatchLoopParams, MatchOpCode, MatchStage, PlayerLostByTimeOutPayloadBackend } from "../types";
import { setAction } from "./match";
import { getActivePlayerId, handlePlayerLostRound, hidePlayersData, rollDiceForPlayer, setAllPlayersReady } from "./player";

export const getTicksFromSeconds = (timeInSec: number) => {
  return timeInSec * TICK_RATE;
};

export const getSecondsFromTicks = (ticks: number) => {
  return ticks / TICK_RATE;
};

export const handleStartTimer = (loopParams: MatchLoopParams) => {
  const { state } = loopParams;
  const timerDuration = matchStageDuration[state.matchStage];

  state.timerHasStarted = true;
  state.ticksBeforeTimeOut = getTicksFromSeconds(timerDuration);
};

export const handleOutOfTime = async (loopParams: MatchLoopParams) => {
  const { state, dispatcher } = loopParams;
  const activePlayerId = getActivePlayerId(state.players);

  switch (state.matchStage) {
    case "rollDiceStage": {
      const playersWithNoDice = Object.values(state.players).filter((player) => player.hasRolledDice !== true);
      playersWithNoDice.forEach((player) => {
        rollDiceForPlayer(loopParams, player.userId);
      });
      setAllPlayersReady(state);
      break;
    }
    case "getPowerUpStage":
      setAllPlayersReady(state);
      break;
    case "playerTurnLoopStage": {
      if (!activePlayerId) return;
      handlePlayerLostRound(loopParams, activePlayerId, true);

      setAllPlayersReady(state);

      const payload: PlayerLostByTimeOutPayloadBackend = { players: hidePlayersData(state.players) };
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_LOST_BY_TIMEOUT, JSON.stringify(payload));
      setAction("lostByTimeOut", state);

      break;
    }
    case "roundSummaryStage":
      setAllPlayersReady(state);
      break;
  }
};

export const handleTimeOutTicks = (loopParams: MatchLoopParams) => {
  const { state } = loopParams;

  if (!state.timerHasStarted) {
    handleStartTimer(loopParams);
    return;
  }

  state.ticksBeforeTimeOut--;

  if (state.ticksBeforeTimeOut <= 0) {
    handleOutOfTime(loopParams);
    state.timerHasStarted = false;
    return;
  }
};

export const msecToSec = (n: number): number => {
  return Math.floor(n / 1000);
};

// Some stages have no timer at the moment but they may be implemented in the future
// Duration is in seconds
export const matchStageDuration: Record<MatchStage, number> = {
  lobbyStage: 0, // Stage does not have a timer
  getPowerUpStage: 180,
  rollDiceStage: 180,
  playerTurnLoopStage: 180,
  roundSummaryStage: 180,
  endOfMatchStage: 0, // Stage does not have a timer
  terminateMatchStage: 0, // Stage does not have a timer
};
