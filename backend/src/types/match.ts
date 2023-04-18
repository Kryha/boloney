import { MATCH_STAGES } from "../constants";
import { Bid } from "./bid";
import { Die, isDieArray } from "./die";
import { HistoryEvent } from "./history";
import { isPowerUpProbabilityArray, PowerUpProbability, PowerUpId, ActivePowerUp } from "./power-up";
import { isBoolean, isNumber, isString, isStringArray } from "./primitive";

export interface MatchJoinMetadata {
  username: string;
}

export const isMatchJoinMetadata = (value: unknown): value is MatchJoinMetadata => {
  const assertedVal = value as MatchJoinMetadata;

  return assertedVal.username !== undefined && isString(assertedVal.username);
};

export type AvatarId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const isAvatarId = (value: unknown): value is AvatarId => {
  if (!isNumber(value)) return false;
  return value >= 1 || value <= 7;
};

export type PlayerStatus = "playing" | "lost";

export const isPlayerStatus = (value: unknown): value is PlayerStatus => {
  const statuses: PlayerStatus[] = ["playing", "lost"];
  const assertedVal = value as PlayerStatus;
  return statuses.includes(assertedVal);
};

export type TurnActionStep = "pickAction" | "proceedWithAction" | "evaluateWinner" | "results";

export type Action = "Exact" | "Boloney" | "lostByTimeOut";

// we need both undefined and null because nakama
export type ActionRole = "winner" | "loser" | "timeOut" | undefined | null;

export const isActionRole = (value: unknown): value is ActionRole => {
  const roles: ActionRole[] = ["winner", "loser", "timeOut", undefined, null];
  return roles.includes(value as ActionRole);
};

export interface PlayerPrivate {
  diceValue: Die[];
  powerUpIds: PowerUpId[];
  seed: number;
  hashChain: string[];
}

export const isPlayerPrivate = (value: unknown): value is PlayerPrivate => {
  const assertedVal = value as PlayerPrivate;
  const { diceValue, powerUpIds, seed, hashChain } = assertedVal;

  return (
    diceValue !== undefined &&
    powerUpIds !== undefined &&
    seed !== undefined &&
    hashChain !== undefined &&
    isDieArray(diceValue) &&
    isStringArray(powerUpIds) &&
    isNumber(seed) &&
    isStringArray(hashChain)
  );
};

export const isPlayerPrivateArray = (values: unknown): values is PlayerPrivate[] => {
  if (!values || !(values instanceof Array)) return false;
  return values.every((val) => isPlayerPrivate(val));
};

export interface PlayerPublic {
  userId: string;
  username: string;
  avatarId: AvatarId;
  diceAmount: number;
  powerUpsAmount: number;
  hasInitialPowerUps: boolean;
  status: PlayerStatus;
  actionRole: ActionRole;
  extraDice: number;
  rngDiceCounter: number;
  arePowerUpsDisabled: boolean;
  hasRolledDice: boolean;
  isConnected: boolean;
  isReady: boolean;
  isActive: boolean;
  isTarget: boolean;
}

export const isPlayerPublic = (value: unknown): value is PlayerPublic => {
  const assertedVal = value as PlayerPublic;
  const {
    userId,
    username,
    avatarId,
    diceAmount,
    powerUpsAmount,
    isConnected,
    isReady,
    hasInitialPowerUps,
    isActive,
    hasRolledDice,
    status,
    actionRole,
    isTarget,
    extraDice,
    rngDiceCounter,
    arePowerUpsDisabled,
  } = assertedVal;

  return (
    userId !== undefined &&
    username !== undefined &&
    avatarId !== undefined &&
    diceAmount !== undefined &&
    powerUpsAmount !== undefined &&
    status !== undefined &&
    actionRole !== undefined &&
    extraDice !== undefined &&
    rngDiceCounter !== undefined &&
    hasRolledDice !== undefined &&
    hasInitialPowerUps !== undefined &&
    arePowerUpsDisabled !== undefined &&
    isConnected !== undefined &&
    isReady !== undefined &&
    isTarget !== undefined &&
    isActive !== undefined &&
    isString(userId) &&
    isString(username) &&
    isAvatarId(avatarId) &&
    isPlayerStatus(status) &&
    isActionRole(actionRole) &&
    isNumber(diceAmount) &&
    isNumber(powerUpsAmount) &&
    isNumber(extraDice) &&
    isNumber(rngDiceCounter) &&
    isBoolean(isConnected) &&
    isBoolean(isReady) &&
    isBoolean(hasInitialPowerUps) &&
    isBoolean(hasRolledDice) &&
    isBoolean(isTarget) &&
    isBoolean(arePowerUpsDisabled) &&
    isBoolean(isActive)
  );
};

export interface PlayerRanked extends PlayerPublic {
  lostAtRound: number;
}

export const isPlayerRanked = (value: unknown): value is PlayerRanked => {
  const assertedVal = value as PlayerRanked;

  return isPlayerPublic(assertedVal) && assertedVal.lostAtRound !== undefined && isNumber(assertedVal.lostAtRound);
};

