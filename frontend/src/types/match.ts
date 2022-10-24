import { z } from "zod";
import { MAX_POWERUPS_PER_PLAYER } from "../constants";

import { powerUpTypeSchema, powerUpProbabilitySchema } from "./power-up";

export const AvatarName = z.enum(["toy", "hook", "plastic", "scooper", "hand", "lobster", "skeleton"]);
export type AvatarName = z.infer<typeof AvatarName>;

export const AvatarColors = z.enum(["#FFC300", "#FF8059", "#FFA7E9", "#989EFF", "#92C9FF", "#91C342", "#91C342"]);
export type AvatarColors = z.infer<typeof AvatarColors>;

export const playerSchema = z.object({
  username: z.string(),
  color: z.string(),
  avatarName: z.string(),
  isConnected: z.boolean(),
  isReady: z.boolean(),
});
export type Player = z.infer<typeof playerSchema>;

// TODO: in the future we may want to merge 'availablePowerUps' and 'powerUpProbability' into one single attribute
export const matchSettingsSchema = z.object({
  players: z.number(),
  dicePerPlayer: z.number(),
  initialPowerUpAmount: z.number(),
  maxPowerUpAmount: z.number().max(MAX_POWERUPS_PER_PLAYER),
  availablePowerUps: z.array(powerUpTypeSchema),
  healPowerUpAmount: z.number(),
  stageNumberDivisor: z.number(),
  drawRoundOffset: z.number(),
  powerUpProbability: z.array(powerUpProbabilitySchema),
});

export const matchFormSettingsSchema = z.object({
  players: z.string().transform((val) => Number(val)),
  dicePerPlayer: z.string().transform((val) => Number(val)),
  initialPowerUpAmount: z.string().transform((val) => Number(val)),
  maxPowerUpAmount: z
    .string()
    .max(MAX_POWERUPS_PER_PLAYER)
    .transform((val) => Number(val)),
  availablePowerUps: z.array(powerUpTypeSchema),
  healPowerUpAmount: z.string().transform((val) => Number(val)),
  stageNumberDivisor: z.string().transform((val) => Number(val)),
  drawRoundOffset: z.string().transform((val) => Number(val)),
  powerUpProbability: z.array(powerUpProbabilitySchema),
});
export type MatchSettings = z.infer<typeof matchSettingsSchema>;

export type MatchFormSettings = z.infer<typeof matchSettingsSchema>;
