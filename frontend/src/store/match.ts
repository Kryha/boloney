import { Session } from "@heroiclabs/nakama-js";
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

interface MatchSliceGetters {
  getOrderedPlayers: () => PlayerPublic[];
  getPlayer: (id?: string) => PlayerPublic | undefined;
  getLocalPlayer: () => PlayerPublic | undefined;
  getRemotePlayers: () => PlayerPublic[];
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
  setMatchSettings: (matchSettings: MatchSettings) => void;
}

export type MatchSlice = MatchSliceState & MatchSliceGetters & MatchSliceSetters;

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

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set, get) => ({
  ...initialMatchState,

  getOrderedPlayers: () => {
    const session = get().sessionState;
    const players = get().players;
    const order = [...get().playerOrder];

    const playersValues = Object.values(players);

    if (!session || !session.user_id || order.length !== playersValues.length) return playersValues;

    const localPlayerIndex = order.indexOf(session.user_id);

    if (localPlayerIndex !== 0) {
      const topPart = order.splice(localPlayerIndex, get().playerOrder.length - 1);
      const bottomPart = order.splice(0, localPlayerIndex);
      const newPlayerArray = topPart.concat(bottomPart);
      return newPlayerArray.map((playerId) => players[playerId]);
    }
    return get().playerOrder.map((playerId) => players[playerId]);
  },

  getPlayer: (id) => (id ? get().players[id] : undefined),

  getLocalPlayer: () => {
    const session = get().sessionState;
    if (!session || !session.user_id) return;
    return get().players[session.user_id];
  },

  getRemotePlayers: () => {
    const orderedPlayers = get().getOrderedPlayers();
    const session = get().sessionState;
    if (!session || !session.user_id) return orderedPlayers;
    return orderedPlayers.filter((player) => player.userId !== session.user_id);
  },

  setSession: (session: Session) => set(() => ({ sessionState: session })),
  setMatchId: (matchId) => set(() => ({ matchId })),
  setDiceValue: (diceValue) => set(() => ({ diceValue, hasRolledDice: true })),
  setMatchStage: (matchStage) => set(() => ({ matchStage, ...initialFlags })),
  setPlayers: (players) => set(() => ({ players })),
  setPlayerOrder: (playerOrder) => set(() => ({ playerOrder })),
  setMatchUrl: (matchUrl) => set(() => ({ matchUrl })),
  setInitialState: () => set(() => ({ ...initialMatchState })),
  setPowerUpIds: (powerUpIds) => set(() => ({ powerUpIds })),
  setMatchSettings: (matchSettings: MatchSettings) => set(() => ({ matchSettings })),
});
