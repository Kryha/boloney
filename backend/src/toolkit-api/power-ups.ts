import {
  DiceDataToolkit,
  isBirdsEyeResToolkit,
  isPowerUpId,
  isRandomNumberResToolkit,
  MatchLoopParams,
  MatchState,
  PowerUpId,
  PowerUpProbability,
  PowerUpToolkit,
  ProbabilityRanges,
  RandomNumberBodyToolkit,
  UseBirdsEyeBodyToolkit,
  UseBirdsEyeResToolkit,
} from "../types";
import { httpRequest, isZkEnabled, randomInt, tkUrl } from "../utils";

export const getAvailablePowerUps = (powerUpsProbability: PowerUpProbability[]): PowerUpProbability[] => {
  const availablePowerUps = powerUpsProbability.filter((powerUp) => powerUp.probability !== 0);

  return availablePowerUps;
};

export const generateProbabilityRange = (powerUpsProbability: PowerUpProbability[]): ProbabilityRanges => {
  const availablePowerUps = getAvailablePowerUps(powerUpsProbability);
  const probabilityRanges: ProbabilityRanges = [];

  availablePowerUps.reduce((accumulator, currentElement) => {
    const currentTotal: number = accumulator + currentElement.probability;

    probabilityRanges.push({
      id: currentElement.id,
      from: accumulator + 1,
      to: currentTotal,
    });

    return currentTotal;
  }, 0);

  return probabilityRanges;
};

export const getPowerUpIdFromProbability = (randomNumber: number, probabilityRange: ProbabilityRanges): PowerUpId | undefined => {
  const [id] = probabilityRange
    .filter((segment) => segment.from <= randomNumber && randomNumber <= segment.to)
    .map((segment) => segment.id);

  if (!isPowerUpId(id)) return;
  return id;
};

export const getPowerUp = (loopParams: MatchLoopParams): PowerUpId | undefined => {
  const { nk, state, ctx } = loopParams;
  const { powerUpProbability } = state.settings;

  const availablePowerUps = getAvailablePowerUps(powerUpProbability);
  const probabilityRange = generateProbabilityRange(availablePowerUps);
  let id: PowerUpId | undefined = undefined;

  if (isZkEnabled(state, ctx)) {
    // Generate Random Number 1-100
    // TODO: For now mock the seed, eventually get it from the combined hashes
    const mockRn = randomInt(1, 999999999999999);
    const randomSeed = mockRn;

    const url = tkUrl(ctx, "/random/number");
    const body: RandomNumberBodyToolkit = { seed: randomSeed, min: 1, max: 100 };

    // TODO: Return a PowerUpRecord and extract ID
    const res = httpRequest(nk, url, "post", body);
    const parsedBody = JSON.parse(res.body);

    if (!isRandomNumberResToolkit(parsedBody)) throw new Error(res.body);

    // Use random number to get PowerUpId based on given probabilities
    id = getPowerUpIdFromProbability(parsedBody.randomNumber, probabilityRange);
  } else {
    id = getPowerUpIdFromProbability(randomInt(1, 100), probabilityRange);
  }
  // TODO: Store PU Record

  if (!isPowerUpId(id)) return;
  return id;
};

export const destroyPoweUp = async (state: MatchState, selectedPowerUps: PowerUpId[]) => {
  //TODO Implement
};

const useBirdsEye = (loopParams: MatchLoopParams, powerUp: PowerUpToolkit, diceData: DiceDataToolkit): UseBirdsEyeResToolkit => {
  const { nk, ctx } = loopParams;

  const url = tkUrl(ctx, "/power-ups/2");

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
