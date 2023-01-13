import { logicHandler ,handleTimeOutTicks} from "../../services";
import { getPowerUp } from "../../toolkit-api";
import { isPowerUpId, MatchLoopParams, MatchOpCode } from "../../types";
import { getRange } from "../../utils";

export const handleEmptyLogic = logicHandler(async () => {
  //For empty logic
});

export const handleLogicWithTimer = logicHandler(async (loopParams: MatchLoopParams) => {
  handleTimeOutTicks(loopParams);
});

export const handlePowerUpLogic = logicHandler(async (loopParams: MatchLoopParams) => {
  const { state, dispatcher } = loopParams;
  const playersList = Object.values(state.players);
  const initialPowerUpAmount = state.settings.initialPowerUpAmount;
  const range = getRange(initialPowerUpAmount);

  handleTimeOutTicks(loopParams);

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
