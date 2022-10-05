import { PowerupType } from "./game";

export interface MatchSettings {
  players: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: PowerupType[];
  isPrivate: boolean;
  isUsingFakeCredits: boolean;
}
