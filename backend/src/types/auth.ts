import { ADDRESS_LENGTH, ADDRESS_PREFIX, PRIVATE_KEY_LENGTH, PRIVATE_KEY_PREFIX, VIEW_KEY_LENGTH, VIEW_KEY_PREFIX } from "../constants";

export interface AleoAccount {
  address: string;
  privateKey: string;
  viewKey: string;
}

export const isPrivateKey = (value: string): boolean => {
  return value.length === PRIVATE_KEY_LENGTH && value.startsWith(PRIVATE_KEY_PREFIX);
};

export const isViewKey = (value: string): boolean => {
  return value.length === VIEW_KEY_LENGTH && value.startsWith(VIEW_KEY_PREFIX);
};

export const isAddress = (value: string): boolean => {
  return value.length === ADDRESS_LENGTH && value.startsWith(ADDRESS_PREFIX);
};

export const isAleoAccount = (value: unknown): value is AleoAccount => {
  const assertedVal = value as AleoAccount;
  const { address, privateKey, viewKey } = assertedVal;

  return (
    viewKey !== undefined &&
    privateKey !== undefined &&
    address !== undefined &&
    isAddress(address) &&
    isPrivateKey(privateKey) &&
    isViewKey(viewKey)
  );
};
