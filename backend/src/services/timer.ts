import { EMPTY_DATA, MATCH_STAGE_DURATION } from "../constants";
import { MatchLoopParams, MatchOpCode, PlayerLostByTimeOutPayloadBackend } from "../types";
import { getTicksFromSeconds } from "../utils";
import { getDiceValues } from "../utils/die";
import {
  areAllPlayersReady,
  getActivePlayerId,
  handlePlayerLostRound,
  hidePlayersData,
  rollDiceForPlayer,
  setAllPlayersReady,
} from "./player";

export const handleStartTimer = (loopParams: MatchLoopParams) => {
  const { state } = loopParams;
  const timerDuration = MATCH_STAGE_DURATION[state.matchStage];

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

      setAllPlayersReady(state);

      const payload: PlayerLostByTimeOutPayloadBackend = {
        players: hidePlayersData(state.players),
        diceValue: getDiceValues(state.players),
      };
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_LOST_BY_TIMEOUT, JSON.stringify(payload));

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
