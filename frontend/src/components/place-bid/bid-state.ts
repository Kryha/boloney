import create from "zustand";

export interface PlaceBidState {
  pipAmount: number[];
  faceValue?: number;
  diceAmount?: number;

  setFaceValue: (faceValue?: number) => void;
  setDiceAmount: (diceAmount: number) => void;
  resetBidState: () => void;
}

export const usePlaceBidFormState = create<PlaceBidState>((set) => ({
  pipAmount: [1, 2, 3, 4, 5, 6],
  faceValue: undefined,
  diceAmount: undefined,

  setDiceAmount: (diceAmount) => set(() => ({ diceAmount: diceAmount })),
  setFaceValue: (faceValue) => set(() => ({ faceValue: faceValue })),
  resetBidState: () => set(() => ({ faceValue: undefined, diceAmount: undefined })),
}));
