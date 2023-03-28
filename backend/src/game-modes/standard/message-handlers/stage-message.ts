import {
  attemptSetPlayerReady,
  handlePlayerLeftDuringLobby,
  handlePlayerLeftDuringMatch,
  hidePlayersData,
  messageHandler,
  rollDiceForPlayer,
} from "../../../services";
import { MatchOpCode, PlayerReadyPayloadBackend } from "../../../types";
import { handleActivePlayerMessages } from "./active-player-message";

export const handleLobbyMessage = messageHandler((loopParams, message, sender) => {
  const { state, dispatcher } = loopParams;
  const { userId } = sender;

  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, userId);

    const payload: PlayerReadyPayloadBackend = hidePlayersData(state.players);
    dispatcher.broadcastMessage(MatchOpCode.PLAYER_READY, JSON.stringify(payload));
  }

  if (message.opCode === MatchOpCode.PLAYER_LEFT) {
    handlePlayerLeftDuringLobby(state, sender.userId, dispatcher);
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

export const handleReadyMessage = messageHandler((loopParams, message, sender) => {
  const { state } = loopParams;

  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
  }

  if (message.opCode === MatchOpCode.PLAYER_LEFT) {
    handlePlayerLeftDuringMatch(loopParams, sender.userId);
  }
});
