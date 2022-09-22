import create from "zustand";
import { Socket } from "@heroiclabs/nakama-js";
import { GameConfig } from "../interfaces";

export interface MatchMakerState {
  query: GameConfig | string;
  minCount?: number;
  maxCount?: number;
  ticket?: any | undefined;
  setMinCount: (min: number) => void;
  setMaxCount: (max: number) => void;
  setTicket: (ticket: any) => void;
  setQuery: (socket: Socket) => void;
}

export const useMatchMakerState = create<MatchMakerState>()((set) => ({
  minCount: 2,
  maxCount: 7,
  query: "*",
  ticket: undefined,
  setMinCount: (min: number) => set(() => ({ minCount: min })),
  setMaxCount: (max: number) => set(() => ({ maxCount: max })),
  setTicket: (ticket: any) => set(() => ({ ticket: ticket })),
  setQuery: (query: GameConfig) => set(() => ({ query: query })),
}));
