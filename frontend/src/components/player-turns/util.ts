import { useLocalPlayer } from "../../service";
import { useStore } from "../../store";

export const useCanLocalPlayerHealDice = (): boolean => {
  const matchSettings = useStore((state) => state.matchSettings);
  const localPlayer = useLocalPlayer();

  if (!matchSettings || !localPlayer) return false;

  const playerPowerUpAmount = localPlayer.powerUpsAmount;
  const hasEnoughPowerUps = playerPowerUpAmount >= matchSettings.healPowerUpAmount;
  const hasMaxAmountOfDice = localPlayer.diceAmount >= matchSettings.dicePerPlayer;

  if (hasEnoughPowerUps) {
    if (!hasMaxAmountOfDice) return true;
    return false;
  }
  return false;
};
