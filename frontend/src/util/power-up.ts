import { POWER_UP_DATA } from "../assets";
import { PowerUp, PowerUpId } from "../types";

export const getPowerUp = (powerUpId: PowerUpId): PowerUp => {
  return POWER_UP_DATA[powerUpId];
};

export const getPowerUpData = (powerUpIds: PowerUpId[]) => {
  return powerUpIds.map((id) => {
    return POWER_UP_DATA[id];
  });
};
