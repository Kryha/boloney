import { AleoAccount, Die, isDieArray, isRandomNumberResToolkit, MatchLoopParams, RandomNumberBodyToolkit } from "../types";
import { getRange, httpRequest, randomInt, tkUrl, isZkEnabled } from "../utils";

const requestRoll = async (loopParams: MatchLoopParams, playerAccount: AleoAccount): Promise<number | undefined> => {
  const { nk, ctx } = loopParams;
  const { address, privateKey, viewKey } = playerAccount;

  // TODO: For now mock the seed, eventually get it from the combined hashes
  const mockRn = randomInt(1, 9999);
  const randomSeed = mockRn;

  const url = tkUrl(ctx, "/random/number");
  const body: RandomNumberBodyToolkit = { seed: randomSeed, min: 1, max: 6, owner: address, privateKey, viewKey };

  // TODO: Return DiceRecord when available
  const res = httpRequest(nk, url, "post", body);
  const parsedBody = JSON.parse(res.body);

  if (!isRandomNumberResToolkit(parsedBody)) throw new Error(res.body);

  return parsedBody.randomNumber;
};

const localRoll = async (): Promise<number | undefined> => {
  const value = randomInt(6, 1);
  return value;
};

// TODO: Add spinner until response arrive
export const rollDice = async (loopParams: MatchLoopParams, diceAmount: number, playerAccount: AleoAccount): Promise<Die[] | undefined> => {
  const { state, ctx } = loopParams;

  const value = await Promise.all(
    getRange(diceAmount).map(() => {
      if (isZkEnabled(state, ctx)) {
        return requestRoll(loopParams, playerAccount);
      } else {
        return localRoll();
      }
    })
  );

  const dice = value.map((die) => ({
    rolledValue: die,
  }));

  if (!isDieArray(dice)) return;

  return dice;
};
