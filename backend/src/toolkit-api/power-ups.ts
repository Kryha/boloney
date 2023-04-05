import { TOOLKIT_ENDPOINTS, HASH_MAX_RANGE } from "../constants";
import {
  AleoAccount,
  AleoKeys,
  DiceDataToolkit,
  httpError,
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
import { isZkEnabled, randomInt, tkUrl } from "../utils";
import { handleToolkitRequest } from "./request-handler";

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

export const getPowerUp = (loopParams: MatchLoopParams, playerAccount: AleoAccount): PowerUpId | undefined => {
  const { state, ctx, nk, logger } = loopParams;
  const { powerUpProbability } = state.settings;
  const { address, privateKey, viewKey } = playerAccount;

  const availablePowerUps = getAvailablePowerUps(powerUpProbability);
  const probabilityRange = generateProbabilityRange(availablePowerUps);
  let id: PowerUpId | undefined = undefined;

  if (isZkEnabled(state, ctx)) {
    // Generate Random Number 1-100
    // TODO: For now mock the seed, eventually get it from the combined hashes
    const mockRn = randomInt(1, HASH_MAX_RANGE);
    const randomSeed = mockRn;

    const url = tkUrl(ctx, TOOLKIT_ENDPOINTS.random.number);
    const body: RandomNumberBodyToolkit = { seed: randomSeed, min: 1, max: 100, owner: address, privateKey, viewKey };

    // TODO: Return a PowerUpRecord and extract ID
    const res = handleToolkitRequest(url, "post", body, nk, logger);
    const parsedBody = JSON.parse(res.body);

    if (!isRandomNumberResToolkit(parsedBody)) throw httpError(res.code, res.body);

    // Use random number to get PowerUpId based on given probabilities
    id = getPowerUpIdFromProbability(parsedBody.randomNumber, probabilityRange);
  } else {
    id = getPowerUpIdFromProbability(randomInt(1, 100), probabilityRange);
  }
  // TODO: Store PU Record

  if (!isPowerUpId(id)) return;
  return id;
};

export const destroyPoweUp = async (_state: MatchState, _selectedPowerUps: PowerUpId[]) => {
  //TODO Implement
};

const useBirdsEye = (
  loopParams: MatchLoopParams,
  powerUp: PowerUpToolkit,
  diceData: DiceDataToolkit,
  playerKeys: AleoKeys
): UseBirdsEyeResToolkit => {
  const { ctx, nk, logger } = loopParams;
  const { viewKey, privateKey } = playerKeys;

  const url = tkUrl(ctx, TOOLKIT_ENDPOINTS.powerUps.useBirdsEye);

  const body: UseBirdsEyeBodyToolkit = { powerUp, diceData, viewKey, privateKey };
  loopParams.logger.debug("useBirdsEye Body " + JSON.stringify(body, null, 2));

  const res = handleToolkitRequest(url, "post", body, nk, logger);

  const parsed = JSON.parse(res.body);
  loopParams.logger.debug("useBirdsEye Response " + parsed);

  if (!isBirdsEyeResToolkit(parsed)) throw httpError(res.code, res.body);

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
