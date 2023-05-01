import { logicHandler, handleTimeOutTicks, stopLoading, getPlayerAddress, getPlayerKeys } from "../../services";
import { getPowerUp } from "../../toolkit-api";
import { isPowerUpId, MatchLoopParams, MatchOpCode, PlayerGetPowerUpsPayloadBackend } from "../../types";
import { getRange } from "../../utils";

export const handleEmptyLogic = logicHandler(async () => {
  // To be called when a stage has no logic
});

export const handleLogicWithTimer = logicHandler(async (loopParams: MatchLoopParams) => {
  await handleTimeOutTicks(loopParams);
});

export const handlePowerUpLogic = logicHandler(async (loopParams: MatchLoopParams) => {
  const { state, dispatcher, nk } = loopParams;
  const playersList = Object.values(state.players);
  const initialPowerUpAmount = state.settings.initialPowerUpAmount;
  const range = getRange(initialPowerUpAmount);

  await handleTimeOutTicks(loopParams);

  // TODO: Store PowerUp records instead of just IDs
  await Promise.all(
    playersList.map(async (player) => {
      if (player.hasInitialPowerUps) return;

      const address = getPlayerAddress(nk, player.userId);
      const { privateKey, viewKey } = getPlayerKeys(nk, player.userId);

      await Promise.all(
        range.map(async () => {
          const powerUpId = getPowerUp(loopParams, { address, privateKey, viewKey });
          if (isPowerUpId(powerUpId)) player.powerUpIds.push(powerUpId);
        })
      );

      player.hasInitialPowerUps = true;

      const payload: PlayerGetPowerUpsPayloadBackend = player.powerUpIds;
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_GET_POWERUPS, JSON.stringify(payload), [state.presences[player.userId]]);

      stopLoading(loopParams, state.presences[player.userId]);
    })
  );
});
