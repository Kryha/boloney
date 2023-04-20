import { MAX_INACTIVE_TICKS, MAX_ROLL_BACK_ATTEMPTS } from "../constants";
import {
  AleoAccount,
  CustomError,
  ErrorKind,
  ErrorNotificationMessage,
  ErrorPayloadBackend,
  isBasicError,
  isCustomError,
  isHttpError,
  isNkError,
  isString,
  MatchLoopParams,
  MatchOpCode,
  MatchState,
  NotificationContentError,
  NotificationOpCode,
  Player,
  StatusCodes,
} from "../types";
import { stopLoading, updatePlayersState } from "./match";
import { sendMatchNotification, sendNotification } from "./notification";

export const errorText: Record<ErrorKind, string> = {
  usernameAlreadyExists: "Username already exists",
  usernameContainsProfanity: "Username contains profanity",
  noUsernamePasswordProvided: "No username/password provided",
  noIdInContext: "No user ID in context",
  noPayload: "No payload provided",
  invalidPayload: "Invalid payload",
  invalidMetadata: "Invalid metadata",
  notFound: "Not found",
  internal: "internalError",
};

export const errors: Record<ErrorKind, nkruntime.Error> = {
  usernameAlreadyExists: {
    message: errorText.usernameAlreadyExists,
    code: nkruntime.Codes.ALREADY_EXISTS,
  },
  noUsernamePasswordProvided: {
    message: errorText.noUsernamePasswordProvided,
    code: nkruntime.Codes.INVALID_ARGUMENT,
  },
  usernameContainsProfanity: {
    message: errorText.usernameContainsProfanity,
    code: nkruntime.Codes.INVALID_ARGUMENT,
  },
  noIdInContext: {
    message: errorText.noIdInContext,
    code: nkruntime.Codes.UNAUTHENTICATED,
  },
  noPayload: {
    message: errorText.noPayload,
    code: nkruntime.Codes.INVALID_ARGUMENT,
  },
  invalidPayload: {
    message: errorText.invalidPayload,
    code: nkruntime.Codes.INVALID_ARGUMENT,
  },
  invalidMetadata: {
    message: errorText.invalidMetadata,
    code: nkruntime.Codes.INVALID_ARGUMENT,
  },
  notFound: {
    message: errorText.notFound,
    code: nkruntime.Codes.NOT_FOUND,
  },
  internal: {
    message: errorText.internal,
    code: nkruntime.Codes.INTERNAL,
  },
};

export const mapHttpCodeToNakama = (httpCode: StatusCodes): nkruntime.Codes => {
  const httpToNakama: Record<number, nkruntime.Codes> = {
    [StatusCodes.BAD_REQUEST]: nkruntime.Codes.NOT_FOUND,
    [StatusCodes.NOT_FOUND]: nkruntime.Codes.NOT_FOUND,
    [StatusCodes.UNAUTHORIZED]: nkruntime.Codes.PERMISSION_DENIED,
    [StatusCodes.FORBIDDEN]: nkruntime.Codes.PERMISSION_DENIED,
    [StatusCodes.CONFLICT]: nkruntime.Codes.FAILED_PRECONDITION,
    [StatusCodes.GONE]: nkruntime.Codes.NOT_FOUND,
    [StatusCodes.PRECONDITION_FAILED]: nkruntime.Codes.FAILED_PRECONDITION,
    [StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE]: nkruntime.Codes.OUT_OF_RANGE,
    [StatusCodes.INTERNAL_SERVER_ERROR]: nkruntime.Codes.INTERNAL,
    [StatusCodes.NOT_IMPLEMENTED]: nkruntime.Codes.UNIMPLEMENTED,
  };
  return httpToNakama[httpCode] ? httpToNakama[httpCode] : nkruntime.Codes.UNKNOWN;
};

export const ERROR_EXTERNAL_CALL: nkruntime.Error = {
  message: "The contract call failed",
  code: nkruntime.Codes.DATA_LOSS,
};

export const ERROR_WRITING_TO_COLLECTION: nkruntime.Error = {
  message: "Writing to the collection has failed",
  code: nkruntime.Codes.UNKNOWN,
};

export const loggerText = {
  runtimeMessageError: "Runtime error while performing action triggered by a user message",
  undefinedSender: "Couldn't roll back, sender is undefined",
  terminatingMatch: "Terminating match due to internal error",
  rollingBack: "Rolling back match state",
};

export const isPayloadInvalid = (error: unknown): boolean => {
  return error === errors.invalidMetadata || error === errors.invalidPayload;
};

export const parseError = (error: unknown, code = nkruntime.Codes.INTERNAL): CustomError => {
  const name = "Error";

  if (isString(error)) return { code, message: error, name };

  if (isCustomError(error)) return error;

  if (isNkError(error)) return { ...error, name };

  if (isBasicError(error)) return { message: error.message, code, name };

  return { message: errorText.internal, code, name };
};

export const handleError = (error: unknown, logger: nkruntime.Logger, code = nkruntime.Codes.INTERNAL): nkruntime.Error => {
  const parsed = parseError(error, code);
  logger.error(parsed.message);
  return parsed;
};

