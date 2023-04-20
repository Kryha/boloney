import { POWER_UP_DATA } from "../assets";
import { PlayerPublic, PowerUp, PowerUpId } from "../types";

export const getPowerUp = (powerUpId?: PowerUpId): PowerUp | undefined => {
  if (!powerUpId) return;
  return POWER_UP_DATA[powerUpId];
};

export const getPowerUpData = (powerUpIds: PowerUpId[]) => {
  return powerUpIds.map((id) => {
    return POWER_UP_DATA[id];
  });
};

export const powerUpRequiresTarget = (powerUpId: PowerUpId): boolean => {
  const idsWithTarget: PowerUpId[] = ["1", "2", "5", "7", "9"];
  return idsWithTarget.includes(powerUpId);
};

// Don't add Second Chance here !!!
export const isPowerUpTriggeredImmediately = (powerUpId: PowerUpId) => {
  const immediate: PowerUpId[] = ["3", "4", "8"];
  return immediate.includes(powerUpId);
};

export const powerupCanNotBeUsedOnPlayer = (targetPlayer: PlayerPublic, powerUpId?: PowerUpId): boolean => {
  return powerUpId === "9" && targetPlayer.powerUpsAmount < 1;
};
