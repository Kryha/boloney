import { StateCreator } from "zustand";
import { produce } from "immer";

import { Die, Player, MatchStage, PowerUpId } from "../types";

interface MatchSliceState {
  matchId?: string;
  diceValue?: Die[];
  matchStage: MatchStage;
  players: Record<string, Player>;
  playerOrder: string[];
  matchUrl: string;

  // flags
  hasRolledDice: boolean;
}

interface MatchSliceGetters {
  getOrderedPlayers: () => Player[];
  getPlayer: (id?: string) => Player | undefined;
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
}

export type MatchSlice = MatchSliceState & MatchSliceGetters & MatchSliceFunctions;

const initialFlags = {
  hasRolledDice: false,
};

const initialMatchState: MatchSliceState = {
  matchId: undefined,
  diceValue: undefined,
  matchStage: "lobbyStage",
  players: {},
  playerOrder: [],
  matchUrl: "",
  ...initialFlags,
};

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set, get) => ({
  ...initialMatchState,

  getOrderedPlayers: () => get().playerOrder.map((playerId) => get().players[playerId]),
  getPlayer: (id) => (id ? get().players[id] : undefined),

  setMatchId: (matchId) => set(() => ({ matchId })),
  setDiceValue: (diceValue) => set(() => ({ diceValue, hasRolledDice: true })),
  setMatchStage: (matchStage) => set(() => ({ matchStage, ...initialFlags })),
  setPlayers: (players) => set(() => ({ players })),
  setPlayerPowerUps: (playerId, powerUpIds) =>
    set(
      produce((state) => {
        state.players[playerId].powerUpIds = powerUpIds;
      })
    ),
  setPlayerOrder: (playerOrder) => set(() => ({ playerOrder })),
  setMatchUrl: (matchUrl) => set(() => ({ matchUrl })),
  setInitialState: () => set(() => ({ ...initialMatchState })),
});
