import { StateCreator } from "zustand";
import { produce } from "immer";
import { Die, Player, MatchStage, PowerUpId } from "../types";

interface MatchSliceState {
  matchId?: string;
  faceValues?: Die[];
  matchStage: MatchStage;
  players: Record<string, Player>;
  playerOrder: string[];
  localPlayerId: string;
  matchUrl: string;
  activePlayerId: string;
}

interface MatchSliceFunctions {
  setMatchId: (match_id: string) => void;
  setFaceValues: (faceValues: Die[]) => void;
  setMatchStage: (matchStage: MatchStage) => void;
  setPlayers: (players: Record<string, Player>) => void;
  setPlayerPowerUps: (playerId: string, powerUpIds: PowerUpId[]) => void;
  setPlayerOrder: (playerOrder: string[]) => void;
  setInitialState: () => void;
  setMatchUrl: (matchUrl: string) => void;
  setLocalPlayerId: (localPlayerId: string) => void;
}
export type MatchSlice = MatchSliceState & MatchSliceFunctions;

const initialMatchState: MatchSliceState = {
  matchId: undefined,
  faceValues: undefined,
  matchStage: "lobbyStage",
  players: {},
  playerOrder: [],
  localPlayerId: "",
  matchUrl: "",
  activePlayerId: "",
};

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set) => ({
  ...initialMatchState,

  setMatchId: (matchId) => set(() => ({ matchId })),
  setFaceValues: (faceValues) => set(() => ({ faceValues })),
  setMatchStage: (matchStage) => set(() => ({ matchStage })),
  setPlayers: (players) => set(() => ({ players })),
  setPlayerPowerUps: (playerId, powerUpIds) =>
    set(
      produce((state) => {
        state.players[playerId].powerUpIds = powerUpIds;
      })
    ),
  setPlayerOrder: (playerOrder) => set(() => ({ playerOrder })),
  setLocalPlayerId: (localPlayerId) => set(() => ({ localPlayerId })),
  setMatchUrl: (matchUrl) => set(() => ({ matchUrl })),
  setInitialState: () => {
    set(() => ({ ...initialMatchState }));
  },
});
