import { BidPayloadBackend } from "./bid";
import { Die } from "./die";
import { HistoryEvent } from "./history";
import { Action, MatchOpCode, MatchSettings, MatchStage, PlayerPublic, PlayerRanked, TurnActionStep } from "./match";
import { PowerUpId, isPowerUpTypeArray } from "./power-up";
import { isStringArray } from "./primitive";

export interface PlayerJoinedPayloadBackend {
  matchState: {
    players: Record<string, PlayerPublic>;
    playerOrder: string[];
    matchStage: MatchStage;
    powerUpIds: PowerUpId[];
    matchSettings: MatchSettings;
    leaderboard: PlayerRanked[];
    hasRolledDice: boolean;
    diceValue: Die[];
    bids: BidPayloadBackend;
    round: number;
    stageNumber: number;
    drawRoundCounter: number;
    turnActionStep: TurnActionStep;
    lastAction: Action;
    historyEvents: HistoryEvent[];
  };
  remainingStageTime: number;
}

export interface BoloneyPayloadBackend {
  players: Record<string, PlayerPublic>;
  diceValue: Record<string, Die[]>;
}

export interface ExactPayloadBackend {
  players: Record<string, PlayerPublic>;
  diceValue: Record<string, Die[]>;
}
export interface PlayerLostByTimeOutPayloadBackend {
  players: Record<string, PlayerPublic>;
  diceValue: Record<string, Die[]>;
}

export interface HealDicePayloadBackend {
  players: Record<string, PlayerPublic>;
}
export interface HealDicePayloadFrontend {
  selectedPowerUps: PowerUpId[];
}

export const isHealDicePayloadFrontend = (value: unknown): value is HealDicePayloadFrontend => {
  const assertedVal = value as HealDicePayloadFrontend;

  return isPowerUpTypeArray(assertedVal.selectedPowerUps);
};

export interface RoundSummaryTransitionPayloadBackend {
  players: Record<string, PlayerPublic>;
  leaderboard: PlayerRanked[];
  round: number;
  stageNumber: number;
  drawRoundCounter: number;
}

export interface PlayerLeftPayloadBackend {
  players: Record<string, PlayerPublic>;
  playerOrder: string[];
  playerLeftId: string;
  round: number;
  diceValue: Record<string, Die[]>;
}

export type PlayerGetPowerUpsPayloadBackend = PowerUpId[];

export interface StageTransitionPayloadBackend {
  matchStage: MatchStage;
  remainingStageTime?: number;
  round: number;
}

export type PlayerReadyPayloadBackend = Record<string, PlayerPublic>;

export interface PlayerOrderShufflePayloadBackend {
  playerOrder: string[];
}

export interface PlayerActivePayloadBackend {
  activePlayerId: string;
  remainingStageTime: number;
}

export interface ErrorPayloadBackend {
  opCode: MatchOpCode;
  httpCode: number;
  message: string;
}

export interface UpdateHashChainPayloadFrontend {
  seed: number;
  hashChain: string[];
}

export const isUpdateHashChainPayloadFrontend = (value: unknown): value is UpdateHashChainPayloadFrontend => {
  const assertedVal = value as UpdateHashChainPayloadFrontend;

  return assertedVal.hashChain !== undefined && isStringArray(assertedVal.hashChain);
};
