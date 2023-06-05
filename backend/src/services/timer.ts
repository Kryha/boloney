import { EMPTY_DATA } from "../constants";
import { MatchLoopParams, MatchOpCode, PlayerLostByTimeOutPayloadBackend } from "../types";
import { getTicksFromSeconds, getDiceValues } from "../utils";
import {
  areAllPlayersReady,
  getActivePlayerId,
  handlePlayerLostRound,
  hidePlayersData,
  rollDiceForPlayer,
  setAllPlayersReady,
} from "./player";

const handleOutOfTime = (loopParams: MatchLoopParams) => {
  const { state, dispatcher } = loopParams;
  const activePlayerId = getActivePlayerId(state.players);

  switch (state.matchStage) {
    case "rollDiceStage": {
      const playersWithNoDice = Object.values(state.players).filter((player) => !player.hasRolledDice);
      playersWithNoDice.forEach((player) => rollDiceForPlayer(loopParams, player.userId));
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

export const handleTimeOutTicks = (loopParams: MatchLoopParams) => {
  const { state } = loopParams;

  if (!state.timerHasStarted) {
    const timerDuration = state.settings.matchStageDuration[state.matchStage];

    state.timerHasStarted = true;
    state.ticksBeforeTimeOut = getTicksFromSeconds(timerDuration);
  } else {
    state.ticksBeforeTimeOut--;
    if (state.ticksBeforeTimeOut <= 0) {
      handleOutOfTime(loopParams);
    }
  }
};
