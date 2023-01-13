import { z } from "zod";
import { NkError } from "./error";
import { matchStageSchema, matchStateSchema, playerPublicSchema, playerRankedSchema } from "./match";

export type NkResponse<T = void> = NkError | T;

export const playerJoinedPayloadBackendSchema = z.object({
  matchState: matchStateSchema,
  remainingStageTime: z.number(),
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

export const playerLostByTimeOutPayloadBeckendSchema = z.object({
  players: z.record(playerPublicSchema),
});
export type PlayerLostByTimeOutPayloadBeckend = z.infer<typeof playerLostByTimeOutPayloadBeckendSchema>;

export const leaderboardUpdatePayloadBackendSchema = z.object({
  leaderboard: z.array(playerRankedSchema),
  round: z.number(),
});
export type LeaderboardUpdatePayloadBackend = z.infer<typeof leaderboardUpdatePayloadBackendSchema>;

export const playerLeftPayloadBackend = z.object({
  players: z.record(playerPublicSchema),
  playerOrder: z.array(z.string()),
  stage: matchStageSchema,
  leaderboard: z.array(playerRankedSchema).optional(),
});
