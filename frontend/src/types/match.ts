import { z } from "zod";

import { MAX_POWERUPS_PER_PLAYER } from "../constants";
import { powerUpTypeSchema, powerUpProbabilitySchema } from "./power-up";

export const avatarNameSchema = z.enum(["toy", "hook", "plastic", "scooper", "hand", "lobster", "skeleton"]);
export type AvatarName = z.infer<typeof avatarNameSchema>;

export const avatarColorSchema = z.enum(["#FFC300", "#FF8059", "#FFA7E9", "#989EFF", "#92C9FF", "#91C342", "#5573F6"]);
export type AvatarColor = z.infer<typeof avatarColorSchema>;

export const avatarSchema = z.object({
  color: avatarColorSchema,
  name: avatarNameSchema,
});

export type Avatar = z.infer<typeof avatarSchema>;

export const availableAvatarsSchema = z.array(avatarSchema);
export type AvailableAvatars = z.infer<typeof availableAvatarsSchema>;

// TODO: normalise match codes
// TODO: update type in backend
export enum MatchOpCode {
  STAGE_TRANSITION = 1,
  PLAYER_READY = 2,
  ROLL_DICE = 3,
  FACE_VALUES = 4,
  LEAVE_MATCH = 5,
  PLAYER_JOINED = 6,
}
export const matchOpCodeSchema = z.nativeEnum(MatchOpCode);

export const playerSchema = z.object({
  userId: z.string(),
  username: z.string(),
  avatarId: z.number(),
  isConnected: z.boolean(),
  isReady: z.boolean(),
});
export type Player = z.infer<typeof playerSchema>;

export const isPlayerArray = (players: unknown): players is Player[] => {
  if (!players) return false;
  if (!(players instanceof Array)) return false;

  const areValid = players.reduce((valid, player) => {
    const parsed = playerSchema.safeParse(player);
    return valid && parsed.success;
  }, true);

  return areValid;
};

export const isPlayerRecord = (players: unknown): players is Record<string, Player> => {
  if (!players) return false;
  if (typeof players !== "object") return false;

  const areValid = Object.values(players).reduce((valid, player) => {
    const parsed = playerSchema.safeParse(player);
    return valid && parsed.success;
  }, true);

  return areValid;
};
export const stageTransitionSchema = z.object({
  matchStage: z.string(),
});
export type StageTration = z.infer<typeof stageTransitionSchema>;

export const isStageTransition = (payload: unknown): payload is StageTration => {
  if (!payload) return false;
  if (typeof payload !== "object") return false;

  const parsed = stageTransitionSchema.safeParse(payload);
  return parsed.success;
};
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
  availablePowerUps: z.array(powerUpTypeSchema),
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
  availablePowerUps: z.array(powerUpTypeSchema),
  healPowerUpAmount: z.string().transform((val) => Number(val)),
  stageNumberDivisor: z.string().transform((val) => Number(val)),
  drawRoundOffset: z.string().transform((val) => Number(val)),
  powerUpProbability: z.array(powerUpProbabilitySchema),
});

export type MatchFormSettings = z.infer<typeof matchSettingsSchema>;

export type RoundStage =
  | "lobbyStage"
  | "getPowerUpStage"
  | "rollDiceStage"
  | "playerTurnLoopStage"
  | "roundSummaryStage"
  | "endOfMatchStage";
