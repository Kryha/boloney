import { MatchPhase } from "../utils";
import { isPowerUpProbabilityArray, isPowerUpTypeArray, PowerUpProbability, PowerUpType } from "./power-up";
import { isBoolean, isNumber, isObject, isString } from "./primitive";

export interface Player {
  username: string;
  color: string;
  avatarName: string;
  isConnected: boolean;
  isReady: boolean;
  presence: nkruntime.Presence | null;
}

export const isPlayer = (value: unknown): value is Player => {
  const assertedVal = value as Player;

  return (
    assertedVal.username !== undefined &&
    assertedVal.color !== undefined &&
    assertedVal.avatarName !== undefined &&
    assertedVal.isConnected !== undefined &&
    assertedVal.isReady !== undefined &&
    assertedVal.presence !== undefined &&
    isString(assertedVal.username) &&
    isString(assertedVal.color) &&
    isString(assertedVal.avatarName) &&
    isBoolean(assertedVal.isConnected) &&
    isBoolean(assertedVal.isReady) &&
    isObject(assertedVal.presence)
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

// TODO: see how it relates to nakama's default match state type
export interface MatchState {
  // TODO: should we keep both presences and players?
  players: Record<string, Player>;
  presences: Record<string, nkruntime.Presence>;
  phase: MatchPhase;
  emptyTicks: number;
  settings: MatchSettings;
}

export const isMatchState = (value: unknown): value is MatchState => {
  const assertedVal = value as MatchState;

  return (
    assertedVal.players !== undefined &&
    assertedVal.presences !== undefined &&
    assertedVal.phase !== undefined &&
    assertedVal.emptyTicks !== undefined &&
    assertedVal.settings !== undefined &&
    isObject(assertedVal.players) &&
    isObject(assertedVal.presences) &&
    isNumber(assertedVal.phase) && // TODO: use custom predicate after defining
    isObject(assertedVal.settings) &&
    isNumber(assertedVal.emptyTicks) &&
    isMatchSettings(assertedVal.settings)
  );
};
