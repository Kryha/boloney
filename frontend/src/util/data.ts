import { POWER_UP_DATA } from "../assets";
import { PowerUp } from "../types";

// TODO: Use Computed Value getter from store for fetching powerUpData
export const getPowerUpData = (powerUps: PowerUp[]) =>
  POWER_UP_DATA.filter((localPowerUp) => powerUps.some((powerUp) => localPowerUp.id === powerUp.id));
