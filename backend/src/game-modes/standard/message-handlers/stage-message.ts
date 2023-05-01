import { EMPTY_DATA } from "../../../constants";
import {
  attemptSetPlayerReady,
  errors,
  handlePlayerLeftDuringLobby,
  handlePlayerLeftDuringMatch,
  hidePlayersData,
  messageHandler,
  rollDiceForPlayer,
} from "../../../services";
import { isUpdateHashChainPayloadFrontend, MatchOpCode, PlayerReadyPayloadBackend } from "../../../types";
import { handleActivePlayerMessages } from "./active-player-message";

export const handleLobbyMessage = messageHandler(async (loopParams, message, sender) => {
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

export const handlePowerUpMessage = messageHandler(async (loopParams, message, sender) => {
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

export const handlePlayerTurnMessage = messageHandler(async (loopParams, message, sender) => {
  const { state } = loopParams;

  if (state.players[sender.userId].isActive) {
    await handleActivePlayerMessages(message, sender, loopParams);
  }

  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
  }

  if (message.opCode === MatchOpCode.PLAYER_LEFT) {
    handlePlayerLeftDuringMatch(loopParams, sender.userId);
  }
});

export const handleRoundSummaryMessage = messageHandler(async (loopParams, message, sender) => {
  const { state, nk, dispatcher } = loopParams;

  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
  }

  if (message.opCode === MatchOpCode.PLAYER_LEFT) {
    handlePlayerLeftDuringMatch(loopParams, sender.userId);
  }

  if (message.opCode === MatchOpCode.UPDATE_HASH_CHAIN) {
    const data = JSON.parse(nk.binaryToString(message.data));
    if (!isUpdateHashChainPayloadFrontend(data)) throw errors.invalidPayload;

    state.players[sender.userId].hashChain = data.hashChain;
    state.players[sender.userId].rngDiceCounter = data.hashChain.length;

    dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [message.sender]);
  }
});

export const handleEndOfMatchMessage = messageHandler(async (loopParams, message, sender) => {
  const { state } = loopParams;

  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
  }

  if (message.opCode === MatchOpCode.PLAYER_LEFT) {
    handlePlayerLeftDuringMatch(loopParams, sender.userId);
  }
});
