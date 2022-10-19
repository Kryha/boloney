import create from "zustand";
import { Die } from "../types";

// update power ups types
interface MatchState {
  powerUps?: string[] | undefined;
  diceRollsAmount: Die[] | undefined;
  roundPhase: number;

  setDiceRollsAmount: (diceRollsAmount: Die[]) => void;
  setPowerUpIds: (powerUpIds: string[]) => void;
  setRoundPhase: (roundPhase: number) => void;
}

export const useMatchState = create<MatchState>()((set) => ({
  powerUps: undefined,
  diceRollsAmount: undefined,
  roundPhase: 0,

  setPowerUpIds: (powerUpIds: string[]) => set(() => ({ powerUps: powerUpIds })),
  setDiceRollsAmount: (diceRollsAmount: Die[]) => set(() => ({ diceRollsAmount: diceRollsAmount })),
  setRoundPhase: (roundPhase: number) => set(() => ({ roundPhase: roundPhase })),
}));
