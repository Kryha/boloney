import { z } from "zod";

import { powerUpTypeSchema } from "./power-up";

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
  powerupsPerPlayer: z.number(),
  availablePowerups: z.array(powerUpTypeSchema),
  isUsingFakeCredits: z.boolean(),
});

export type MatchSettings = z.infer<typeof matchSettingsSchema>;
