import { CollectionInteractionRead, CollectionInteractionWrite } from "../interfaces/collection";
import { AccountKeys } from "../interfaces/models";
import { TOOLKIT_BASE_URL, success, EXISTING_KEYS, FAILED_WRITING_COLLECTION, FAILED_GETTING_USERNAME } from "../utils/const";
import { logError, getErrorMessage, handleHttpResponse, USERNAME_EXISTS } from "../utils/error-handling";

export const beforeAuthenticateCustom: nkruntime.BeforeHookFunction<nkruntime.AuthenticateCustomRequest> = (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  data: nkruntime.AuthenticateCustomRequest,
): nkruntime.AuthenticateCustomRequest | void => {
  if (!data || !data.account) return;
  
  const username: string = data.username || "";
  const password: string = data.account.id || "";
  
  if (data.create && isUsernameAlreadyTaken(nk, logger, username)) {
    throw USERNAME_EXISTS;
  }
  
  const encrypted32ByteKey = nk.aes256Encrypt(password, username.padEnd(32, "0"));
  data.account.id = encrypted32ByteKey;

  return data;
};

const isUsernameAlreadyTaken = (nk: nkruntime.Nakama, logger: nkruntime.Logger, username: string): boolean => {
  let user: nkruntime.User[];
    
  try {
    user = nk.usersGetUsername([username]);

    return user.length > 0 ? true : false;
  } catch (error) {
    throw logError(`${FAILED_GETTING_USERNAME}: ${error}`, logger);
  }
};

export const afterAuthenticateCustom: nkruntime.AfterHookFunction<nkruntime.Session, nkruntime.AuthenticateCustomRequest> = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  _data: nkruntime.Session,
  _request: nkruntime.AuthenticateCustomRequest
) => {
  const payload = { collection: "Accounts", key: "keys" };

  // check if the user exist in the collection with keys/addresses
  if (userKeysAreAvailable(nk, ctx, payload, logger)) return null;

  //Get new keys from the toolkit
  const newKeys = getNewKeysFromToolkit(nk, logger);

  //Store the keys in collection
  const newKeyPayload = {
    ...payload,
    value: { viewKey: newKeys.viewKey, privateKey: newKeys.privateKey, address: newKeys.address },
  };
  storeNewKeysInCollection(nk, ctx, newKeyPayload, logger);

  //Check if the account is stored in the collection
  userKeysAreAvailable(nk, ctx, payload, logger);
};

export const userKeysAreAvailable = (
  nk: nkruntime.Nakama,
  ctx: nkruntime.Context,
  payload: CollectionInteractionRead,
  logger: nkruntime.Logger
): boolean => {
  try {
    const existingKeys = nk.storageRead([
      {
        key: payload.key,
        collection: payload.collection,
        userId: ctx.userId,
      },
    ]);
    if (!existingKeys.length) false;
  } catch (error) {
    throw logError(FAILED_WRITING_COLLECTION, logger);
  }
  success(EXISTING_KEYS, logger);
  return true;
};

export const getNewKeysFromToolkit = (nk: nkruntime.Nakama, logger: nkruntime.Logger): AccountKeys => {
  const url = TOOLKIT_BASE_URL + "account/create";

  try {
    const res = nk.httpRequest(url, "post");

    return handleHttpResponse(res, logger);
  } catch (error) {
    throw logError(getErrorMessage(error), logger);
  }
};

export const storeNewKeysInCollection = (
  nk: nkruntime.Nakama,
  ctx: nkruntime.Context,
  payload: CollectionInteractionWrite,
  logger: nkruntime.Logger
) => {
  const payloadRequest: nkruntime.StorageWriteRequest = {
    collection: payload.collection,
    key: payload.key,
    userId: ctx.userId,
    value: [{ address: payload.value.address, viewKey: payload.value.viewKey }],
    permissionRead: 1,
    permissionWrite: 0,
  };
  const payloadPrivateKeyRequest: nkruntime.StorageWriteRequest = {
    collection: payload.collection,
    key: "privateKey",
    userId: ctx.userId,
    value: [{ privateKey: payload.value.privateKey }],
    permissionRead: 1,
    permissionWrite: 0,
  };
  try {
    nk.storageWrite([payloadRequest, payloadPrivateKeyRequest]);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw logError(errorMessage, logger);
  }

  logger.info("Aleo Keys are stored in the collection");
};
