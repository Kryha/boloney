import { z } from "zod";
import { bidPayloadBackendSchema } from "./bid";
import { NkError } from "./error";
import { matchStageSchema, matchStateSchema, playerIdSchema, playerPublicSchema, playerRankedSchema } from "./match";
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

export const playerLostByTimeOutPayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
});
export type PlayerLostByTimeOutPayloadBackend = z.infer<typeof playerLostByTimeOutPayloadBackendSchema>;

export const healDicePayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
});
export type HealDicePayloadBackend = z.infer<typeof healDicePayloadBackendSchema>;

// Payload send to the backend when player call Heal Dice
export const healDicePayloadFrontendSchema = z.object({
  selectedPowerUps: z.array(powerUpIdSchema),
});
export type HealDicePayloadFrontend = z.infer<typeof healDicePayloadFrontendSchema>;

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

export const stageTransitionPayloadBackendSchema = z.object({
  matchStage: matchStageSchema,
  remainingStageTime: z.number().optional(),
});
export type StageTransitionPayloadBackend = z.infer<typeof stageTransitionPayloadBackendSchema>;

export const playerReadyPayloadBackendSchema = z.record(playerPublicSchema);
export type PlayerReadyPayloadBackend = z.infer<typeof playerReadyPayloadBackendSchema>;

export const playerOrderShufflePayloadBackendSchema = z.object({
  playerOrder: z.array(z.string()),
});
export type PlayerOrderShufflePayloadBackend = z.infer<typeof playerOrderShufflePayloadBackendSchema>;

export const playerActivePayloadBackendSchema = z.object({
  activePlayerId: playerIdSchema,
});
export type PlayerActivePayloadBackend = z.infer<typeof playerActivePayloadBackendSchema>;

export const matchHistoryUpdateBackendPayloadSchema = z.discriminatedUnion("id", [
  z.object({ id: z.literal("bid"), data: bidPayloadBackendSchema }),
  z.object({ id: z.literal("healDice"), data: healDicePayloadBackendSchema }),
]);

export type MatchHistoryUpdateBackendPayload = z.infer<typeof matchHistoryUpdateBackendPayloadSchema>;
