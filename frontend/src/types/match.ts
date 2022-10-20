import { z } from "zod";
import { MAX_POWERUPS_PER_PLAYER } from "../constants";

import { powerUpTypeSchema, powerUpProbabilitySchema } from "./power-up";

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  avatarName: z.string(),
  connected: z.boolean(),
});

export type Player = z.infer<typeof playerSchema>;

export const matchSettingsSchema = z.object({
  players: z.number(),
  dicePerPlayer: z.number(),
  initialPowerUpAmount: z.number(),
  maxPowerUpAmount: z.number().max(MAX_POWERUPS_PER_PLAYER),
  availablePowerUps: z.array(powerUpTypeSchema),
  healAction: z.number(),
  stageNumber: z.number(),
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
  healAction: z.string().transform((val) => Number(val)),
  stageNumber: z.string().transform((val) => Number(val)),
  drawRoundOffset: z.string().transform((val) => Number(val)),
  powerUpProbability: z.array(powerUpProbabilitySchema),
});

export type MatchSettings = z.infer<typeof matchSettingsSchema>;

export type MatchFormSettings = z.infer<typeof matchSettingsSchema>;
