// Storage services
import {
  STORAGE_ACCOUNT_COLLECTION,
  STORAGE_ADDRESS_KEY,
  STORAGE_HASH_CHAIN_KEY,
  STORAGE_KEYS_KEY,
  STORAGE_MATCH_DATA_COLLECTION,
} from "../constants";
import { HashChainData, AleoKeys, isViewKey, isPrivateKey, AleoAccount } from "../types";

export const savePlayerAddress = (nk: nkruntime.Nakama, playerId: string, address: string): void => {
  const writeRequest: nkruntime.StorageWriteRequest[] = [
    {
      collection: STORAGE_ACCOUNT_COLLECTION,
      key: STORAGE_ADDRESS_KEY,
      userId: playerId,
      value: { address },
      permissionRead: 1,
      permissionWrite: 0,
    },
  ];

  nk.storageWrite(writeRequest);
};

export const getPlayerAddress = (nk: nkruntime.Nakama, playerId: string): string => {
  const readRequest: nkruntime.StorageReadRequest[] = [
    { collection: STORAGE_ACCOUNT_COLLECTION, key: STORAGE_ADDRESS_KEY, userId: playerId },
  ];
  const response = nk.storageRead(readRequest);

  if (!response.length) throw new Error("Invalid response from storage while fetching player address");

  return response[0]?.value?.address;
};

export const savePlayerKeys = (nk: nkruntime.Nakama, playerId: string, keys: AleoKeys): void => {
  const { viewKey, privateKey } = keys;
  const writeRequest: nkruntime.StorageWriteRequest[] = [
    {
      collection: STORAGE_ACCOUNT_COLLECTION,
      key: STORAGE_KEYS_KEY,
      userId: playerId,
      value: { privateKey, viewKey },
      permissionRead: 1,
      permissionWrite: 0,
    },
  ];

  nk.storageWrite(writeRequest);
};

export const getPlayerKeys = (nk: nkruntime.Nakama, playerId: string): AleoKeys => {
  const readRequest = [{ collection: STORAGE_ACCOUNT_COLLECTION, key: STORAGE_KEYS_KEY, userId: playerId }];
  const response = nk.storageRead(readRequest);

  const { viewKey, privateKey } = response[0].value;

  const isValidResponse = isViewKey(viewKey) && isPrivateKey(privateKey);
  if (!isValidResponse) throw new Error("Invalid response from storage while fetching player keys");

  return { viewKey, privateKey };
};

export const getPlayerAccount = (nk: nkruntime.Nakama, playerId: string): AleoAccount => {
  const address = getPlayerAddress(nk, playerId);
  const { viewKey, privateKey } = getPlayerKeys(nk, playerId);

  return { address, viewKey, privateKey };
};

export const savePlayerHashChainData = (nk: nkruntime.Nakama, playerId: string, hashChainData: HashChainData): void => {
  const { hashChain, seed, matchId } = hashChainData;

  const writeRequest: nkruntime.StorageWriteRequest[] = [
    {
      collection: STORAGE_MATCH_DATA_COLLECTION,
      key: STORAGE_HASH_CHAIN_KEY,
      userId: playerId,
      value: { hashChain, seed, matchId },
      permissionRead: 1,
      permissionWrite: 0,
    },
  ];

  nk.storageWrite(writeRequest);
};

export const getPlayerHashChainData = (nk: nkruntime.Nakama, playerId: string): HashChainData => {
  const readRequest = [{ collection: STORAGE_MATCH_DATA_COLLECTION, key: STORAGE_HASH_CHAIN_KEY, userId: playerId }];
  const response = nk.storageRead(readRequest);

  // TODO: Validate response
  const { hashChain, seed, matchId } = response[0].value;

  return { hashChain, seed, matchId };
};
