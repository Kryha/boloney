import { PowerupType } from "./game";

// TODO: define and handle types with Zod
// TODO: use shared file for front- and backend since this is a copy of the one at frontend/src/interfaces/match-settings.ts
export interface MatchSettings {
  players: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: PowerupType[];
  isUsingFakeCredits: boolean;
}

// TODO: define and handle types with Zod
export interface MatchState extends MatchSettings {
  presences: object;
  emptyTicks: number;
}
