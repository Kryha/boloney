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
    assertedVal.players !== undefined &&
    assertedVal.dicePerPlayer !== undefined &&
    assertedVal.powerupsPerPlayer !== undefined &&
    assertedVal.availablePowerups !== undefined &&
    assertedVal.isUsingFakeCredits !== undefined &&
    isNumber(assertedVal.players) &&
    isNumber(assertedVal.dicePerPlayer) &&
    isNumber(assertedVal.powerupsPerPlayer) &&
    isBoolean(assertedVal.isUsingFakeCredits) &&
    isPowerupTypeArray(assertedVal.availablePowerups)
  );
};

export interface MatchState extends MatchSettings {
  presences: Record<string, nkruntime.Presence>;
  emptyTicks: number;
}

export const isMatchState = (value: unknown): value is MatchState => {
  if (!isMatchSettings(value)) return false;

  const assertedVal = value as MatchState;

  return (
    assertedVal.presences !== undefined &&
    assertedVal.emptyTicks !== undefined &&
    isObject(assertedVal.presences) &&
    isNumber(assertedVal.emptyTicks)
  );
};
