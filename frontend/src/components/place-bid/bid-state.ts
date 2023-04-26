import { create } from "zustand";

export interface PlaceBidState {
  diceAmount?: number;
  faceValue?: number;

  setFaceValue: (faceValue?: number) => void;
  setDiceAmount: (diceAmount: number) => void;
  resetBidState: () => void;
}

export const usePlaceBidFormState = create<PlaceBidState>((set) => ({
  faceValue: undefined,
  diceAmount: undefined,

  setDiceAmount: (amount) => set(() => ({ diceAmount: amount })),
  setFaceValue: (face) => set(() => ({ faceValue: face })),
  resetBidState: () => set(() => ({ faceValue: undefined, dieAmount: undefined })),
}));
