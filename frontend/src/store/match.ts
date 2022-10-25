import create from "zustand";
import { Die, PowerUp, RoundStage } from "../types";

interface MatchState {
  powerUps?: PowerUp[];
  faceValues?: Die[];
  roundStage: RoundStage;
  // TODO: see if other players need to be tracked

  setFaceValues: (faceValues: Die[]) => void;
  setPowerUps: (powerUps: PowerUp[]) => void;
  setRoundStage: (roundStage: RoundStage) => void;
}

export const useMatchState = create<MatchState>()((set) => ({
  powerUps: undefined,
  faceValues: undefined,
  roundStage: "getPowerUpStage",

  setPowerUps: (powerUps: PowerUp[]) => set(() => ({ powerUps: powerUps })),
  setFaceValues: (faceValues: Die[]) => set(() => ({ faceValues: faceValues })),
  setRoundStage: (roundStage: RoundStage) => set(() => ({ roundStage: roundStage })),
}));
