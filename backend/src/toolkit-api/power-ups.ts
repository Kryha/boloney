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
  const { nk, ctx } = loopParams;

  const url = tkUrl(ctx, "/power-ups/2");

  // TODO: delete log
  loopParams.logger.info("POST URL:", url);

  const body: UseBirdsEyeBodyToolkit = { powerUp, diceData };

  const res = httpRequest(nk, url, "post", body);

  const parsed = JSON.parse(res.body);

  if (!isBirdsEyeResToolkit(parsed)) throw new Error(res.body);

  return parsed;
};

const useCoup = async () => {
  // TODO: implement
};

const useDoubleUp = async () => {
  // TODO: implement
};

export const toolkitUse = {
  birdsEye: useBirdsEye,
  coup: useCoup,
  doubleUp: useDoubleUp,
};
