import { StateCreator } from "zustand";
import { Die, Player, PowerUp, MatchStage } from "../types";

interface MatchSliceState {
  matchId?: string;
  powerUps?: PowerUp[];
  faceValues?: Die[];
  matchStage: MatchStage;
  players: Record<string, Player>;
  playerOrder: string[];
  localPlayerId: string;
  matchUrl: string;
}

interface MatchSliceFunctions {
  setMatchId: (match_id: string) => void;
  setFaceValues: (faceValues: Die[]) => void;
  setPowerUps: (powerUps: PowerUp[]) => void;
  setMatchStage: (matchStage: MatchStage) => void;
  setPlayers: (players: Record<string, Player>) => void;
  setPlayerOrder: (playerOrder: string[]) => void;
  setInitialState: () => void;
  setMatchUrl: (matchUrl: string) => void;
  setLocalPlayerId: (localPlayerId: string) => void;
}
export interface MatchSlice extends MatchSliceState, MatchSliceFunctions {}

const initialMatchState: MatchSliceState = {
  matchId: undefined,
  powerUps: undefined,
  faceValues: undefined,
  matchStage: "lobbyStage",
  players: {},
  playerOrder: [],
  localPlayerId: "",
  matchUrl: "",
};

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set) => ({
  ...initialMatchState,

  setMatchId: (matchId) => set(() => ({ matchId })),
  setPowerUps: (powerUps) => set(() => ({ powerUps })),
  setFaceValues: (faceValues) => set(() => ({ faceValues })),
  setMatchStage: (matchStage) => set(() => ({ matchStage })),
  setPlayers: (players) => set(() => ({ players })),
  setPlayerOrder: (playerOrder) => set(() => ({ playerOrder })),
  setLocalPlayerId: (localPlayerId) => set(() => ({ localPlayerId })),
  setMatchUrl: (matchUrl) => set(() => ({ matchUrl })),
  setInitialState: () => {
    set(() => ({ ...initialMatchState }));
  },
});
