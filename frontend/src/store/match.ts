import { StateCreator } from "zustand";
import { produce } from "immer";
import { Die, Player, MatchStage, PowerUpId } from "../types";

interface MatchSliceState {
  matchId?: string;
  diceValue?: Die[];
  matchStage: MatchStage;
  players: Record<string, Player>;
  playerOrder: string[];
  localPlayerId: string;
  matchUrl: string;
}

interface MatchSliceFunctions {
  setMatchId: (match_id: string) => void;
  setDiceValue: (diceValue: Die[]) => void;
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
  diceValue: undefined,
  matchStage: "lobbyStage",
  players: {},
  playerOrder: [],
  localPlayerId: "",
  matchUrl: "",
};

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set) => ({
  ...initialMatchState,

  setMatchId: (matchId) => set(() => ({ matchId })),
  setDiceValue: (diceValue) => set(() => ({ diceValue })),
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
