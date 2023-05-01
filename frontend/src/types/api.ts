import { z } from "zod";
import { bidPayloadBackendSchema } from "./bid";
import { dieSchema } from "./die";
import { NkError } from "./error";
import { matchOpCodeSchema, matchStageSchema, matchStateSchema, playerIdSchema, playerPublicSchema, playerRankedSchema } from "./match";
import { powerUpIdSchema } from "./power-up";
import { hashChainSchema } from "./toolkit";

export type NkResponse<T = void> = NkError | T;

export const playerJoinedPayloadBackendSchema = z.object({
  matchState: matchStateSchema,
  remainingStageTime: z.number(),
});
export type PlayerJoinedPayloadBackend = z.infer<typeof playerJoinedPayloadBackendSchema>;

export const boloneyPayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
  diceValue: z.record(z.array(dieSchema)),
});
export type BoloneyPayloadBackend = z.infer<typeof boloneyPayloadBackendSchema>;

export const exactPayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
  diceValue: z.record(z.array(dieSchema)),
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

export const playerLeftPayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
  playerOrder: z.array(z.string()),
  playerLeftId: playerIdSchema,
  round: z.number(),
  diceValue: z.record(z.array(dieSchema)),
});
export type PlayerLeftPayloadbackend = z.infer<typeof playerLeftPayloadBackendSchema>;

export const playerGetPowerUpsPayloadBackendSchema = z.array(powerUpIdSchema);
export type PlayerGetPowerUpsPayloadBackend = z.infer<typeof playerGetPowerUpsPayloadBackendSchema>;

export const stageTransitionPayloadBackendSchema = z.object({
  matchStage: matchStageSchema,
  remainingStageTime: z.number().optional(),
  round: z.number(),
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
  remainingStageTime: z.number(),
});
export type PlayerActivePayloadBackend = z.infer<typeof playerActivePayloadBackendSchema>;

export const matchHistoryUpdateBackendPayloadSchema = z.discriminatedUnion("id", [
  z.object({ id: z.literal("bid"), data: bidPayloadBackendSchema }),
  z.object({ id: z.literal("healDice"), data: healDicePayloadBackendSchema }),
]);

export type MatchHistoryUpdateBackendPayload = z.infer<typeof matchHistoryUpdateBackendPayloadSchema>;

export const errorPayloadBackendSchema = z.object({
  message: z.string(),
  httpCode: z.number(),
  opCode: matchOpCodeSchema,
});
export type ErrorPayloadBackend = z.infer<typeof errorPayloadBackendSchema>;

export const updateHashChainFrontendSchema = z.object({
  seed: z.number(),
  hashChain: hashChainSchema,
});
export type UpdateHashChainFrontend = z.infer<typeof updateHashChainFrontendSchema>;
