import { PlayerPublic } from "./match";

export interface PlayerJoinedPayload {
  players: Record<string, PlayerPublic>;
  playerOrder: string[];
}
