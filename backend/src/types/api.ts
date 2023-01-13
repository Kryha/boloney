import { BidPayloadBackend } from "./bid";
import { Die } from "./die";
import { MatchSettings, MatchStage, PlayerPublic, PlayerRanked } from "./match";
import { PowerUpId } from "./power-up";

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
  };
  remainingStageTime: number;
}

export interface BoloneyPayloadBackend {
  players: Record<string, PlayerPublic>;
}

export interface ExactPayloadBackend {
  players: Record<string, PlayerPublic>;
}

export interface PlayerUpdatePayloadBackend {
  players: Record<string, PlayerPublic>;
}

export interface PlayerLostByTimeOut {
  players: Record<string, PlayerPublic>;
}

export interface LeaderboardUpdatePayloadBackend {
  leaderboard: PlayerRanked[];
  round: number;
}

export interface PlayerLeftPayloadBackend {
  players: Record<string, PlayerPublic>;
  playerOrder: string[];
  stage: MatchStage;
  leaderboard?: PlayerPublic[];
}
