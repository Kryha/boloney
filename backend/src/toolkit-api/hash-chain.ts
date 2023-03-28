import { HASH_CHAIN_LENGTH, HASH_MAX_RANGE } from "../constants";
import { AleoAccount, HashChainRequestBody, HashChainResponseBody, isHashChainResponseBody, MatchLoopParams } from "../types";
import { env, httpRequest, randomInt, tkUrl } from "../utils";

const requestHashChain = async (
  loopParams: MatchLoopParams,
  playerAccount: AleoAccount,
  seed: number
): Promise<HashChainResponseBody | undefined> => {
  const { ctx, nk } = loopParams;
  const { address, privateKey, viewKey } = playerAccount;

  const url = tkUrl(ctx, "/random/hash-chain-record");
  const body: HashChainRequestBody = { owner: address, seed, privateKey, viewKey };

  const res = httpRequest(nk, url, "post", body);
  const parsedBody: HashChainResponseBody = JSON.parse(res.body);

  if (!isHashChainResponseBody(parsedBody)) throw new Error(res.body);

  return parsedBody;
};

export const generateHashChain = async (loopParams: MatchLoopParams, playerAccount: AleoAccount, seed: number): Promise<string[]> => {
  const { ctx } = loopParams;
  let hashChain: string[];

  if (env(ctx).ZK_ENABLED) {
    const response = await requestHashChain(loopParams, playerAccount, seed);
    hashChain = response?.hashChain || [];
  } else {
    hashChain = Array.from({ length: HASH_CHAIN_LENGTH }, () => String(randomInt(1, HASH_MAX_RANGE)));
  }

  return hashChain;
};
