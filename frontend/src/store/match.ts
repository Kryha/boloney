import create from "zustand";
import { Die, MatchOpCode, PowerUp, RoundStage } from "../types";

interface MatchState {
  powerUps?: PowerUp[];
  faceValues?: Die[];
  roundStage: RoundStage;
  opCode: MatchOpCode;
  isMatchStageReady: boolean;

  setFaceValues: (faceValues: Die[]) => void;
  setPowerUps: (powerUps: PowerUp[]) => void;
  setRoundStage: (roundStage: RoundStage) => void;
  setOpCode: (opCode: MatchOpCode) => void;
  setIsMatchStageReady: (isMatchStageReady: boolean) => void;
}

export const useMatchState = create<MatchState>()((set) => ({
  powerUps: undefined,
  faceValues: undefined,
  roundStage: RoundStage.GET_POWERUP_STAGE,
  opCode: MatchOpCode.STAGE_TRANSITION,
  isMatchStageReady: false,

  setPowerUps: (powerUps: PowerUp[]) => set(() => ({ powerUps: powerUps })),
  setFaceValues: (faceValues: Die[]) => set(() => ({ faceValues: faceValues })),
  setRoundStage: (roundStage: RoundStage) => set(() => ({ roundStage: roundStage })),
  setOpCode: (opCode: MatchOpCode) => set(() => ({ opCode: opCode })),
  setIsMatchStageReady: (isMatchStageReady: boolean) => set(() => ({ isMatchStageReady: isMatchStageReady })),
}));
