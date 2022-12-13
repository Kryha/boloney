import { Session } from "@heroiclabs/nakama-js";
import { produce } from "immer";
import { StateCreator } from "zustand";

import { getLocalStorage } from "../service";
import { Die, MatchStage, PowerUpId, PlayerPublic, MatchSettings, Bid, TurnActionStep, TurnAction, Action } from "../types";

interface RoundState {
  hasRolledDice: boolean;
  diceValue?: Die[];
  bids: Record<string, Bid>;
  action?: TurnAction;
  turnActionStep: TurnActionStep;
}

export interface MatchSliceState extends RoundState {
  sessionState?: Session;
  matchId?: string;
  matchStage: MatchStage;
  players: Record<string, PlayerPublic>;
  playerOrder: string[];
  matchUrl: string;
  powerUpIds: PowerUpId[];
  matchSettings?: MatchSettings;
  leaderboard: PlayerPublic[];
  lastAction: Action;
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
  setHasRolledDice: (hasRolledDice: boolean) => void;
  setMatchState: (matchState: MatchSliceState) => void;
  loadLocalStorageToStore: () => void;
  setTurnActionStep: (turnActionStep: TurnActionStep) => void;
  setAction: (action: TurnAction) => void;
  setBids: (bids: Record<string, Bid>) => void;
  setLeaderboard: (players: PlayerPublic[]) => void;
  setLastAction: (move: Action) => void;
  resetRound: () => void;
}

export type MatchSlice = MatchSliceState & MatchSliceSetters;

const initialRoundState: RoundState = {
  hasRolledDice: false,
  diceValue: undefined,
  bids: {},
  action: undefined,
  turnActionStep: "pickAction",
};

const initialMatchState: MatchSliceState = {
  matchId: undefined,
  matchStage: "lobbyStage",
  players: {},
  playerOrder: [],
  matchUrl: "",
  powerUpIds: [],
  matchSettings: undefined,
  leaderboard: [],
  lastAction: "Boloney",
  ...initialRoundState,
};

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set) => ({
  ...initialMatchState,

  setSession: (session) => set(() => ({ sessionState: session })),
  setMatchId: (matchId) => set(() => ({ matchId })),
  setDiceValue: (diceValue) => set(() => ({ diceValue, hasRolledDice: true })),
  setMatchStage: (matchStage) => set(() => ({ matchStage })),
  setPlayers: (players) => set(() => ({ players })),
  setPlayerOrder: (playerOrder) => set(() => ({ playerOrder })),
  setMatchUrl: (matchUrl) => set(() => ({ matchUrl })),
  setInitialState: () => set(({ matchSettings }) => ({ ...initialMatchState, matchSettings: matchSettings })),
  setPowerUpIds: (powerUpIds) => set(() => ({ powerUpIds })),
  setActivePlayer: (playerId: string) => {
    set(
      produce((state: MatchSliceState) => {
        // Reset previous active player
        Object.keys(state.players).forEach((playerId) => (state.players[playerId].isActive = false));
        state.players[playerId].isActive = true;
      })
    );
  },
  setMatchSettings: (matchSettings) => set(() => ({ matchSettings })),
  setHasRolledDice: (hasRolledDice) => set(() => ({ hasRolledDice })),
  setMatchState: (matchState) => set(() => ({ ...matchState })),
  loadLocalStorageToStore: () => set(() => ({ ...getLocalStorage() })),
  setBids: (bids) => set(() => ({ bids })),
  resetRound: () =>
    set(
      produce((state: MatchSliceState) => {
        state.hasRolledDice = initialRoundState.hasRolledDice;
        state.diceValue = initialRoundState.diceValue;
        state.bids = initialRoundState.bids;
        state.action = initialRoundState.action;
        state.turnActionStep = initialRoundState.turnActionStep;

        Object.values(state.players).forEach((player) => {
          const playerRef = state.players[player.userId];

          playerRef.actionRole = undefined;
          playerRef.isTarget = false;
        });
      })
    ),
  setTurnActionStep: (turnActionStep) =>
    set(() => ({
      turnActionStep: turnActionStep,
    })),
  setAction: (action) =>
    set(() => ({
      action: action,
    })),
  setLeaderboard: (players) => set(() => ({ leaderboard: players })),
  setLastAction: (action) => set(() => ({ lastAction: action })),
});
