import { Session } from "@heroiclabs/nakama-js";
import { produce } from "immer";
import { StateCreator } from "zustand";

import { Die, MatchStage, PowerUpId, PlayerPublic, MatchSettings } from "../types";

interface MatchSliceState {
  sessionState?: Session;
  matchId?: string;
  diceValue?: Die[];
  matchStage: MatchStage;
  players: Record<string, PlayerPublic>;
  playerOrder: string[];
  matchUrl: string;
  powerUpIds: PowerUpId[];
  matchSettings?: MatchSettings;
  // flags
  hasRolledDice: boolean;
}

interface MatchSliceSetters {
  setSession: (session: Session) => void;
  setMatchId: (match_id: string) => void;
  setDiceValue: (diceValue: Die[]) => void;
  setMatchStage: (matchStage: MatchStage) => void;
  setPlayers: (players: Record<string, PlayerPublic>) => void;
  setPlayerOrder: (playerOrder: string[]) => void;
  setInitialState: () => void;
  setMatchUrl: (matchUrl: string) => void;
  setPowerUpIds: (ids: PowerUpId[]) => void;
  setActivePlayer: (playerId: string) => void;
  setMatchSettings: (matchSettings: MatchSettings) => void;
}

export type MatchSlice = MatchSliceState & MatchSliceSetters;

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
  matchSettings: undefined,
  ...initialFlags,
};

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set) => ({
  ...initialMatchState,

  setSession: (session: Session) => set(() => ({ sessionState: session })),
  setMatchId: (matchId) => set(() => ({ matchId })),
  setDiceValue: (diceValue) => set(() => ({ diceValue, hasRolledDice: true })),
  setMatchStage: (matchStage) => set(() => ({ matchStage, ...initialFlags })),
  setPlayers: (players) => set(() => ({ players })),
  setPlayerOrder: (playerOrder) => set(() => ({ playerOrder })),
  setMatchUrl: (matchUrl) => set(() => ({ matchUrl })),
  setInitialState: () => set(({ matchSettings }) => ({ ...initialMatchState, matchSettings: matchSettings })),
  setPowerUpIds: (powerUpIds) => set(() => ({ powerUpIds })),
  setActivePlayer: (playerId: string) => {
    set(
      produce((state: MatchSlice) => {
        // Reset previous active player
        Object.keys(state.players).forEach((playerId) => (state.players[playerId].isActive = false));
        state.players[playerId].isActive = true;
      })
    );
  },
  setMatchSettings: (matchSettings: MatchSettings) => set(() => ({ matchSettings })),
});
