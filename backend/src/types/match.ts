import { isPowerUpProbabilityArray, isPowerUpTypeArray, PowerUpProbability, PowerUpType } from "./power-up";
import { isBoolean, isNumber, isString } from "./primitive";

// TODO: use avatar IDs instead of colors and names

export type AvatarName = "toy" | "hook" | "plastic" | "scooper" | "hand" | "lobster" | "skeleton";

export const AVATAR_NAMES: AvatarName[] = ["toy", "hook", "plastic", "scooper", "hand", "lobster", "skeleton"];

export const isAvatarName = (value: unknown): value is AvatarName => {
  const assertedVal = String(value) as AvatarName;
  return AVATAR_NAMES.includes(assertedVal);
};

export const isAvatarNameArray = (names: unknown): names is AvatarName[] => {
  if (!names) return false;
  if (!(names instanceof Array)) return false;

  const areValid = names.reduce((valid, name) => valid && isAvatarName(name), true);
  return areValid;
};

export type AvatarColor = "#FFC300" | "#FF8059" | "#FFA7E9" | "#989EFF" | "#92C9FF" | "#91C342" | "#91C342";

export const AVATAR_COLORS: AvatarColor[] = ["#FFC300", "#FF8059", "#FFA7E9", "#989EFF", "#92C9FF", "#91C342", "#91C342"];

export const isAvatarColor = (value: unknown): value is AvatarColor => {
  const assertedVal = String(value) as AvatarColor;
  return AVATAR_COLORS.includes(assertedVal);
};

export const isAvatarColorArray = (colors: unknown): colors is AvatarColor[] => {
  if (!colors) return false;
  if (!(colors instanceof Array)) return false;

  const areValid = colors.reduce((valid, color) => valid && isAvatarColor(color), true);
  return areValid;
};

// TODO: normalise match codes
export enum MatchOpCode {
  CONNECTED = 1, // OpCodes can't be 0
  LOBBY_FULL,
  READY,
  MATCH_START,
  PLAYER_JOINED = 100,
}

export const isMatchOpCode = (value: unknown): value is MatchOpCode => {
  return isNumber(value) && value >= MatchOpCode.CONNECTED && value <= MatchOpCode.MATCH_START;
};

export type MatchPhase = "waitingForPlayers" | "waitingForPlayersReady" | "inProgress";

export const isMatchPhase = (value: unknown): value is MatchPhase => {
  return value === "waitingForPlayers" || value === "waitingForPlayersReady" || value === "inProgress";
};

export interface MatchJoinMetadata {
  username: string;
}

export const isMatchJoinMetadata = (value: unknown): value is MatchJoinMetadata => {
  const assertedVal = value as MatchJoinMetadata;

  return assertedVal.username !== undefined && isString(assertedVal.username);
};

export interface Player {
  username: string;
  color: string;
  avatarName: string;
  isConnected: boolean;
  isReady: boolean;
}

export const isPlayer = (value: unknown): value is Player => {
  const assertedVal = value as Player;

  return (
    assertedVal.username !== undefined &&
    assertedVal.color !== undefined &&
    assertedVal.avatarName !== undefined &&
    assertedVal.isConnected !== undefined &&
    assertedVal.isReady !== undefined &&
    isString(assertedVal.username) &&
    isString(assertedVal.color) &&
    isString(assertedVal.avatarName) &&
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
  players: Record<string, Player>;
  presences: Record<string, nkruntime.Presence>;
  phase: MatchPhase;
  emptyTicks: number;
  settings: MatchSettings;
  availableAvatarNames: AvatarName[];
  availableAvatarColors: AvatarColor[];
}

export const isMatchState = (value: unknown): value is MatchState => {
  const assertedVal = value as MatchState;

  return (
    assertedVal.players !== undefined &&
    assertedVal.presences !== undefined &&
    assertedVal.phase !== undefined &&
    assertedVal.emptyTicks !== undefined &&
    assertedVal.settings !== undefined &&
    assertedVal.availableAvatarNames !== undefined &&
    assertedVal.availableAvatarColors !== undefined &&
    isMatchPhase(assertedVal.phase) &&
    isMatchSettings(assertedVal.settings) &&
    isNumber(assertedVal.emptyTicks) &&
    isAvatarNameArray(assertedVal.availableAvatarNames) &&
    isAvatarColorArray(assertedVal.availableAvatarColors)
  );
};