// TODO: update return type to be more generic
export const handleHttpResponse = (res: nkruntime.HttpResponse, logger: nkruntime.Logger): AleoAccount => {
  const resKind = Math.floor(res.code / 100);
  if (resKind === 2) return JSON.parse(res.body);
  const nakamaCode = mapHttpCodeToNakama(res.code);
  throw handleError(res.body, logger, nakamaCode);
};

export const handleErrorSideEffects = (
  loopParams: MatchLoopParams,
  previousMatchState: MatchState,
  matchOpCode: MatchOpCode,
  isHttpError: boolean,
  sender?: Player
) => {
  const { state, dispatcher, logger } = loopParams;
  let errorMessage: ErrorNotificationMessage = "unknownError";

  const payload: ErrorPayloadBackend = {
    message: errorMessage,
    httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
    opCode: matchOpCode,
  };
  dispatcher.broadcastMessage(MatchOpCode.ERROR, JSON.stringify(payload));

  if (isHttpError) {
    handleMatchTermination(loopParams);
    return;
  } else {
    state.rollBackAttempts++;
  }

  let receiversIds = Object.keys(state.players);

  switch (matchOpCode) {
    case MatchOpCode.ROLL_DICE:
      if (!sender) throw new Error(loggerText.undefinedSender);

      if (state.rollBackAttempts < MAX_ROLL_BACK_ATTEMPTS) {
        state.players[sender.userId].hasRolledDice = false;
        errorMessage = "rollDiceError";
      } else {
        handleMatchTermination(loopParams);
        return;
      }
      break;
    case MatchOpCode.PLAYER_HEAL_DICE:
      if (!rollbackAction(loopParams, previousMatchState) || !sender) return;

      errorMessage = "healDiceError";
      receiversIds = [sender.userId];
      break;
    case MatchOpCode.USE_POWER_UP:
      if (!rollbackAction(loopParams, previousMatchState) || !sender) return;

      errorMessage = "usePowerUpError";
      receiversIds = [sender.userId];
      break;
    case MatchOpCode.PLAYER_GET_POWERUPS:
    case MatchOpCode.PLAYER_LOST_BY_TIMEOUT:
      handleMatchTermination(loopParams);
      return;
  }

  const errorContent: NotificationContentError = {
    errorMessage,
  };
  sendMatchNotification(loopParams, NotificationOpCode.ERROR, errorContent, receiversIds);
  logger.info(loggerText.rollingBack + JSON.stringify(state.rollBackAttempts, null, 2));
  updatePlayersState(state, dispatcher);
};

const rollbackAction = (loopParams: MatchLoopParams, previousMatchState: MatchState): boolean => {
  const { state } = loopParams;
  if (state.rollBackAttempts < MAX_ROLL_BACK_ATTEMPTS) {
    revertMatchState(state, previousMatchState);
    return true;
  }
  handleMatchTermination(loopParams);
  return false;
};

const handleMatchTermination = (loopParams: MatchLoopParams) => {
  const { state, dispatcher, ctx, logger } = loopParams;
  const errorContent: NotificationContentError = {
    errorMessage: "unknownError",
  };
  // Set the required stage for the client to know that the match has ended
  state.matchStage = "endOfMatchStage";

  sendMatchNotification(loopParams, NotificationOpCode.ERROR, errorContent);
  updatePlayersState(state, dispatcher);
  // Set the empty ticks to a value higher than the max inactive ticks to terminate the match
  state.emptyTicks = MAX_INACTIVE_TICKS + 1;
  logger.info(loggerText.terminatingMatch, ctx.matchId);
};

const revertMatchState = (state: MatchState, previousMatchState: MatchState) => {
  state = { ...previousMatchState, rollBackAttempts: state.rollBackAttempts, turnActionStep: "pickAction" };
};

export const handleMatchMessageError = (
  loopParams: MatchLoopParams,
  deepCopy: MatchState,
  error: unknown,
  message: nkruntime.MatchMessage,
  sender: Player
) => {
  const { logger } = loopParams;
  let parsedError;

  if (isHttpError(error) || !isPayloadInvalid(error)) {
    handleErrorSideEffects(loopParams, deepCopy, message.opCode, isHttpError(error), sender);
  } else {
    parsedError = parseError(error);
    handleInvalidPayloadError(loopParams, sender, deepCopy);
  }

  stopLoading(loopParams, message.sender, parsedError);
  logger.error(loggerText.runtimeMessageError + message.opCode + JSON.stringify(error, null, 2));
};

const handleInvalidPayloadError = (loopParams: MatchLoopParams, sender: Player, previousMatchState: MatchState) => {
  const { state, dispatcher, nk } = loopParams;
  const errorContent: NotificationContentError = {
    errorMessage: "invalidPayloadError",
  };
  state.players = { ...previousMatchState.players };
  sendNotification(nk, [sender.userId], NotificationOpCode.ERROR, errorContent);
  updatePlayersState(state, dispatcher);
};
