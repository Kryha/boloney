import { PowerupType } from "./game";

export enum MatchPhase {
  WaitingForPlayers,
  WaitingForPlayersReady,
  InProgress,
}

export interface PlayerState {
  presence: nkruntime.Presence;
  isReady: boolean;
}

export interface MatchSettings {
  requiredPlayerCount: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: PowerupType[];
  isUsingFakeCredits: boolean;
}

export interface MatchState {
  settings: MatchSettings;
  players: { [userId: string]: PlayerState };
  phase: MatchPhase;
  emptyTicks: number;
}
