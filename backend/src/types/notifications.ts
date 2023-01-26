import { PowerUpId } from "./power-up";
import { isString } from "./primitive";

export enum NotificationOpCode {
  HEAL_DICE = 1,
  LOSE_ALL_DICE = 2,
  POWER_UP = 3,
  EXACT = 4,
  BOLONEY = 5,
  ERROR = 6,
  PLAYER_LOST = 7,
  PLAYER_LEFT = 8,
  USE_POWER_UP = 9,
}

export interface NotificationContentPlayerLost {
  activePlayerName: string;
}

export const isNotificationContentPlayerLost = (value: unknown): value is NotificationContentPlayerLost => {
  const assertedVal = value as NotificationContentPlayerLost;

  return assertedVal.activePlayerName !== undefined && isString(assertedVal.activePlayerName);
};
export interface NotificationContentCallExact {
  activePlayerName: string;
}
export const isNotificationContentCallExact = (value: unknown): value is NotificationContentCallExact => {
  const assertedVal = value as NotificationContentCallExact;

  return assertedVal.activePlayerName !== undefined && isString(assertedVal.activePlayerName);
};
export interface NotificationContentCallBoloney {
  activePlayerName: string;
  targetPlayerName: string;
}
export const isNotificationContentCallBoloney = (value: unknown): value is NotificationContentCallBoloney => {
  const assertedVal = value as NotificationContentCallBoloney;

  return (
    assertedVal.activePlayerName !== undefined &&
    assertedVal.targetPlayerName !== undefined &&
    isString(assertedVal.activePlayerName) &&
    isString(assertedVal.targetPlayerName)
  );
};

export interface NotificationContentHealDice {
  activePlayerName: string;
}

export const isNotificationContentHealDice = (value: unknown): value is NotificationContentHealDice => {
  const assertedVal = value as NotificationContentHealDice;

  return assertedVal.activePlayerName !== undefined && isString(assertedVal.activePlayerName);
};

export interface NotificationContentError {
  activePlayerName: string;
  errorMessage: string;
}

export const isNotificationContentError = (value: unknown): value is NotificationContentError => {
  const assertedVal = value as NotificationContentError;

  return (
    assertedVal.activePlayerName !== undefined &&
    assertedVal.errorMessage !== undefined &&
    isString(assertedVal.activePlayerName) &&
    isString(assertedVal.errorMessage)
  );
};

export interface NotificationContentUsePowerUp {
  id: PowerUpId;
  callerName: string;
  targetName?: string;
}

export type NotificationContent =
  | NotificationContentCallBoloney
  | NotificationContentCallExact
  | NotificationContentError
  | NotificationContentPlayerLost
  | NotificationContentHealDice
  | NotificationContentUsePowerUp;
