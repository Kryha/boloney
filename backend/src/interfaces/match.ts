import { PowerupType } from "./game";

// TODO: define and handle types with Zod
// TODO: use shared file for front- and backend since this is a copy of the one at frontend/src/interfaces/match-settings.ts
export interface LobbyState {
  matchSettings: MatchSettings;
  playerCount: number;
}
export interface MatchState {
  setting: MatchSettings;
  presences: nkruntime.Presence[];
  players: PlayerState[];
  playerCount: number;
  playerOrder: string[];
  matchStage: MatchStage;
  emptyTicks: number;
}

export interface PlayerState {
  presence: nkruntime.Presence;
  isReady: boolean;
}
export interface MatchSettings {
  requiredPlayers: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: PowerupType[];
  isUsingFakeCredits: boolean;
}

export enum RoundPhases {
  matchStart = 1,
  roundStart,
  turnStart,
  matchEnd,
}

export enum MatchStage {
  WaitingForPlayers = 1, // waiting for people to join the lobby
  WaitingForPlayersReady, // waiting for players to be ready
  roundPhase1, // Get powerups
  roundPhase2, // Roll the dice
  roundPhase3, // Players turn loop
  roundPhase4, // Round summery
  EndGame, // Match summery
}
export enum OpCode {
  getPowerups = 1,
}
