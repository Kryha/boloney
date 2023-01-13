import { z } from "zod";
import { NkError } from "./error";
import { matchStageSchema, matchStateSchema, playerPublicSchema, playerRankedSchema } from "./match";
import { powerUpIdSchema } from "./power-up";

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

export const playerLostByTimeOutPayloadBeckendSchema = z.object({
  players: z.record(playerPublicSchema),
});
export type PlayerLostByTimeOutPayloadBeckend = z.infer<typeof playerLostByTimeOutPayloadBeckendSchema>;

export const roundSummaryTransitionPayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
  leaderboard: z.array(playerRankedSchema),
  round: z.number(),
  stageNumber: z.number(),
  drawRoundCounter: z.number(),
});
export type RoundSummaryTransitionPayloadBackend = z.infer<typeof roundSummaryTransitionPayloadBackendSchema>;

// TODO: rename with "schema" in the end and define type as well
export const playerLeftPayloadBackend = z.object({
  players: z.record(playerPublicSchema),
  playerOrder: z.array(z.string()),
  stage: matchStageSchema,
  leaderboard: z.array(playerRankedSchema).optional(),
});

export const playerGetPowerUpsPayloadBackendSchema = z.array(powerUpIdSchema);
export type PlayerGetPowerUpsPayloadBackend = z.infer<typeof playerGetPowerUpsPayloadBackendSchema>;
