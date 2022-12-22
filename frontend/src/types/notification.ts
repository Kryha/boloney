import { z } from "zod";

// TODO: update types in backend
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

export const notificationOpCodeSchema = z.nativeEnum(NotificationOpCode);

export const notificationPlayerLostSchema = z.object({
  activePlayerName: z.string(),
});

export const notificationCallExactSchema = z.object({
  activePlayerName: z.string(),
});

export const notificationCallBoloneySchema = z.object({
  activePlayerName: z.string(),
  targetPlayerName: z.string(),
});

export const notificationErrorSchema = z.object({
  activePlayerName: z.string(),
  errorMessage: z.string(),
});

export type NotificationCallExact = z.infer<typeof notificationCallExactSchema>;
export type NotificationPlayerLost = z.infer<typeof notificationPlayerLostSchema>;
export type NotificationCallBoloney = z.infer<typeof notificationCallBoloneySchema>;
export type NotificationError = z.infer<typeof notificationErrorSchema>;

export interface NotificationContent {
  id: string;
  img: string;
  title: string;
  description: string;
  boldText: string[];
}
