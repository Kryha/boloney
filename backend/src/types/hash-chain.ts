import { isNumber, isString, isStringArray } from "./primitive";

export interface HashChainRequestBody {
  owner: string;
  seed: number;
  privateKey: string;
  viewKey: string;
}

export interface HashChainResponseBody {
  gates: number;
  _nonce: string;
  seed: number;
  hashChain: string[];
}

export const isHashChainResponseBody = (value: unknown): value is HashChainResponseBody => {
  const assertedVal = value as HashChainResponseBody;
  const { seed, hashChain } = assertedVal;
  const hasHashChain = hashChain !== undefined && isStringArray(hashChain);
  const hasSeed = seed !== undefined && isNumber(seed);
  return hasHashChain && hasSeed;
};

export interface HashChainData {
  hashChain: string[];
  seed: number;
  matchId: string;
}

export const isHashChainData = (value: unknown): value is HashChainData => {
  const assertedVal = value as HashChainData;
  const { hashChain, seed, matchId } = assertedVal;

  const hasHashChain = hashChain !== undefined && isStringArray(hashChain);
  const hasSeed = seed !== undefined && isNumber(seed);
  const hasMatchId = matchId !== undefined && isString(matchId);

  return hasHashChain && hasSeed && hasMatchId;
};
