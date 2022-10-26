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
export interface Player {
  userId: string;
  username: string;
  avatarId: AvatarId;
  isConnected: boolean;
  isReady: boolean;
}
export const isAvatarId = (value: unknown): value is AvatarId => {
  if (!isNumber(value)) return false;
  return value === 1 || value == 2 || value == 3 || value == 4 || value == 5 || value == 6 || value == 7;
};
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
  //QUESTION: How do we keep track of the player state? as presence or player state or player object? or separate presence and player state
  players: Record<string, Player>;
  presences: Record<string, nkruntime.Presence>;
  stageReady: string[];
  playerOrder: string[];
  matchStage: MatchStage;
  emptyTicks: number;
}

export const isMatchState = (value: unknown): value is MatchState => {
  const assertedVal = value as MatchState;
  return (
    assertedVal.settings !== undefined &&
    assertedVal.emptyTicks !== undefined &&
    assertedVal.players !== undefined &&
    assertedVal.stageReady !== undefined &&
    assertedVal.playerOrder !== undefined &&
    assertedVal.matchStage !== undefined &&
    isMatchSettings(assertedVal.settings) &&
    // TODO: find a way to check Records
    // isPlayerState(assertedVal.players) &&
    isStringArray(assertedVal.stageReady) &&
    isStringArray(assertedVal.playerOrder) &&
    isMatchStage(assertedVal.matchStage) &&
    isNumber(assertedVal.emptyTicks)
  );
};

export const isPlayerArray = (value: unknown): value is Player[] => {
  if (!value) return false;
  if (!(value instanceof Array)) return false;

  const areValid = value.reduce((valid, pt) => valid && isPlayer(pt), true);
  return areValid;
};
export enum RoundPhases {
  matchStart = 1,
  roundStart,
  turnStart,
  matchEnd,
}

export type MatchStage =
  | "LobbyStage" // waiting for players to be ready
  | "GetPowerUpStage"
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

export enum MatchOpCode {
  StageTransition = 1,
  PlayerReady = 2,
  RollDice = 3,
  FaceValues = 4,
  LeaveMatch = 5,
}
export const isMatchOpCode = (value: unknown): value is MatchOpCode => {
  return isNumber(value) && value >= MatchOpCode.StageTransition && value <= MatchOpCode.LeaveMatch;
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
