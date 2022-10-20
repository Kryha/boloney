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

export type MatchSettings = z.infer<typeof matchSettingsSchema>;
