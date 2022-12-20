import { z } from "zod";
import { bidPayloadBackendSchema } from "./bid";
import { dieSchema } from "./die";

import { NkError } from "./error";
import { matchSettingsSchema, matchStageSchema, playerPublicSchema } from "./match";
import { powerUpIdSchema } from "./power-up";

export type NkResponse<T = void> = NkError | T;

export const playerJoinedPayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
  playerOrder: z.array(z.string()),
  matchStage: matchStageSchema,
  powerUpIds: z.array(powerUpIdSchema),
  matchSettings: matchSettingsSchema,
  leaderboard: z.array(playerPublicSchema),
  hasRolledDice: z.boolean(),
  diceValue: z.array(dieSchema),
  bids: bidPayloadBackendSchema,
});
export type PlayerJoinedPayloadBackend = z.infer<typeof playerJoinedPayloadBackendSchema>;

export const boloneyPayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
});
export type BoloneyPayloadBackend = z.infer<typeof boloneyPayloadBackendSchema>;

export const exactPayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
});
export type ExactPayloadBackend = z.infer<typeof exactPayloadBackendSchema>;

export const playerUpdatePayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
});
export type PlayerUpdatePayloadBackend = z.infer<typeof playerUpdatePayloadBackendSchema>;

export const leaderboardUpdatePayloadBackendSchema = z.object({
  leaderboard: z.array(playerPublicSchema),
});
export type LeaderboardUpdatePayloadBackend = z.infer<typeof leaderboardUpdatePayloadBackendSchema>;
