import { produce } from "immer";
import { StateCreator } from "zustand";

import {
  Die,
  MatchStage,
  PowerUpId,
  PlayerPublic,
  MatchSettings,
  Bid,
  TurnActionStep,
  TurnAction,
  PlayerJoinedPayloadBackend,
  Action,
  PlayerRanked,
} from "../types";

interface RoundState {
  hasRolledDice: boolean;
  diceValue?: Die[];
  bids: Record<string, Bid>;
  action?: TurnAction;
  turnActionStep: TurnActionStep;
}

export interface MatchSliceState extends RoundState {
  isJoining: boolean;
  matchId?: string;
  matchStage: MatchStage;
  players: Record<string, PlayerPublic>;
  playerOrder: string[];
  powerUpIds: PowerUpId[];
  matchSettings?: MatchSettings;
  leaderboard: PlayerRanked[];
  lastAction: Action;
  round: number;
  channelId?: string;
}

interface MatchSliceSetters {
  setIsJoining: (isJoining: boolean) => void;
  setMatchId: (matchId: string) => void;
  setDiceValue: (diceValue: Die[]) => void;
  setMatchStage: (matchStage: MatchStage) => void;
  setPlayers: (players: Record<string, PlayerPublic>) => void;
  setPlayerOrder: (playerOrder: string[]) => void;
  setPowerUpIds: (ids: PowerUpId[]) => void;
  setActivePlayer: (playerId: string) => void;
  setHasRolledDice: (hasRolledDice: boolean) => void;
  setMatchState: (payload: PlayerJoinedPayloadBackend) => void;
  setTurnActionStep: (turnActionStep: TurnActionStep) => void;
  setAction: (action: TurnAction) => void;
  setBids: (bids: Record<string, Bid>) => void;
  setLeaderboard: (players: PlayerRanked[]) => void;
  setLastAction: (move: Action) => void;
  setChannelId: (channelId: string) => void;
  setRound: (round: number) => void;
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
  isJoining: false,
  matchStage: "lobbyStage",
  players: {},
  playerOrder: [],
  powerUpIds: [],
  matchSettings: undefined,
  leaderboard: [],
  lastAction: "Boloney",
  round: 1,
  ...initialRoundState,
};

export const createMatchSlice: StateCreator<MatchSlice, [], [], MatchSlice> = (set) => ({
  ...initialMatchState,

  setIsJoining: (isJoining) => set(() => ({ isJoining })),
  setMatchId: (matchId) => set(() => ({ matchId })),
  setDiceValue: (diceValue) => set(() => ({ diceValue, hasRolledDice: true })),
  setMatchStage: (matchStage) => set(() => ({ matchStage })),
  setPlayers: (players) => set(() => ({ players })),
  setPlayerOrder: (playerOrder) => set(() => ({ playerOrder })),
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
  setHasRolledDice: (hasRolledDice) => set(() => ({ hasRolledDice })),
  setMatchState: (payload) => set(() => ({ ...payload })),
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
  setRound: (round) => set(() => ({ round })),
  setLastAction: (action) => set(() => ({ lastAction: action })),
  setChannelId: (channelId) => set(() => ({ channelId })),
});
