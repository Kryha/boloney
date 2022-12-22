import { isString } from "./primitive";

export enum NotificationOpCode {
  HEAL_DICE = 4,
  LOSE_ALL_DICE = 5,
  POWER_UP = 8,
  EXACT = 10,
  BOLONEY = 11,
  ERROR = 17,
  PLAYER_LOST = 18,
  PLAYER_LEFT = 19,
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

export type NotificationContent =
  | NotificationContentCallBoloney
  | NotificationContentCallExact
  | NotificationContentError
  | NotificationContentPlayerLost;
