import { PowerUpType } from "./game";

// TODO: define and handle types with Zod
export interface MatchSettings {
  players: number;
  dicePerPlayer: number;
  powerUpsPerPlayer: number;
  availablePowerUps: PowerUpType[];
  isUsingFakeCredits: boolean;
}

export interface MatchMakerState {
  ticket?: string | undefined;
  matchId?: string | undefined;
  setTicket: (ticket: string) => void;
  setMatchId: (match_id: string) => void;
}
