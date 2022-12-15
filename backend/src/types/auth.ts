import { ADDRESS_LENGTH, ADDRESS_PREFIX, PRIVATE_KEY_LENGTH, PRIVATE_KEY_PREFIX, VIEW_KEY_LENGTH, VIEW_KEY_PREFIX } from "../constants";
import { isString } from "./primitive";

export interface AccountKeys {
  privateKey: string;
  viewKey: string;
  address: string;
}

const isPrivateKey = (value: string): boolean => {
  return value.length === PRIVATE_KEY_LENGTH && value.startsWith(PRIVATE_KEY_PREFIX);
};

const isViewKey = (value: string): boolean => {
  return value.length === VIEW_KEY_LENGTH && value.startsWith(VIEW_KEY_PREFIX);
};

const isAddress = (value: string): boolean => {
  return value.length === ADDRESS_LENGTH && value.startsWith(ADDRESS_PREFIX);
};

export const isAccountKeys = (value: unknown): value is AccountKeys => {
  const assertedVal = value as AccountKeys;

  return (
    assertedVal.address !== undefined &&
    assertedVal.viewKey !== undefined &&
    assertedVal.privateKey !== undefined &&
    isString(assertedVal.address) &&
    isString(assertedVal.viewKey) &&
    isString(assertedVal.privateKey) &&
    isPrivateKey(assertedVal.privateKey) &&
    isViewKey(assertedVal.viewKey) &&
    isAddress(assertedVal.address)
  );
};
