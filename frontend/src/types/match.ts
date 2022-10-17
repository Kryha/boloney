import { z } from "zod";

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  avatarName: z.string(),
  connected: z.boolean(),
});

export type Player = z.infer<typeof playerSchema>;

export const powerUpTypeSchema = z.enum(["p1", "p2", "p3", "p4"]);

export type PowerupType = z.infer<typeof powerUpTypeSchema>;

export const dieSchema = z.object({
  rolledValue: z.number().max(6).min(1),
});

export type Die = z.infer<typeof dieSchema>;

export const matchSettingsSchema = z.object({
  players: z.number(),
  dicePerPlayer: z.number(),
  powerupsPerPlayer: z.number(),
  availablePowerups: z.array(powerUpTypeSchema),
  isUsingFakeCredits: z.boolean(),
});

export type MatchSettings = z.infer<typeof matchSettingsSchema>;
