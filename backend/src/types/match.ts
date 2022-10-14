export interface Player {
  id: string;
  name: string;
  color: string;
  avatarName: string;
  connected: boolean;
}

export type PowerupType = "p1" | "p2" | "p3" | "p4";

export interface Die {
  rolledValue: number;
}

export interface MatchSettings {
  players: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: PowerupType[];
  isUsingFakeCredits: boolean;
}

export interface MatchState extends MatchSettings {
  presences: object;
  emptyTicks: number;
}

// TODO: define predicates and parsers
