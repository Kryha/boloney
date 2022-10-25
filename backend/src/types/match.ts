import { isPowerUpTypeArray, PowerUpType, PowerUpProbability, isPowerUpProbabilityArray } from "./power-up";
import { isBoolean, isNumber, isObject, isString, isStringArray } from "./primitive";

export interface Player {
  id: string;
  name: string;
  color: string;
  avatarName: string;
  connected: boolean;
}

export const isPlayer = (value: unknown): value is Player => {
  const assertedVal = value as Player;

  return (
    assertedVal.id !== undefined &&
    assertedVal.name !== undefined &&
    assertedVal.color !== undefined &&
    assertedVal.avatarName !== undefined &&
    assertedVal.color !== undefined &&
    isString(assertedVal.id) &&
    isString(assertedVal.name) &&
    isString(assertedVal.color) &&
    isString(assertedVal.avatarName) &&
    isBoolean(assertedVal.connected)
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
  players: PlayerState[];
  phaseReady: string[];
  playerCount: number;
  playerOrder: string[];
  matchPhase: MatchStage;
  emptyTicks: number;
}

export const isMatchState = (value: unknown): value is MatchState => {
  const assertedVal = value as MatchState;
  return (
    assertedVal.settings !== undefined &&
    assertedVal.emptyTicks !== undefined &&
    assertedVal.players !== undefined &&
    assertedVal.phaseReady !== undefined &&
    assertedVal.playerCount !== undefined &&
    assertedVal.playerOrder !== undefined &&
    assertedVal.matchPhase !== undefined &&
    isMatchSettings(assertedVal.settings) &&
    isPlayerStateArray(assertedVal.players) &&
    isStringArray(assertedVal.phaseReady) &&
    isNumber(assertedVal.playerCount) &&
    isStringArray(assertedVal.playerOrder) &&
    isMatchState(assertedVal.matchPhase) &&
    isNumber(assertedVal.emptyTicks)
  );
};

export interface PlayerState {
  presence: nkruntime.Presence;
  isReady: boolean;
}
export const isPlayerState = (value: unknown): value is PlayerState => {
  const assertedVal = value as PlayerState;

  return (
    assertedVal.presence !== undefined &&
    assertedVal.isReady !== undefined &&
    isPresence(assertedVal.presence) &&
    isBoolean(assertedVal.presence)
  );
};
export const isPlayerStateArray = (value: unknown): value is PlayerState[] => {
  if (!value) return false;
  if (!(value instanceof Array)) return false;

  const areValid = value.reduce((valid, pt) => valid && isPlayerState(pt), true);
  return areValid;
};
export enum RoundPhases {
  matchStart = 1,
  roundStart,
  turnStart,
  matchEnd,
}

export type MatchStage =
  | "LobbyStage" // waiting for people to join the lobby
  | "GetPowerUpStage" // waiting for players to be ready
  | "RollDiceStage" // Get powerups
  | "PlayerTurnLoopStage" // Roll the dice
  | "RoundSummaryStage" // Players turn loop
  | "EndOfMatchStage" // Round summery
  | "endGame"; // Match summery

export const isMatchStage = (value: unknown): value is MatchStage => {
  const assertedVal = value as MatchStage;

  return (
    assertedVal === "LobbyStage" ||
    assertedVal === "GetPowerUpStage" ||
    assertedVal === "RollDiceStage" ||
    assertedVal === "PlayerTurnLoopStage" ||
    assertedVal === "RoundSummaryStage" ||
    assertedVal === "EndOfMatchStage"
  );
};

export const isLobbyStage = (value: unknown): value is "LobbyStage" => {
  return isMatchStage(value) && value === "LobbyStage";
};
export const isGetPowerUpStage = (value: unknown): value is "GetPowerUpStage" => {
  return isMatchStage(value) && value === "GetPowerUpStage";
};
export const isRollDiceStage = (value: unknown): value is "RollDiceStage" => {
  return isMatchStage(value) && value === "RollDiceStage";
};
export const isPlayerTurnLoopStage = (value: unknown): value is "PlayerTurnLoopStage" => {
  return isMatchStage(value) && value === "PlayerTurnLoopStage";
};
export const isRoundSummaryStage = (value: unknown): value is "RoundSummaryStage" => {
  return isMatchStage(value) && value === "RoundSummaryStage";
};
export const isEndOfMatchStage = (value: unknown): value is "EndOfMatchStage" => {
  return isMatchStage(value) && value === "EndOfMatchStage";
};

export enum OpCode {
  StageTransition = 1,
  PlayerReady = 2,
  RollDice = 3,
  FaceValues = 4,
  LeaveMatch = 5,
}

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
