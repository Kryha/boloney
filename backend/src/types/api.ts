import { PlayerPublic } from "./match";

export interface PlayerJoinedPayload {
  players: Record<string, PlayerPublic>;
  playerOrder: string[];
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
