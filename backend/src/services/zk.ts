import { HASH_MAX_RANGE } from "../constants";
import { generateHashChain } from "../toolkit-api";
import { MatchLoopParams } from "../types";
import { randomInt } from "../utils";
import { getPlayerAccount } from "./storage";

export const setPlayerHashChain = async (loopParams: MatchLoopParams, userId: string) => {
  const { nk, state } = loopParams;

  const playerAccount = getPlayerAccount(nk, userId);
  const seed = randomInt(1, HASH_MAX_RANGE);

  const hashChain = await generateHashChain(loopParams, playerAccount, seed);

  // Store hash chain and seed in player's state
  state.players[userId].hashChain = hashChain;
  state.players[userId].seed = seed;
};
