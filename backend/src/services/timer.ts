import { EMPTY_DATA, TICK_RATE } from "../constants";
import { MatchLoopParams, MatchOpCode, MatchStage, PlayerLostByTimeOutPayloadBackend } from "../types";
import { saveHistoryEvent } from "./history";
import { setAction } from "./match";
import {
  areAllPlayersReady,
  getActivePlayerId,
  getDiceValues,
  handlePlayerLostRound,
  hidePlayersData,
  rollDiceForPlayer,
  setAllPlayersReady,
} from "./player";

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
      // TODO: send loading to client
      const playersWithNoDice = Object.values(state.players).filter((player) => player.hasRolledDice !== true);
      await Promise.all(playersWithNoDice.map((player) => rollDiceForPlayer(loopParams, player.userId)));
      break;
    }
    case "playerTurnLoopStage": {
      if (!activePlayerId) return;
      handlePlayerLostRound(loopParams, activePlayerId, true);
      saveHistoryEvent(state, { eventType: "roundResults", roundEndAction: "lostByTimeOut" });

      setAllPlayersReady(state);

      const payload: PlayerLostByTimeOutPayloadBackend = {
        players: hidePlayersData(state.players),
        diceValue: getDiceValues(state.players),
      };
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_LOST_BY_TIMEOUT, JSON.stringify(payload));
      setAction("lostByTimeOut", state);

      break;
    }
  }

  if (areAllPlayersReady(state)) {
    state.timerHasStarted = false;
    // Broadcast stop loading message for hiding the spinner before transitioning to the next stage
    dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA);
  }
};

export const handleTimeOutTicks = async (loopParams: MatchLoopParams) => {
  const { state } = loopParams;

  if (!state.timerHasStarted) {
    handleStartTimer(loopParams);
    return;
  }

  state.ticksBeforeTimeOut--;

  if (state.ticksBeforeTimeOut <= 0) await handleOutOfTime(loopParams);
};

export const msecToSec = (n: number): number => {
  return Math.floor(n / 1000);
};

// TODO: Reduce general Durations after Toolkit calls return quicker
// Some stages have no timer at the moment but they may be implemented in the future
// Duration is in seconds
export const matchStageDuration: Record<MatchStage, number> = {
  lobbyStage: 0, // Stage does not have a timer
  getPowerUpStage: 10,
  rollDiceStage: 10,
  playerTurnLoopStage: 60,
  roundSummaryStage: 10,
  endOfMatchStage: 0, // Stage does not have a timer
  terminateMatchStage: 0, // Stage does not have a timer
};
