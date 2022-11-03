import { StateCreator } from "zustand";
import { Die, Player, PowerUp, MatchStage } from "../types";

export interface MatchSlice {
  ticket?: string;
  matchId?: string;
  powerUps?: PowerUp[];
  faceValues?: Die[];
  matchStage: MatchStage;
  players: Record<string, Player>;

  setTicket: (ticket: string) => void;
  setMatchId: (match_id: string) => void;
  setFaceValues: (faceValues: Die[]) => void;
  setPowerUps: (powerUps: PowerUp[]) => void;
  setMatchStage: (matchStage: MatchStage) => void;
  setPlayers: (players: Record<string, Player>) => void;
}

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set) => ({
  ticket: undefined,
  matchId: undefined,
  powerUps: undefined,
  faceValues: undefined,
  matchStage: "getPowerUpStage",
  players: {},

  setTicket: (ticket) => set(() => ({ ticket })),
  setMatchId: (matchId) => set(() => ({ matchId })),
  setPowerUps: (powerUps) => set(() => ({ powerUps })),
  setFaceValues: (faceValues) => set(() => ({ faceValues })),
  setMatchStage: (matchStage) => set(() => ({ matchStage })),
  setPlayers: (players) => set(() => ({ players })),
});
