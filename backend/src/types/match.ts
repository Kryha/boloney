import { isPowerupTypeArray, PowerupType } from "./power-up";
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

export interface MatchSettings {
  requiredPlayers: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: PowerupType[];
  isUsingFakeCredits: boolean;
}

export const isMatchSettings = (value: unknown): value is MatchSettings => {
  const assertedVal = value as MatchSettings;

  return (
    assertedVal.requiredPlayers !== undefined &&
    assertedVal.dicePerPlayer !== undefined &&
    assertedVal.powerupsPerPlayer !== undefined &&
    assertedVal.availablePowerups !== undefined &&
    assertedVal.isUsingFakeCredits !== undefined &&
    isNumber(assertedVal.requiredPlayers) &&
    isNumber(assertedVal.dicePerPlayer) &&
    isNumber(assertedVal.powerupsPerPlayer) &&
    isBoolean(assertedVal.isUsingFakeCredits) &&
    isPowerupTypeArray(assertedVal.availablePowerups)
  );
};

export interface MatchState {
  settings: MatchSettings;
  players: PlayerState[];
  phaseReady: string[];
  playerCount: number;
  playerOrder: string[];
  matchPhase: MatchPhase;
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
    isMatchPhase(assertedVal.matchPhase) &&
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

export type MatchPhase =
  | "waitingForPlayers" // waiting for people to join the lobby
  | "waitingForPlayersReady" // waiting for players to be ready
  | "roundPhase1" // Get powerups
  | "roundPhase2" // Roll the dice
  | "roundPhase3" // Players turn loop
  | "roundPhase4" // Round summery
  | "endGame"; // Match summery

export const isMatchPhase = (value: unknown): value is MatchPhase => {
  const assertedVal = value as MatchPhase;

  return (
    assertedVal === "waitingForPlayers" ||
    assertedVal === "waitingForPlayersReady" ||
    assertedVal === "roundPhase1" ||
    assertedVal === "roundPhase2" ||
    assertedVal === "roundPhase3" ||
    assertedVal === "roundPhase4" ||
    assertedVal === "endGame"
  );
};

export const isWaitingForPlayers = (value: unknown): value is "waitingForPlayers" => {
  return isMatchPhase(value) && value === "waitingForPlayers";
};
export const isWaitingForPlayersReady = (value: unknown): value is "waitingForPlayersReady" => {
  return isMatchPhase(value) && value === "waitingForPlayersReady";
};
export const isRoundPhase1 = (value: unknown): value is "roundPhase1" => {
  return isMatchPhase(value) && value === "roundPhase1";
};
export const isRoundPhase2 = (value: unknown): value is "roundPhase2" => {
  return isMatchPhase(value) && value === "roundPhase2";
};
export const isRoundPhase3 = (value: unknown): value is "roundPhase3" => {
  return isMatchPhase(value) && value === "roundPhase3";
};
export const isRoundPhase4 = (value: unknown): value is "roundPhase4" => {
  return isMatchPhase(value) && value === "roundPhase4";
};
export const isEndGame = (value: unknown): value is "endGame" => {
  return isMatchPhase(value) && value === "endGame";
};

export enum OpCode {
  PhaseReady = 1,
  PhaseTransition = 2,
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
