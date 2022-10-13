import create from "zustand";
import { MatchMakerState } from "../interfaces";

export const useMatchMakerState = create<MatchMakerState>()((set) => ({
  ticket: undefined,
  matchId: undefined,
  setTicket: (ticket: string) => set(() => ({ ticket: ticket })),
  setMatchId: (match_id: string) => set(() => ({ matchId: match_id })),
}));
