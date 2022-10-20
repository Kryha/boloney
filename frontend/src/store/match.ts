import create from "zustand";
import { Die } from "../types";

// TODO: define on backend as well
// TODO: use opcodes
type RoundPhase = 0 | 1 | 2 | 3 | 4;

// update power ups types
interface MatchState {
  powerUps?: string[];
  diceRollsAmount?: Die[];
  roundPhase: RoundPhase;

  setDiceRollsAmount: (diceRollsAmount: Die[]) => void;
  setPowerUpIds: (powerUpIds: string[]) => void;
  setRoundPhase: (roundPhase: RoundPhase) => void;
}

export const useMatchState = create<MatchState>()((set) => ({
  powerUps: undefined,
  diceRollsAmount: undefined,
  roundPhase: 0,

  setPowerUpIds: (powerUpIds: string[]) => set(() => ({ powerUps: powerUpIds })),
  setDiceRollsAmount: (diceRollsAmount: Die[]) => set(() => ({ diceRollsAmount: diceRollsAmount })),
  setRoundPhase: (roundPhase: RoundPhase) => set(() => ({ roundPhase: roundPhase })),
}));
