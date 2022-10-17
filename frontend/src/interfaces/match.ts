import { PowerupType } from "./game";

// TODO: define and handle types with Zod
export interface MatchSettings {
  requiredPlayerCount: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: PowerupType[];
  isUsingFakeCredits: boolean;
}

export interface MatchMakerState {
  ticket?: string | undefined;
  matchId?: string | undefined;
  setTicket: (ticket: string) => void;
  setMatchId: (match_id: string) => void;
}
