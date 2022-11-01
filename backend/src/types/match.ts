import { MATCH_STAGES } from "../utils";
import { isPowerUpProbabilityArray, isPowerUpTypeArray, PowerUpProbability, PowerUpType } from "./power-up";
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

export interface Player {
  userId: string;
  username: string;
  avatarId: AvatarId;
  isConnected: boolean;
  isReady: boolean;
}

export const isPlayer = (value: unknown): value is Player => {
  const assertedVal = value as Player;

  return (
    assertedVal.userId !== undefined &&
    assertedVal.username !== undefined &&
    assertedVal.avatarId !== undefined &&
    assertedVal.isConnected !== undefined &&
    assertedVal.isReady !== undefined &&
    isString(assertedVal.userId) &&
    isString(assertedVal.username) &&
    isAvatarId(assertedVal) &&
    isBoolean(assertedVal.isConnected) &&
    isBoolean(assertedVal.isReady)
  );
};

export const isPlayerArray = (value: unknown): value is Player[] => {
  if (!value) return false;
  if (!(value instanceof Array)) return false;

  const areValid = value.reduce((valid, pt) => valid && isPlayer(pt), true);
  return areValid;
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
  availablePowerUps: PowerUpType[];
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
    assertedVal.availablePowerUps !== undefined &&
    assertedVal.healPowerUpAmount !== undefined &&
    assertedVal.stageNumberDivisor !== undefined &&
    assertedVal.drawRoundOffset !== undefined &&
    assertedVal.powerUpProbability !== undefined &&
    isNumber(assertedVal.players) &&
    isNumber(assertedVal.dicePerPlayer) &&
    isNumber(assertedVal.initialPowerUpAmount) &&
    isNumber(assertedVal.maxPowerUpAmount) &&
    isPowerUpTypeArray(assertedVal.availablePowerUps) &&
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
  playersReady: string[];
  playerOrder: string[];
  matchStage: MatchStage;
  emptyTicks: number;
}

export const isMatchState = (value: unknown): value is MatchState => {
  const assertedVal = value as MatchState;
  return (
    assertedVal.settings !== undefined &&
    assertedVal.players !== undefined &&
    assertedVal.presences !== undefined &&
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
  | "roundSummaryStage" // Round summery
  | "endOfMatchStage"; // Match summery

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
}

export const isMatchOpCode = (value: unknown): value is MatchOpCode => {
  return isNumber(value) && value >= MatchOpCode.STAGE_TRANSITION && value <= MatchOpCode.PLAYER_JOINED;
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
