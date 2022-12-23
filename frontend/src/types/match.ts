import { z } from "zod";

import { MAX_POWERUPS_PER_PLAYER } from "../constants";
import { dieSchema } from "./die";
import { powerUpIdSchema, powerUpProbabilitySchema } from "./power-up";

export const avatarNameSchema = z.enum(["sausage", "hook", "plastic", "scooper", "hand", "lobster", "skeleton"]);
export type AvatarName = z.infer<typeof avatarNameSchema>;

export const avatarColorSchema = z.enum(["#FFC300", "#F96939", "#F975D8", "#BD8DE9", "#92C9FF", "#91C342", "#5573F6"]);
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
  PLAYER_UPDATE = 14,
  LEADERBOARD_UPDATE = 15,
  ERROR = 16, // TODO: receive as a notification
  PLAYER_LEFT = 17,
  DEBUG_INFO = 99,
}
export const matchOpCodeSchema = z.nativeEnum(MatchOpCode);

export const playerStatusSchema = z.enum(["playing", "lost"]);
export type PlayerStatus = z.infer<typeof playerStatusSchema>;

// we need both optional and nullable because nakama
export const actionRoleSchema = z.enum(["winner", "loser"]).optional().nullable();
export type ActionRole = z.infer<typeof actionRoleSchema>;

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
});

export type PlayerPublic = z.infer<typeof playerPublicSchema>;

export const playerRankedSchema = playerPublicSchema.extend({ lostAtRound: z.number() });
export type PlayerRanked = z.infer<typeof playerRankedSchema>;

export const playerSchema = playerPublicSchema.merge(playerPrivateSchema);
export type Player = z.infer<typeof playerSchema>;

export const matchStageSchema = z.enum([
  "lobbyStage",
  "getPowerUpStage",
  "rollDiceStage",
  "playerTurnLoopStage",
  "roundSummaryStage",
  "endOfMatchStage",
]);

export type MatchStage = z.infer<typeof matchStageSchema>;

export const stageTransitionSchema = z.object({
  matchStage: matchStageSchema,
});

export type StageTration = z.infer<typeof stageTransitionSchema>;

export const playerOrderSchema = z.object({
  playerOrder: z.array(z.string()),
});

export type PlayerOrder = z.infer<typeof playerOrderSchema>;

export const matchJoinMetadataSchema = z.object({
  username: z.string(),
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
});
export type MatchSettings = z.infer<typeof matchSettingsSchema>;

export const matchFormSettingsSchema = z.object({
  players: z.string().transform((val) => Number(val)),
  dicePerPlayer: z.string().transform((val) => Number(val)),
  initialPowerUpAmount: z.string().transform((val) => Number(val)),
  maxPowerUpAmount: z
    .string()
    .max(MAX_POWERUPS_PER_PLAYER)
    .transform((val) => Number(val)),
  availablePowerUps: z.array(powerUpIdSchema),
  healPowerUpAmount: z.string().transform((val) => Number(val)),
  stageNumberDivisor: z.string().transform((val) => Number(val)),
  drawRoundOffset: z.string().transform((val) => Number(val)),
  powerUpProbability: z.array(powerUpProbabilitySchema),
});

export type MatchFormSettings = z.infer<typeof matchSettingsSchema>;

export const playerIdSchema = z.string().length(36);

export type PlayerId = z.infer<typeof playerIdSchema>;

export const playerActivePayloadSchema = z.object({
  activePlayerId: playerIdSchema,
});

export const actionSchema = z.enum(["Boloney", "Exact"]);
export type Action = z.infer<typeof actionSchema>;
