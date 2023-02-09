import { Die, isDieArray, isRandomNumberResToolkit, MatchLoopParams, RandomNumberBodyToolkit } from "../types";
import { getRange, httpRequest, randomInt, tkUrl } from "../utils";

const requestRoll = async (loopParams: MatchLoopParams): Promise<number | undefined> => {
  const { nk, ctx } = loopParams;

  // TODO: For now mock the seed, eventually get it from the combined hashes
  const mockRn = randomInt(1, 9999);
  const randomSeed = mockRn;

  const url = tkUrl(ctx, "/random/number");
  const body: RandomNumberBodyToolkit = { seed: randomSeed, min: 1, max: 6 };

  // TODO: Return DiceRecord when available
  const res = httpRequest(nk, url, "post", body);
  const parsedBody = JSON.parse(res.body);

  if (!isRandomNumberResToolkit(parsedBody)) throw new Error(res.body);

  return parsedBody.randomNumber;
};

// TODO: Add spinner until response arrive
export const rollDice = async (loopParams: MatchLoopParams, diceAmount: number): Promise<Die[] | undefined> => {
  const value = await Promise.all(getRange(diceAmount).map(async () => requestRoll(loopParams)));

  const dice = value.map((die) => ({
    rolledValue: die,
  }));

  if (!isDieArray(dice)) return;

  return dice;
};
