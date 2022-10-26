import create from "zustand";

// TODO: is this store useful? can't these attributes be stored only in the url?

interface MatchMakerState {
  ticket?: string;
  matchId?: string;

  setTicket: (ticket: string) => void;
  setMatchId: (match_id: string) => void;
}

export const useMatchMakerState = create<MatchMakerState>()((set) => ({
  ticket: undefined,
  matchId: undefined,
  setTicket: (ticket: string) => set(() => ({ ticket })),
  setMatchId: (matchId: string) => set(() => ({ matchId })),
}));
