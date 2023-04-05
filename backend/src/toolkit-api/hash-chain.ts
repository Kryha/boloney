import { HASH_CHAIN_LENGTH, HASH_MAX_RANGE, TOOLKIT_ENDPOINTS } from "../constants";
import { AleoAccount, HashChainRequestBody, HashChainResponseBody, httpError, isHashChainResponseBody, MatchLoopParams } from "../types";
import { isZkEnabled, randomInt, tkUrl } from "../utils";
import { handleToolkitRequest } from "./request-handler";

const requestHashChain = async (
  loopParams: MatchLoopParams,
  playerAccount: AleoAccount,
  seed: number
): Promise<HashChainResponseBody | undefined> => {
  const { ctx, nk, logger } = loopParams;
  const { address, privateKey, viewKey } = playerAccount;

  const url = tkUrl(ctx, TOOLKIT_ENDPOINTS.random.hashChain);
  const body: HashChainRequestBody = { owner: address, seed, privateKey, viewKey };

  const res = handleToolkitRequest(url, "post", body, nk, logger);
  const parsedBody: HashChainResponseBody = JSON.parse(res.body);

  if (!isHashChainResponseBody(parsedBody)) throw httpError(res.code, "Invalid hash chain response");

  return parsedBody;
};

export const generateHashChain = async (loopParams: MatchLoopParams, playerAccount: AleoAccount, seed: number): Promise<string[]> => {
  const { ctx } = loopParams;
  let hashChain: string[];

  if (isZkEnabled(loopParams.state, ctx)) {
    const response = await requestHashChain(loopParams, playerAccount, seed);
    hashChain = response?.hashChain || [];
  } else {
    hashChain = Array.from({ length: HASH_CHAIN_LENGTH }, () => String(randomInt(1, HASH_MAX_RANGE)));
  }

  return hashChain;
};
