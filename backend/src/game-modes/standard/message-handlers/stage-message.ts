import {
  attemptSetPlayerReady,
  handlePlayerLeftDuringLobby,
  handlePlayerLeftDuringMatch,
  hidePlayersData,
  messageHandler,
} from "../../../services";
import { rollDice } from "../../../toolkit-api";
import { MatchOpCode, RollDicePayload } from "../../../types";
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
  const { state, dispatcher } = loopParams;
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

      state.players[userId].hasRolledDice = true; // this has to be here in order to prevent user spamming

      try {
        const diceValue = await rollDice(player.diceAmount);
        state.players[userId].diceValue = diceValue;

        const payload: RollDicePayload = { diceValue };
        dispatcher.broadcastMessage(MatchOpCode.ROLL_DICE, JSON.stringify(payload), [message.sender]);
      } catch (error) {
        state.players[userId].hasRolledDice = false;
        throw error;
      }
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
