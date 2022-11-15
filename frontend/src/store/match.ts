import { StateCreator } from "zustand";

import { Die, MatchStage, PowerUpId, PlayerPublic } from "../types";

interface MatchSliceState {
  matchId?: string;
  diceValue?: Die[];
  matchStage: MatchStage;
  players: Record<string, PlayerPublic>;
  playerOrder: string[];
  matchUrl: string;
  powerUpIds: PowerUpId[];

  // flags
  hasRolledDice: boolean;
}

interface MatchSliceGetters {
  getOrderedPlayers: () => PlayerPublic[];
  getPlayer: (id?: string) => PlayerPublic | undefined;
  getRemotePlayers: (localPlayerId?: string) => PlayerPublic[];
}

interface MatchSliceFunctions {
  setMatchId: (match_id: string) => void;
  setDiceValue: (diceValue: Die[]) => void;
  setMatchStage: (matchStage: MatchStage) => void;
  setPlayers: (players: Record<string, PlayerPublic>) => void;
  setPlayerOrder: (playerOrder: string[]) => void;
  setInitialState: () => void;
  setMatchUrl: (matchUrl: string) => void;
  setPowerUpIds: (ids: PowerUpId[]) => void;
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
  powerUpIds: [],
  ...initialFlags,
};

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set, get) => ({
  ...initialMatchState,

  getOrderedPlayers: () => get().playerOrder.map((playerId) => get().players[playerId]),
  getPlayer: (id) => (id ? get().players[id] : undefined),
  getRemotePlayers: (id) =>
    get()
      .getOrderedPlayers()
      .filter((player) => player.userId !== id),

  setMatchId: (matchId) => set(() => ({ matchId })),
  setDiceValue: (diceValue) => set(() => ({ diceValue, hasRolledDice: true })),
  setMatchStage: (matchStage) => set(() => ({ matchStage, ...initialFlags })),
  setPlayers: (players) => set(() => ({ players })),
  setPlayerOrder: (playerOrder) => set(() => ({ playerOrder })),
  setMatchUrl: (matchUrl) => set(() => ({ matchUrl })),
  setInitialState: () => set(() => ({ ...initialMatchState })),
  setPowerUpIds: (powerUpIds) => set(() => ({ powerUpIds })),
});
