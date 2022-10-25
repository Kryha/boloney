import create from "zustand";
import { Die, MatchOpCode, RoundStage } from "../types";

interface MatchState {
  powerUps?: string[];
  diceRollsAmount?: Die[];
  roundStage: RoundStage;
  opCode: MatchOpCode;

  setDiceRollsAmount: (diceRollsAmount: Die[]) => void;
  setPowerUpIds: (powerUpIds: string[]) => void;
  setRoundStage: (roundStage: RoundStage) => void;
  setOpCode: (opCode: MatchOpCode) => void;
}

export const useMatchState = create<MatchState>()((set) => ({
  powerUps: undefined,
  diceRollsAmount: undefined,
  roundStage: RoundStage.GET_POWERUP_STAGE,
  opCode: MatchOpCode.STAGE_TRANSITION,

  setPowerUpIds: (powerUpIds: string[]) => set(() => ({ powerUps: powerUpIds })),
  setDiceRollsAmount: (diceRollsAmount: Die[]) => set(() => ({ diceRollsAmount: diceRollsAmount })),
  setRoundStage: (roundStage: RoundStage) => set(() => ({ roundStage: roundStage })),
  setOpCode: (opCode: MatchOpCode) => set(() => ({ opCode: opCode })),
}));
