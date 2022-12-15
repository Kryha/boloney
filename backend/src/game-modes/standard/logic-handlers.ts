import { logicHandler } from "../../services";
import { getPowerUp } from "../../toolkit-api";
import { isPowerUpId, MatchOpCode } from "../../types";
import { getRange } from "../../utils";

export const handleEmptyLogic = logicHandler(async () => {
  // handler for stages that have no logic
});

export const handlePowerUpLogic = logicHandler(async ({ state, dispatcher }) => {
  const playersList = Object.values(state.players);
  const initialPowerUpAmount = state.settings.initialPowerUpAmount;
  const range = getRange(initialPowerUpAmount);

  await Promise.all(
    playersList.map(async (player) => {
      if (player.hasInitialPowerUps) return;

      await Promise.all(
        range.map(async () => {
          const powerUpId = await getPowerUp(state.settings.powerUpProbability);
          if (isPowerUpId(powerUpId)) player.powerUpIds.push(powerUpId);
        })
      );

      player.hasInitialPowerUps = true;
      dispatcher.broadcastMessage(MatchOpCode.PLAYER_GET_POWERUPS, JSON.stringify(player.powerUpIds), [state.presences[player.userId]]);
    })
  );
});