export const isPlayerPublicArray = (values: unknown): values is PlayerPublic[] => {
  if (!values || !(values instanceof Array)) return false;
  return values.every((val) => isPlayerPublic(val));
};

export type Player = PlayerPrivate & PlayerPublic;

export const isPlayerArray = (value: unknown): value is Player[] => {
  return isPlayerPrivateArray(value) && isPlayerPublicArray(value);
};

export const isPresence = (value: unknown): value is nkruntime.Presence => {
  const assertedVal = value as nkruntime.Presence;

  return (
    assertedVal.node !== undefined &&
    assertedVal.userId !== undefined &&
    assertedVal.sessionId !== undefined &&
    assertedVal.username !== undefined &&
    isString(assertedVal.node) &&
    isString(assertedVal.userId) &&
    isString(assertedVal.sessionId) &&
    isString(assertedVal.username)
  );
};

// TODO: in the future we may want to merge 'availablePowerUps' and 'powerUpProbability' into one single attribute
export interface MatchSettings {
  players: number;
  dicePerPlayer: number;
  initialPowerUpAmount: number;
  maxPowerUpAmount: number;
  availablePowerUps: PowerUpId[];
  healPowerUpAmount: number;
  stageNumberDivisor: number;
  drawRoundOffset: number;
  powerUpProbability: PowerUpProbability[];
  zkEnabled: boolean;
}

export const isMatchSettings = (value: unknown): value is MatchSettings => {
  const assertedVal = value as MatchSettings;

  return (
    assertedVal.players !== undefined &&
    assertedVal.dicePerPlayer !== undefined &&
    assertedVal.initialPowerUpAmount !== undefined &&
    assertedVal.maxPowerUpAmount !== undefined &&
    assertedVal.healPowerUpAmount !== undefined &&
    assertedVal.stageNumberDivisor !== undefined &&
    assertedVal.drawRoundOffset !== undefined &&
    assertedVal.powerUpProbability !== undefined &&
    assertedVal.zkEnabled !== undefined &&
    isNumber(assertedVal.players) &&
    isNumber(assertedVal.dicePerPlayer) &&
    isNumber(assertedVal.initialPowerUpAmount) &&
    isNumber(assertedVal.maxPowerUpAmount) &&
    isNumber(assertedVal.healPowerUpAmount) &&
    isNumber(assertedVal.stageNumberDivisor) &&
    isNumber(assertedVal.drawRoundOffset) &&
    isPowerUpProbabilityArray(assertedVal.powerUpProbability) &&
    isBoolean(assertedVal.zkEnabled)
  );
};

export interface MatchState {
  settings: MatchSettings;
  players: Record<string, Player>;
  presences: Record<string, nkruntime.Presence>;
  bids: Record<string, Bid>;
  playersReady: string[];
  playerOrder: string[];
  matchStage: MatchStage;
  ticksBeforeTimeOut: number;
  timerHasStarted: boolean;
  emptyTicks: number;
  leaderboard: PlayerRanked[];
  round: number;
  stageNumber: number;
  drawRoundCounter: number;
  turnActionStep: TurnActionStep;
  action: Action;
  historyEvents: HistoryEvent[];
  activePowerUp?: ActivePowerUp;
  rollBackAttempts: number;
}

export type MatchStage =
  | "lobbyStage" // waiting for players to be ready
  | "getPowerUpStage" // Get powerups
  | "rollDiceStage" // Roll the dice
  | "playerTurnLoopStage" // Players turn loop
  | "roundSummaryStage" // Round summary
  | "endOfMatchStage" // Match summary
  | "terminateMatchStage"; // Garbage Collection

export const isMatchStage = (value: unknown): value is MatchStage => {
  const assertedVal = value as MatchStage;
  return MATCH_STAGES.includes(assertedVal);
};

export enum MatchOpCode {
  STAGE_TRANSITION = 1,
  PLAYER_READY = 2,
  ROLL_DICE = 3,
  FACE_VALUES = 4,
  LEAVE_MATCH = 5,
  PLAYER_JOINED = 6,
  PLAYER_ORDER_SHUFFLE = 7,
  PLAYER_GET_POWERUPS = 8,
  PLAYER_PLACE_BID = 9,
  PLAYER_CALL_EXACT = 10,
  PLAYER_CALL_BOLONEY = 11,
  PLAYER_ACTIVE = 12,
  STOP_LOADING = 13,
  ROUND_SUMMARY_TRANSITION = 14,
  ERROR = 15,
  PLAYER_LEFT = 16,
  PLAYER_LOST_BY_TIMEOUT = 17,
  USE_POWER_UP = 18,
  PLAYER_HEAL_DICE = 19,
}

export const isMatchOpCode = (value: unknown): value is MatchOpCode => {
  return isNumber(value) && value >= MatchOpCode.STAGE_TRANSITION && value <= MatchOpCode.PLAYER_HEAL_DICE;
};

export interface MatchLoopParams {
  ctx: nkruntime.Context;
  logger: nkruntime.Logger;
  nk: nkruntime.Nakama;
  dispatcher: nkruntime.MatchDispatcher;
  tick: number;
  state: MatchState;
  messages: nkruntime.MatchMessage[];
}
