import { z } from "zod";

import { powerUpIdSchema } from "./power-up";

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

export const notificationOpCodeSchema = z.nativeEnum(NotificationOpCode);

export const notificationPlayerLostSchema = z.object({
  activePlayerName: z.string(),
});
export type NotificationPlayerLost = z.infer<typeof notificationPlayerLostSchema>;

export const notificationCallExactSchema = z.object({
  activePlayerName: z.string(),
});
export type NotificationCallExact = z.infer<typeof notificationCallExactSchema>;

export const notificationCallBoloneySchema = z.object({
  activePlayerName: z.string(),
  targetPlayerName: z.string(),
});
export type NotificationCallBoloney = z.infer<typeof notificationCallBoloneySchema>;

export const notificationErrorSchema = z.object({
  activePlayerName: z.string(),
  errorMessage: z.string(),
});
export type NotificationError = z.infer<typeof notificationErrorSchema>;

export const notificationUsePowerUpSchema = z.object({
  id: powerUpIdSchema,
  callerName: z.string(),
  targetName: z.string().optional(),
});
export type NotificationUsePowerUp = z.infer<typeof notificationUsePowerUpSchema>;

export interface NotificationContent {
  id: string;
  img: string;
  title: string;
  description: string;
  boldText: string[];
}
