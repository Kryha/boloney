import { MATCH_STAGES } from "../constants";
import { Bid } from "./bid";
import { Die, isDieArray } from "./die";
import { isPowerUpProbabilityArray, PowerUpProbability, PowerUpId } from "./power-up";
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

export type PlayerStatus = "playing" | "disconnected" | "lost";

export const isPlayerStatus = (value: unknown): value is PlayerStatus => {
  const statuses: PlayerStatus[] = ["playing", "disconnected", "lost"];
  const assertedVal = value as PlayerStatus;
  return statuses.includes(assertedVal);
};

// we need both undefined and null because nakama
export type ActionRole = "winner" | "loser" | undefined | null;

export const isActionRole = (value: unknown): value is ActionRole => {
  const roles: ActionRole[] = ["winner", "loser", undefined, null];
  return roles.includes(value as ActionRole);
};

export interface PlayerPrivate {
  diceValue: Die[];
  powerUpIds: PowerUpId[];
}

export const isPlayerPrivate = (value: unknown): value is PlayerPrivate => {
  const assertedVal = value as PlayerPrivate;

  return (
    assertedVal.diceValue !== undefined &&
    assertedVal.powerUpIds !== undefined &&
    isDieArray(assertedVal.diceValue) &&
    isStringArray(assertedVal.powerUpIds)
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
  isConnected: boolean;
  isReady: boolean;
  hasInitialPowerUps: boolean;
  isActive: boolean;
  hasRolledDice: boolean;
  status: PlayerStatus;
  actionRole: ActionRole;
  isTarget: boolean;
}

export const isPlayerPublic = (value: unknown): value is PlayerPublic => {
  const assertedVal = value as PlayerPublic;

  return (
    assertedVal.userId !== undefined &&
    assertedVal.username !== undefined &&
    assertedVal.avatarId !== undefined &&
    assertedVal.diceAmount !== undefined &&
    assertedVal.powerUpsAmount !== undefined &&
    assertedVal.isConnected !== undefined &&
    assertedVal.isReady !== undefined &&
    assertedVal.hasInitialPowerUps !== undefined &&
    assertedVal.hasRolledDice !== undefined &&
    assertedVal.status !== undefined &&
    assertedVal.actionRole !== undefined &&
    assertedVal.isTarget !== undefined &&
    isString(assertedVal.userId) &&
    isString(assertedVal.username) &&
    isAvatarId(assertedVal.avatarId) &&
    isNumber(assertedVal.diceAmount) &&
    isNumber(assertedVal.powerUpsAmount) &&
    isBoolean(assertedVal.isConnected) &&
    isBoolean(assertedVal.isReady) &&
    isBoolean(assertedVal.hasInitialPowerUps) &&
    isBoolean(assertedVal.hasRolledDice) &&
    isPlayerStatus(assertedVal.status) &&
    isActionRole(assertedVal.actionRole) &&
    isBoolean(assertedVal.isTarget)
  );
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
  healPowerUpAmount: number;
  stageNumberDivisor: number;
  drawRoundOffset: number;
  powerUpProbability: PowerUpProbability[];
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
    isNumber(assertedVal.players) &&
    isNumber(assertedVal.dicePerPlayer) &&
    isNumber(assertedVal.initialPowerUpAmount) &&
    isNumber(assertedVal.maxPowerUpAmount) &&
    isNumber(assertedVal.healPowerUpAmount) &&
    isNumber(assertedVal.stageNumberDivisor) &&
    isNumber(assertedVal.drawRoundOffset) &&
    isPowerUpProbabilityArray(assertedVal.powerUpProbability)
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
  emptyTicks: number;
  leaderboard: PlayerPublic[];
}

export const isMatchState = (value: unknown): value is MatchState => {
  const assertedVal = value as MatchState;
  return (
    assertedVal.settings !== undefined &&
    assertedVal.players !== undefined &&
    assertedVal.presences !== undefined &&
    assertedVal.bids !== undefined &&
    assertedVal.playersReady !== undefined &&
    assertedVal.playerOrder !== undefined &&
    assertedVal.matchStage !== undefined &&
    assertedVal.emptyTicks !== undefined &&
    isMatchSettings(assertedVal.settings) &&
    isStringArray(assertedVal.playersReady) &&
    isStringArray(assertedVal.playerOrder) &&
    isMatchStage(assertedVal.matchStage) &&
    isNumber(assertedVal.emptyTicks)
  );
};

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
  PLAYER_UPDATE = 14,
  LEADERBOARD_UPDATE = 15,
  ERROR = 17, // TODO: send as a notification
}

export const isMatchOpCode = (value: unknown): value is MatchOpCode => {
  return isNumber(value) && value >= MatchOpCode.STAGE_TRANSITION && value <= MatchOpCode.PLAYER_GET_POWERUPS;
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
