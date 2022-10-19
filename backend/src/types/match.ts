import { MatchPhase } from "../utils";
import { isPowerupTypeArray, PowerupType } from "./power-up";
import { isBoolean, isNumber, isObject, isString } from "./primitive";

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

export interface PlayerState {
  presence: nkruntime.Presence | null;
  isReady: boolean;
}

export const isPlayerState = (value: unknown): value is PlayerState => {
  const assertedVal = value as PlayerState;

  return (
    assertedVal.presence !== undefined &&
    assertedVal.isReady !== undefined &&
    isObject(assertedVal.presence) &&
    isBoolean(assertedVal.isReady)
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
  players: { [userId: string]: PlayerState };
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
