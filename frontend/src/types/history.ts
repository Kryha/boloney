import { z } from "zod";
import { bidWithUserIdSchema } from "./bid";
import { powerUpIdSchema } from "./power-up";

export const historyBidActionPayloadBackendSchema = bidWithUserIdSchema.merge(z.object({ eventType: z.literal("bidAction") }));

export type HistoryBidAction = z.infer<typeof historyBidActionPayloadBackendSchema>;

export const historyPlayerActionPayloadBackendSchema = z.object({
  eventType: z.literal("playerAction"),
  activePlayerName: z.string(),
  outcome: z.string().optional(),
  targetPlayerName: z.string().optional(),
  actionName: powerUpIdSchema.or(z.literal("healDice")),
  createdAt: z.number(),
});

export type HistoryPlayerAction = z.infer<typeof historyPlayerActionPayloadBackendSchema>;

export const historyPlayerStatsPayloadBackendSchema = z.object({
  userId: z.string(),
  diceAmount: z.number(),
  powerUpsAmount: z.number(),
});

export type HistoryPlayerStats = z.infer<typeof historyPlayerStatsPayloadBackendSchema>;

export const historyRoundStartPayloadBackendSchema = z.object({
  eventType: z.literal("roundStart"),
  roundNumber: z.number(),
  totalDiceAmount: z.number(),
  stageNumber: z.number(),
  roundsUntillDrawRound: z.number(),
});

export type HistoryRoundStart = z.infer<typeof historyRoundStartPayloadBackendSchema>;

export const historyRoundEndPayloadBackendSchema = z.object({
  roundNumber: z.number(),
  actionName: z.string(),
  createdAt: z.number(),
});

export type HistoryRoundEnd = z.infer<typeof historyRoundEndPayloadBackendSchema>;

export const historyRoundPlayerPayloadBackendSchema = z.object({
  playerStats: historyPlayerStatsPayloadBackendSchema,
  isWinner: z.boolean(),
});

export type HistoryRoundPlayer = z.infer<typeof historyRoundPlayerPayloadBackendSchema>;

export const historyRoundResultsSchema = z.object({
  eventType: z.literal("roundResults"),
  roundEnd: historyRoundEndPayloadBackendSchema,
  roundWinner: historyRoundPlayerPayloadBackendSchema.optional(),
  roundLoser: historyRoundPlayerPayloadBackendSchema.optional(),
  roundStats: z.array(historyPlayerStatsPayloadBackendSchema),
});

export type HistoryRoundResults = z.infer<typeof historyRoundResultsSchema>;

export const historyEventSchema = z.union([
  historyRoundStartPayloadBackendSchema,
  historyBidActionPayloadBackendSchema,
  historyPlayerActionPayloadBackendSchema,
  historyRoundResultsSchema,
]);

export type HistoryEvent = z.infer<typeof historyEventSchema>;

export const historyEventsSchema = z.array(historyEventSchema);
