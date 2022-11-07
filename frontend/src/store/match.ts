import { StateCreator } from "zustand";
import { Die, Player, PowerUp, MatchStage } from "../types";

export interface MatchSlice {
  matchId?: string;
  powerUps?: PowerUp[];
  faceValues?: Die[];
  matchStage: MatchStage;
  players: Record<string, Player>;
  playerOrder: string[];

  setMatchId: (match_id: string) => void;
  setFaceValues: (faceValues: Die[]) => void;
  setPowerUps: (powerUps: PowerUp[]) => void;
  setMatchStage: (matchStage: MatchStage) => void;
  setPlayers: (players: Record<string, Player>) => void;
  setPlayerOrder: (playerOrder: string[]) => void;
  setInitialState: () => void;
}

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set) => ({
  matchId: undefined,
  powerUps: undefined,
  faceValues: undefined,
  matchStage: "lobbyStage",
  players: {},
  playerOrder: [],

  setMatchId: (matchId) => set(() => ({ matchId })),
  setPowerUps: (powerUps) => set(() => ({ powerUps })),
  setFaceValues: (faceValues) => set(() => ({ faceValues })),
  setMatchStage: (matchStage) => set(() => ({ matchStage })),
  setPlayers: (players) => set(() => ({ players })),
  setPlayerOrder: (playerOrder) => set(() => ({ playerOrder })),
  setInitialState: () => {
    set(() => ({
      matchId: undefined,
      powerUps: undefined,
      faceValues: undefined,
      matchStage: "lobbyStage",
      players: {},
      playerOrder: [],
    }));
  },
});
