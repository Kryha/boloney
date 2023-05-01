import { z } from "zod";
import { MAX_POWERUPS_PER_PLAYER } from "../constants";
import { bidPayloadBackendSchema } from "./bid";
import { dieSchema } from "./die";
import { historyEventsSchema } from "./history";
import { powerUpIdSchema, powerUpProbabilitySchema } from "./power-up";
import { hashChainSchema } from "./toolkit";
import { turnActionStepSchema } from "./ui";

export const avatarNameSchema = z.enum(["sausage", "hook", "plastic", "scooper", "hand", "lobster", "skeleton", "grave"]);
export type AvatarName = z.infer<typeof avatarNameSchema>;

// yellow, orange, pink, blue, purple, green, dark blue
export const avatarColorSchema = z.enum(["#FFC300", "#F96939", "#F975D8", "#B68fE3", "#92C9FF", "#91C342", "#5573F6"]);

export type AvatarColor = z.infer<typeof avatarColorSchema>;

export const avatarSchema = z.object({
  color: avatarColorSchema,
  name: avatarNameSchema,
});

export type Avatar = z.infer<typeof avatarSchema>;

export enum MatchOpCode {
  STAGE_TRANSITION = 1,
  PLAYER_READY = 2,
  ROLL_DICE = 3,
  FACE_VALUES = 4,
  LEAVE_MATCH = 5,
  PLAYER_JOINED = 6,
  PLAYER_ORDER_SHUFFLE = 7,
  PLAYER_GET_POWERUPS = 8,
  PLAYER_PLACE_BID = 9,
  PLAYER_CALL_EXACT = 10,
  PLAYER_CALL_BOLONEY = 11,
  PLAYER_ACTIVE = 12,
  STOP_LOADING = 13,
  ROUND_SUMMARY_TRANSITION = 14,
  ERROR = 15,
  PLAYER_LEFT = 16,
  PLAYER_LOST_BY_TIMEOUT = 17,
  USE_POWER_UP = 18,
  PLAYER_HEAL_DICE = 19,
  UPDATE_HASH_CHAIN = 20,
}
export const matchOpCodeSchema = z.nativeEnum(MatchOpCode);

export const playerStatusSchema = z.enum(["playing", "lost"]);
export type PlayerStatus = z.infer<typeof playerStatusSchema>;

// we need both optional and nullable because nakama
export const actionRoleSchema = z.enum(["winner", "loser", "timeOut"]).optional().nullable();
export type ActionRole = z.infer<typeof actionRoleSchema>;

export const actionSchema = z.enum(["Boloney", "Exact", "lostByTimeOut"]);
export type Action = z.infer<typeof actionSchema>;

export const playerPrivateSchema = z.object({
  diceValue: z.array(dieSchema).optional(),
  powerUpIds: z.optional(z.array(powerUpIdSchema)),
});
export type PlayerPrivate = z.infer<typeof playerPrivateSchema>;

export const playerPublicSchema = z.object({
  userId: z.string(),
  username: z.string(),
  avatarId: z.number(),
  diceAmount: z.number(),
  powerUpsAmount: z.number(),
  isConnected: z.boolean(),
  isReady: z.boolean(),
  isActive: z.boolean(),
  hasInitialPowerUps: z.boolean(),
  hasRolledDice: z.boolean(),
  status: playerStatusSchema,
  actionRole: actionRoleSchema,
  isTarget: z.boolean(),
  extraDice: z.number(),
  arePowerUpsDisabled: z.boolean(),
});

export type PlayerPublic = z.infer<typeof playerPublicSchema>;

export const playerRankedSchema = playerPublicSchema.extend({ lostAtRound: z.number() });
export type PlayerRanked = z.infer<typeof playerRankedSchema>;

export const playerSchema = playerPublicSchema.merge(playerPrivateSchema);
export type Player = z.infer<typeof playerSchema>;

export const playerRoundDataSchema = z.object({
  diceSum: z.number().optional(),
  extraDice: z.number().optional(),
  powerUps: z.array(powerUpIdSchema).optional(),
});
export type PlayerRoundData = z.infer<typeof playerRoundDataSchema>;

export const matchStageSchema = z.enum([
  "lobbyStage",
  "getPowerUpStage",
  "rollDiceStage",
  "playerTurnLoopStage",
  "roundSummaryStage",
  "endOfMatchStage",
]);

export type MatchStage = z.infer<typeof matchStageSchema>;

export const matchJoinMetadataSchema = z.object({
  username: z.string(),
  seed: z.number(),
  hashChain: hashChainSchema,
});
export type MatchJoinMetadata = z.infer<typeof matchJoinMetadataSchema>;

// TODO: in the future we may want to merge 'availablePowerUps' and 'powerUpProbability' into one single attribute
export const matchSettingsSchema = z.object({
  players: z.number(),
  dicePerPlayer: z.number(),
  initialPowerUpAmount: z.number(),
  maxPowerUpAmount: z.number().max(MAX_POWERUPS_PER_PLAYER),
  availablePowerUps: z.array(powerUpIdSchema),
  healPowerUpAmount: z.number(),
  stageNumberDivisor: z.number(),
  drawRoundOffset: z.number(),
  powerUpProbability: z.array(powerUpProbabilitySchema),
  zkEnabled: z.boolean(),
});
export type MatchSettings = z.infer<typeof matchSettingsSchema>;

export const matchStateSchema = z.object({
  players: z.record(playerPublicSchema),
  playerOrder: z.array(z.string()),
  matchStage: matchStageSchema,
  powerUpIds: z.array(powerUpIdSchema),
  matchSettings: matchSettingsSchema,
  leaderboard: z.array(playerRankedSchema),
  hasRolledDice: z.boolean(),
  diceValue: z.array(dieSchema),
  bids: bidPayloadBackendSchema,
  round: z.number(),
  stageNumber: z.number(),
  drawRoundCounter: z.number(),
  turnActionStep: turnActionStepSchema,
  lastAction: actionSchema,
  historyEvents: historyEventsSchema,
});

export type MatchState = z.infer<typeof matchStateSchema>;

export const matchFormSettingsSchema = z.object({
  players: z.number().or(z.string().transform((val) => Number(val))),
  dicePerPlayer: z.number().or(z.string().transform((val) => Number(val))),
  initialPowerUpAmount: z.number().or(z.string().transform((val) => Number(val))),
  maxPowerUpAmount: z
    .number()
    .max(MAX_POWERUPS_PER_PLAYER)
    .or(
      z
        .string()
        .max(MAX_POWERUPS_PER_PLAYER)
        .transform((val) => Number(val))
    ),
  availablePowerUps: z.array(powerUpIdSchema),
  healPowerUpAmount: z.number().or(z.string().transform((val) => Number(val))),
  stageNumberDivisor: z.number().or(z.string().transform((val) => Number(val))),
  drawRoundOffset: z.number().or(z.string().transform((val) => Number(val))),
  powerUpProbability: z.array(powerUpProbabilitySchema),
  zkEnabled: z.boolean(),
});

export type MatchFormSettings = z.infer<typeof matchFormSettingsSchema>;

export const playerIdSchema = z.string().length(36);

export type PlayerId = z.infer<typeof playerIdSchema>;

export const stageTimerSchema = z.object({
  startTime: z.number(),
  duration: z.number(),
});
export type StageTimer = z.infer<typeof stageTimerSchema>;
