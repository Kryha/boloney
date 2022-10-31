import { StateCreator } from "zustand";
import { Die, PowerUp, RoundStage } from "../types";

export interface MatchSlice {
  ticket?: string;
  matchId?: string;
  powerUps?: PowerUp[];
  faceValues?: Die[];
  roundStage: RoundStage;
  // TODO: see if other players need to be tracked

  setTicket: (ticket: string) => void;
  setMatchId: (match_id: string) => void;
  setFaceValues: (faceValues: Die[]) => void;
  setPowerUps: (powerUps: PowerUp[]) => void;
  setRoundStage: (roundStage: RoundStage) => void;
}

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set) => ({
  ticket: undefined,
  matchId: undefined,
  powerUps: undefined,
  faceValues: undefined,
  roundStage: "getPowerUpStage",

  setTicket: (ticket: string) => set(() => ({ ticket: ticket })),
  setMatchId: (match_id: string) => set(() => ({ matchId: match_id })),
  setPowerUps: (powerUps: PowerUp[]) => set(() => ({ powerUps: powerUps })),
  setFaceValues: (faceValues: Die[]) => set(() => ({ faceValues: faceValues })),
  setRoundStage: (roundStage: RoundStage) => set(() => ({ roundStage: roundStage })),
});
