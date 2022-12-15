import sha256 from "crypto-js/sha256";

import { errors, handleError, handleHttpResponse, profanityFilter } from "../services";
import { AccountKeys, AfterAuthHookHandler, BeforeAuthHookHandler, CollectionInteractionRead, CollectionInteractionWrite } from "../types";
import { tkUrl } from "../utils";

export const beforeHookHandler: BeforeAuthHookHandler = (cb) => (ctx, logger, nk, data) => {
  try {
    const res = cb(ctx, logger, nk, data);
    return res;
  } catch (error) {
    throw handleError(error, logger);
  }
};

export const afterHookHandler: AfterAuthHookHandler = (cb) => (ctx, logger, nk, data, request) => {
  try {
    const res = cb(ctx, logger, nk, data, request);
    return res;
  } catch (error) {
    throw handleError(error, logger);
  }
};

// TODO: fix the following scenario:
// 1. user creates account
// 2. before hook succeeds and user creation as well
// 3. after hook fails, so no keys are stored
// The after hook will be retriggered after login, so the server will try to recall the toolkit if keys were not generated.
// The issue is in the fact that if the key creation fails, the user will receive an error, even though the nakama account is actually created.
// In order to generate the keys, the user will have to counterintuitively try to login.

export const beforeAuthenticateCustom = beforeHookHandler((_ctx, _logger, nk, data) => {
  if (!data.username || !data.account?.id) throw errors.noUsernamePasswordProvided;

  data.username = data.username.toLowerCase();
  const isRegistering = !!data.create;
  const username: string = data.username;
  const password: string = data.account.id;

  const userExists = isRegistering && nk.usersGetUsername([username]).length;

  if (userExists) throw errors.usernameAlreadyExists;

  if (profanityFilter.isProfane(username)) throw errors.usernameContainsProfanity;

  const encryptedKey = String(sha256(password + username));
  data.account.id = encryptedKey;

  return data;
});

export const afterAuthenticateCustom = afterHookHandler((ctx, logger, nk, _data, _request) => {
  const payload = { collection: "Accounts", key: "keys" };

  // if keys are already stored, skip their creation
  const storedKeys = readUserKeys(nk, ctx, payload);
  if (storedKeys.length) return;

  // call the toolkit to generate some new keys and store them in the database
  const newKeys = getNewKeysFromToolkit(nk, logger);
  const newKeyPayload = {
    ...payload,
    value: { viewKey: newKeys.viewKey, privateKey: newKeys.privateKey, address: newKeys.address },
  };
  storeNewKeysInCollection(nk, ctx, newKeyPayload);
});

export const readUserKeys = (nk: nkruntime.Nakama, ctx: nkruntime.Context, payload: CollectionInteractionRead) => {
  const existingKeys = nk.storageRead([
    {
      key: payload.key,
      collection: payload.collection,
      userId: ctx.userId,
    },
  ]);
  return existingKeys;
};

export const getNewKeysFromToolkit = (nk: nkruntime.Nakama, logger: nkruntime.Logger): AccountKeys => {
  const url = tkUrl("/account/create");
  const res = nk.httpRequest(url, "post", undefined, undefined, 60000);
  return handleHttpResponse(res, logger);
};

export const storeNewKeysInCollection = (nk: nkruntime.Nakama, ctx: nkruntime.Context, payload: CollectionInteractionWrite) => {
  const payloadRequest: nkruntime.StorageWriteRequest = {
    collection: payload.collection,
    key: payload.key,
    userId: ctx.userId,
    value: { address: payload.value.address, viewKey: payload.value.viewKey },
    permissionRead: 1,
    permissionWrite: 0,
  };
  const payloadPrivateKeyRequest: nkruntime.StorageWriteRequest = {
    collection: payload.collection,
    key: "privateKey",
    userId: ctx.userId,
    value: { privateKey: payload.value.privateKey },
    permissionRead: 1,
    permissionWrite: 0,
  };

  nk.storageWrite([payloadRequest, payloadPrivateKeyRequest]);
};
