import { AUTH_SIGN_MESSAGE, TOOLKIT_ENDPOINTS } from "../constants";
import {
  errors,
  handleError,
  savePlayerAddress,
  savePlayerKeys,
  getPlayerAddress,
  getUsername,
  saveUsername,
  profanityFilter,
} from "../services";
import { handleToolkitRequest } from "../toolkit-api";
import { createAleoAccount } from "../toolkit-api/account";
import { AfterAuthHookHandler, BeforeAuthHookHandler, isAddress, isVerifySignatureResToolkit, VerifySignatureBodyToolkit } from "../types";
import { env, tkUrl } from "../utils";

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

export const verifySignature = (
  nk: nkruntime.Nakama,
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  address: string,
  signature: string
): boolean => {
  const url = tkUrl(ctx, TOOLKIT_ENDPOINTS.account.verify);
  const body: VerifySignatureBodyToolkit = { message: AUTH_SIGN_MESSAGE, playerSign: signature, pubAddress: address };
  const res = handleToolkitRequest(url, "post", body, nk, logger);
  const parsedBody = JSON.parse(res.body);
  return isVerifySignatureResToolkit(parsedBody) && parsedBody.verified;
};

export const beforeAuthenticateCustom = beforeHookHandler((ctx, logger, nk, data) => {
  if (!data.username || !data.account?.id) throw errors.noUsernamePasswordProvided;

  const splitId = data.account.id.split(";");
  const address: string = data.username;

  const storedUsername = getUsername(nk, address);

  if (!splitId.length) throw errors.noUsernamePasswordProvided;
  if (!storedUsername && splitId.length === 1) throw errors.notFound;

  if (storedUsername) {
    // log in
    logger.info("login");
    data.create = false;
    const signature: string = splitId[0];
    logger.info("signature:", signature);

    const isSignatureValid = !verifySignature(nk, ctx, logger, address, signature);
    logger.info("isSignatureValid login:", isSignatureValid);

    if (!isSignatureValid) throw errors.invalidSignature;
    data.username = storedUsername;
  } else if (splitId.length === 2) {
    // registration
    logger.info("registration");
    data.create = true;

    const signature: string = splitId[0];
    const username: string = splitId[1].toLowerCase();
    logger.info("signature:", signature);
    logger.info("username:", username);

    const isSignatureValid = !verifySignature(nk, ctx, logger, address, signature);
    logger.info("isSignatureValid registration:", isSignatureValid);

    if (!isSignatureValid) throw errors.invalidSignature;
    if (profanityFilter.isProfane(username)) throw errors.containsProfanity;

    saveUsername(nk, address, username);
    data.username = username;
  } else {
    throw errors.invalidPayload;
  }

  data.account.id = String(nk.sha256Hash(address));

  return data;
});

// TODO: delete the following hook after moving program calls to client
export const afterAuthenticateCustom = afterHookHandler((ctx, logger, nk, _data, _request) => {
  if (!env(ctx).ZK_ENABLED) return;

  if (accountExist(nk, logger, ctx.userId)) return;

  const { address, privateKey, viewKey } = createAleoAccount(ctx, logger, nk);

  savePlayerAddress(nk, ctx.userId, address);
  savePlayerKeys(nk, ctx.userId, { privateKey, viewKey });
});

export const accountExist = (nk: nkruntime.Nakama, logger: nkruntime.Logger, userId: string): boolean => {
  try {
    const existingAddress = getPlayerAddress(nk, userId);
    return isAddress(existingAddress);
  } catch (error) {
    logger.info("Creating new Aleo account for player " + userId);
    return false;
  }
};
