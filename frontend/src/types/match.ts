import { z } from "zod";

import { powerUpTypeSchema } from "./power-up";

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

export const matchSettingsSchema = z.object({
  requiredPlayerCount: z.number(),
  dicePerPlayer: z.number(),
  powerUpsPerPlayer: z.number(),
  availablePowerUps: z.array(powerUpTypeSchema),
  isUsingFakeCredits: z.boolean(),
});
export type MatchSettings = z.infer<typeof matchSettingsSchema>;
