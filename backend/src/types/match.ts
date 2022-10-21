import { isPowerUpProbabilityArray, isPowerupTypeArray, PowerUpProbability, PowerupType } from "./power-up";
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
  players: number;
  dicePerPlayer: number;
  initialPowerUpAmount: number;
  maxPowerUpAmount: number;
  availablePowerUps: PowerupType[];
  healAction: number;
  stageNumber: number;
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
    assertedVal.healAction !== undefined &&
    assertedVal.stageNumber !== undefined &&
    assertedVal.drawRoundOffset !== undefined &&
    assertedVal.powerUpProbability !== undefined &&
    isNumber(assertedVal.players) &&
    isNumber(assertedVal.dicePerPlayer) &&
    isNumber(assertedVal.initialPowerUpAmount) &&
    isNumber(assertedVal.maxPowerUpAmount) &&
    isPowerupTypeArray(assertedVal.availablePowerUps) &&
    isNumber(assertedVal.healAction) &&
    isNumber(assertedVal.stageNumber) &&
    isNumber(assertedVal.drawRoundOffset) &&
    isPowerUpProbabilityArray(assertedVal.powerUpProbability)
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
