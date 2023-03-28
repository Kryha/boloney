import { Die, isDieArray, isRandomNumberResToolkit, MatchLoopParams, Player, RandomNumberBodyToolkit, AleoAccount } from "../types";
import { getNumericHash, getRange, httpRequest, randomInt, tkUrl, isZkEnabled } from "../utils";

const requestRoll = async (loopParams: MatchLoopParams, seed: number, playerAccount: AleoAccount): Promise<number | undefined> => {
  const { nk, ctx } = loopParams;
  const { address, privateKey, viewKey } = playerAccount;

  const url = tkUrl(ctx, "/random/number");
  const body: RandomNumberBodyToolkit = { seed, min: 1, max: 6, owner: address, privateKey, viewKey };

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

/**
 *
 * @description Roll dice gathers the hashes from other players and the seed from the player and requests a roll from the toolkit
 */
export const rollDice = async (
  loopParams: MatchLoopParams,
  diceAmount: number,
  player: Player,
  playerAccount: AleoAccount
): Promise<Die[] | undefined> => {
  const { state, ctx } = loopParams;

  const diceResponse = await Promise.all(
    getRange(diceAmount).map((_value, index) => {
      if (isZkEnabled(state, ctx)) {
        const currentRngCounter = player.rngDiceCounter + index;

        // Get hashes from other players according to current RNG counter
        const hashList = Object.values(state.players)
          .filter((statePlayer) => statePlayer.userId !== player.userId)
          .map((player) => player.hashChain[currentRngCounter]);

        // Include own seed hash
        hashList.push(String(player.seed));

        const seedHash = getNumericHash(hashList);

        const diceRoll = requestRoll(loopParams, seedHash, playerAccount);

        return diceRoll;
      } else {
        return localRoll();
      }
    })
  );

  const dice = diceResponse.map((die) => ({
    rolledValue: die,
  }));

  if (!isDieArray(dice)) return;

  player.rngDiceCounter = player.rngDiceCounter + diceAmount;

  return dice;
};
