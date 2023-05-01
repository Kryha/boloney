import { TOOLKIT_ENDPOINTS } from "../constants";
import { Die, isRandomNumberResToolkit, MatchLoopParams, Player, RandomNumberBodyToolkit, AleoAccount } from "../types";
import { getNumericHash, getRange, randomInt, tkUrl, isZkEnabled, httpError } from "../utils";
import { handleToolkitRequest } from "./request-handler";

const requestRoll = async (loopParams: MatchLoopParams, seed: number, playerAccount: AleoAccount): Promise<number> => {
  const { nk, ctx, logger } = loopParams;
  const { address, privateKey, viewKey } = playerAccount;

  const url = tkUrl(ctx, TOOLKIT_ENDPOINTS.random.number);
  const body: RandomNumberBodyToolkit = { seed, min: 1, max: 6, owner: address, privateKey, viewKey };

  // TODO: Return DiceRecord when available
  const res = handleToolkitRequest(url, "post", body, nk, logger);

  const parsedBody = JSON.parse(res.body);

  if (!isRandomNumberResToolkit(parsedBody)) throw httpError(res.code, "Random number response is not valid");

  return parsedBody.randomNumber;
};

const localRoll = async (): Promise<number> => {
  const value = randomInt(6, 1);
  return value;
};

/**
 *
 * @description Roll dice gathers the hashes from other players and the seed from the player and requests a roll from the toolkit
 */
// TODO: Investigate and discuss whether Promise.reject should be used instead of throwing an error
export const rollDice = async (
  loopParams: MatchLoopParams,
  diceAmount: number,
  player: Player,
  playerAccount: AleoAccount
): Promise<Die[]> => {
  const { state, ctx, logger } = loopParams;

  try {
    const diceResponse = await Promise.all(
      getRange(diceAmount).map((_value, index) => {
        if (isZkEnabled(state, ctx)) {
          const currentRngCounter = player.rngDiceCounter - index;

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

    player.rngDiceCounter = player.rngDiceCounter - diceAmount;

    return dice;
  } catch (error) {
    logger.error("Rolling dice failed ", error);
    throw error;
  }
};
