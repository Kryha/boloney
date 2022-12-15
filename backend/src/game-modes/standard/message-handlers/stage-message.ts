import { attemptSetPlayerReady, hidePlayersData, messageHandler } from "../../../services";
import { rollDice } from "../../../toolkit-api";
import { MatchOpCode, RollDicePayload } from "../../../types";
import { handleActivePlayerMessages } from "./active-player-message";

export const handleLobbyMessage = messageHandler(({ state, dispatcher }, message, sender) => {
  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
    const payload = hidePlayersData(state.players);
    dispatcher.broadcastMessage(MatchOpCode.PLAYER_READY, JSON.stringify(payload));
  }
});

export const handlePowerUpMessage = messageHandler(({ state }, message, sender) => {
  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
  }
});

export const handleRollDiceMessage = messageHandler(async ({ state, dispatcher }, message, sender) => {
  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
  }

  if (message.opCode === MatchOpCode.ROLL_DICE) {
    const { userId } = message.sender;
    const player = state.players[userId];

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
});

export const handleReadyMessage = messageHandler(({ state }, message, sender) => {
  if (message.opCode === MatchOpCode.PLAYER_READY) {
    attemptSetPlayerReady(state, sender.userId);
  }
});
