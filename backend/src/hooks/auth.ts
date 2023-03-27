import { errors, handleError, profanityFilter, getPlayerAddress, savePlayerAddress, savePlayerKeys } from "../services";
import { createAleoAccount } from "../toolkit-api/account";
import { AfterAuthHookHandler, BeforeAuthHookHandler, isAddress } from "../types";
import { env } from "../utils";

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

  const encryptedKey = String(nk.sha256Hash(password + username));
  data.account.id = encryptedKey;

  return data;
});

export const afterAuthenticateCustom = afterHookHandler((ctx, logger, nk, _data, _request) => {
  if (!env(ctx).ZK_ENABLED) return;

  if (accountExist(nk, logger, ctx.userId)) return;

  const { address, privateKey, viewKey } = createAleoAccount(ctx, logger, nk);

  savePlayerAddress(nk, ctx.userId, address);
  savePlayerKeys(nk, ctx.userId, { privateKey, viewKey });
});

const accountExist = (nk: nkruntime.Nakama, logger: nkruntime.Logger, userId: string): boolean => {
  try {
    const existingAddress = getPlayerAddress(nk, userId);
    return isAddress(existingAddress);
  } catch (error) {
    logger.info("Createing new Aleo account for player " + userId);
    return false;
  }
};
