import { StateCreator } from "zustand";
import { Die, Player, PowerUp, RoundStage } from "../types";

export interface MatchSlice {
  ticket?: string;
  matchId?: string;
  powerUps?: PowerUp[];
  faceValues?: Die[];
  roundStage: RoundStage;
  players: Record<string, Player>;

  setTicket: (ticket: string) => void;
  setMatchId: (match_id: string) => void;
  setFaceValues: (faceValues: Die[]) => void;
  setPowerUps: (powerUps: PowerUp[]) => void;
  setRoundStage: (roundStage: RoundStage) => void;
  setPlayers: (players: Record<string, Player>) => void;
}

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set) => ({
  ticket: undefined,
  matchId: undefined,
  powerUps: undefined,
  faceValues: undefined,
  roundStage: "getPowerUpStage",
  players: {},

  setTicket: (ticket) => set(() => ({ ticket })),
  setMatchId: (matchId) => set(() => ({ matchId })),
  setPowerUps: (powerUps) => set(() => ({ powerUps })),
  setFaceValues: (faceValues) => set(() => ({ faceValues })),
  setRoundStage: (roundStage) => set(() => ({ roundStage })),
  setPlayers: (players) => set(() => ({ players })),
});
