import {
  DiceDataToolkit,
  isBirdsEyeResToolkit,
  isPowerUpId,
  MatchLoopParams,
  MatchState,
  PowerUpId,
  PowerUpProbability,
  PowerUpToolkit,
  UseBirdsEyeBodyToolkit,
  UseBirdsEyeResToolkit,
} from "../types";
import { httpRequest, tkUrl } from "../utils";

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

const useBirdsEye = (loopParams: MatchLoopParams, powerUp: PowerUpToolkit, diceData: DiceDataToolkit): UseBirdsEyeResToolkit => {
  const { nk } = loopParams;

  const url = tkUrl("/power-ups/2");
  const body: UseBirdsEyeBodyToolkit = { powerUp, diceData };

  const res = httpRequest(nk, url, "post", body);

  const parsed = JSON.parse(res.body);

  if (!isBirdsEyeResToolkit(parsed)) throw new Error(res.body);

  return parsed;
};

export const toolkitUse = {
  birdsEye: useBirdsEye,
};
