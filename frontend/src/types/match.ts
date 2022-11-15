import { z } from "zod";

import { MAX_POWERUPS_PER_PLAYER } from "../constants";
import { dieSchema } from "./die";
import { powerUpIdSchema, powerUpProbabilitySchema } from "./power-up";

export const avatarNameSchema = z.enum(["toy", "hook", "plastic", "scooper", "hand", "lobster", "skeleton"]);
export type AvatarName = z.infer<typeof avatarNameSchema>;

export const avatarColorSchema = z.enum(["#FFC300", "#FF8059", "#FFA7E9", "#989EFF", "#92C9FF", "#91C342", "#5573F6"]);
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
}
export const matchOpCodeSchema = z.nativeEnum(MatchOpCode);

export const playerPrivateSchema = z.object({
  diceValue: z.array(dieSchema),
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
  hasInitialPowerUps: z.boolean(),
  hasRolledDice: z.boolean(),
});

export type PlayerPublic = z.infer<typeof playerPublicSchema>;

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
