import { z } from "zod";

import { powerUpTypeSchema } from "./power-up";

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  avatarName: z.string(),
  connected: z.boolean(),
});

export type Player = z.infer<typeof playerSchema>;

export const matchSettingsSchema = z.object({
  players: z.number(),
  dicePerPlayer: z.number(),
  powerupsPerPlayer: z.number(),
  availablePowerups: z.array(powerUpTypeSchema),
  isUsingFakeCredits: z.boolean(),
});

export type MatchSettings = z.infer<typeof matchSettingsSchema>;

export const enum RoundStage {
  LOBBY_STAGE = "LobbyStage",
  GET_POWERUP_STAGE = "GetPowerUpStage",
  ROLL_DICE_STAGE = "RollDiceStage",
  PLAYER_TURN_STAGE = "PlayerTurnLoopStage",
  ROUND_SUMMARY_STAGE = "RoundSummaryStage",
  END_OF_MATCH_STAGE = "EndOfMatchStage",
}

export const enum MatchOpCode {
  STAGE_TRANSITION = 1,
  PLAYER_READY = 2,
  ROLL_DICE = 3,
  FACE_VALUES = 4,
  LEAVE_MATCH = 5,
}
