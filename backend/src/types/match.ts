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

export type PowerupType = "p1" | "p2" | "p3" | "p4";

export const isPowerupType = (value: unknown): value is PowerupType => {
  const assertedVal = value as PowerupType;

  return assertedVal === "p1" || assertedVal === "p2" || assertedVal === "p3" || assertedVal === "p4";
};

export const isPowerupTypeArray = (types: unknown): types is PowerupType[] => {
  if (!types) return false;
  if (!(types instanceof Array)) return false;

  const areValid = types.reduce((valid, pt) => valid && isPowerupType(pt), true);
  return areValid;
};

export interface Die {
  rolledValue: number;
}

export const isDie = (value: unknown): value is Die => {
  const assertedVal = value as Die;

  return assertedVal.rolledValue !== undefined && isNumber(assertedVal.rolledValue);
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
