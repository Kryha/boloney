import { MatchPhase } from "../utils";
import { isPowerupTypeArray, PowerupType } from "./power-up";
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

export interface MatchSettings {
  requiredPlayerCount: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: PowerupType[];
  isUsingFakeCredits: boolean;
}

export const isMatchSettings = (value: unknown): value is MatchSettings => {
  const assertedVal = value as MatchSettings;

  return (
    assertedVal.requiredPlayerCount !== undefined &&
    assertedVal.dicePerPlayer !== undefined &&
    assertedVal.powerupsPerPlayer !== undefined &&
    assertedVal.availablePowerups !== undefined &&
    assertedVal.isUsingFakeCredits !== undefined &&
    isNumber(assertedVal.requiredPlayerCount) &&
    isNumber(assertedVal.dicePerPlayer) &&
    isNumber(assertedVal.powerupsPerPlayer) &&
    isBoolean(assertedVal.isUsingFakeCredits) &&
    isPowerupTypeArray(assertedVal.availablePowerups)
  );
};

export interface MatchState {
  players: { [userId: string]: Player };
  phase: MatchPhase;
  settings: MatchSettings;
  emptyTicks: number;
}

export const isMatchState = (value: unknown): value is MatchState => {
  const assertedVal = value as MatchState;

  return (
    assertedVal.players !== undefined &&
    assertedVal.phase !== undefined &&
    assertedVal.settings !== undefined &&
    assertedVal.emptyTicks !== undefined &&
    isObject(assertedVal.players) &&
    isNumber(assertedVal.phase) &&
    isObject(assertedVal.settings) &&
    isNumber(assertedVal.emptyTicks)
  );
};
