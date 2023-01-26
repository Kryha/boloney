import { isPowerUpId, MatchState, PowerUpId, PowerUpProbability } from "../types";

//TODO: implement this function to work with the toolkit
export const getPowerUp = async (powerUpProbability: PowerUpProbability[]): Promise<PowerUpId | undefined> => {
  const availablePowerUps: string[] = [];

  powerUpProbability.forEach((powerUp) => {
    if (powerUp.probability !== 0) {
      availablePowerUps.push(powerUp.id);
    }
  });
  //TODO: Add a algorithm for the unequal distribution
  const id = availablePowerUps[Math.floor(Math.random() * availablePowerUps.length)];
  if (!isPowerUpId(id)) return;
  return id;
};

export const destroyPoweUp = async (state: MatchState, selectedPowerUps: PowerUpId[]) => {
  //TODO Implement
};
