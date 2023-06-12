// Storage services
import { ADDRESSES_COLLECTION, PUBLIC_USER_ID, STORAGE_ACCOUNT_COLLECTION, STORAGE_ADDRESS_KEY, STORAGE_KEYS_KEY } from "../constants";
import { AleoKeys, isViewKey, isPrivateKey, AleoAccount } from "../types";

export const saveUsername = (nk: nkruntime.Nakama, address: string, username: string): void => {
  const writeRequest: nkruntime.StorageWriteRequest[] = [
    {
      collection: ADDRESSES_COLLECTION,
      key: address,
      userId: PUBLIC_USER_ID,
      value: { username },
      permissionRead: 1,
      permissionWrite: 1,
    },
  ];

  nk.storageWrite(writeRequest);
};

export const getUsername = (nk: nkruntime.Nakama, address: string): string | undefined => {
  const readRequest: nkruntime.StorageReadRequest[] = [{ collection: ADDRESSES_COLLECTION, key: address, userId: PUBLIC_USER_ID }];
  const response = nk.storageRead(readRequest);

  return response.at(0)?.value.username;
};

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
