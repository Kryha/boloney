import { BidPayloadBackend } from "./bid";
import { Die } from "./die";
import { MatchSettings, MatchStage, PlayerPublic } from "./match";
import { PowerUpId } from "./power-up";

export interface PlayerJoinedPayloadBackend {
  players: Record<string, PlayerPublic>;
  playerOrder: string[];
  matchStage: MatchStage;
  powerUpIds: PowerUpId[];
  matchSettings: MatchSettings;
  leaderboard: PlayerPublic[];
  hasRolledDice: boolean;
  diceValue: Die[];
  bids: BidPayloadBackend;
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

export interface LeaderboardUpdatePayloadBackend {
  leaderboard: PlayerPublic[];
}
