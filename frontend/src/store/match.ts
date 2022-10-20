import create from "zustand";
import { Die } from "../types";

// TODO: define on backend as well
type RoundPhase = "getPowerUps" | "rollDice";

// update power ups types
interface MatchState {
  powerUps?: string[];
  diceRollsAmount?: Die[];
  roundPhase: RoundPhase;

  setDiceRollsAmount: (diceRollsAmount: Die[]) => void;
  setPowerUpIds: (powerUpIds: string[]) => void;
  setRoundPhase: (roundPhase: number) => void;
}

export const useMatchState = create<MatchState>()((set) => ({
  powerUps: undefined,
  diceRollsAmount: undefined,
  roundPhase: "getPowerUps",

  setPowerUpIds: (powerUpIds: string[]) => set(() => ({ powerUps: powerUpIds })),
  setDiceRollsAmount: (diceRollsAmount: Die[]) => set(() => ({ diceRollsAmount: diceRollsAmount })),
  setRoundPhase: (roundPhase: number) => set(() => ({ roundPhase: roundPhase })),
}));
