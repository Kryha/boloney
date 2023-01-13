import {
  attemptSetPlayerReady,
  handlePlayerLeftDuringLobby,
  handlePlayerLeftDuringMatch,
  hidePlayersData,
  messageHandler,
  rollDiceForPlayer,
} from "../../../services";
import { MatchOpCode } from "../../../types";
import { handleActivePlayerMessages } from "./active-player-message";

export const handleLobbyMessage = messageHandler((loopParams, message, sender) => {
  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(loopParams.state, sender.userId);
    const payload = hidePlayersData(loopParams.state.players);
    loopParams.dispatcher.broadcastMessage(MatchOpCode.PLAYER_READY, JSON.stringify(payload));
  }

  if (message.opCode === MatchOpCode.PLAYER_LEFT) {
    handlePlayerLeftDuringLobby(loopParams.state, sender.userId, loopParams.dispatcher);
  }
});

export const handlePowerUpMessage = messageHandler((loopParams, message, sender) => {
  const { state } = loopParams;

  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
  }

  if (message.opCode === MatchOpCode.PLAYER_LEFT) {
    handlePlayerLeftDuringMatch(loopParams, sender.userId);
  }
});

export const handleRollDiceMessage = messageHandler(async (loopParams, message, sender) => {
  const { state } = loopParams;
  const { userId } = message.sender;
  const player = state.players[userId];

  switch (message.opCode) {
    case MatchOpCode.PLAYER_READY: {
      attemptSetPlayerReady(state, sender.userId);
      break;
    }
    case MatchOpCode.PLAYER_LEFT: {
      handlePlayerLeftDuringMatch(loopParams, sender.userId);
      break;
    }
    case MatchOpCode.ROLL_DICE: {
      if (player.hasRolledDice) return;
      await rollDiceForPlayer(loopParams, sender.userId);
      break;
    }
  }
});

export const handlePlayerTurnMessage = messageHandler((loopParams, message, sender) => {
  const { state } = loopParams;

  if (state.players[sender.userId].isActive) {
    handleActivePlayerMessages(message, sender, loopParams);
  }

  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
  }

  if (message.opCode === MatchOpCode.PLAYER_LEFT) {
    handlePlayerLeftDuringMatch(loopParams, sender.userId);
  }
});

export const handleReadyMessage = messageHandler(({ state }, message, sender) => {
  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
  }
});
