import create from "zustand";

import { PowerupType } from "../../interfaces";

export interface ProbabilityType {
  name: PowerupType;
  probability: number;
}

export interface NewGameState {
  availablePowerUps: PowerupType[];
  isUsingFakeCredits: boolean;
  amountOfPowerUps: number;
  powerUpProbability: ProbabilityType[];
  isButtonDisabled: boolean;

  setButtonDisabled: (isButtonDisabled: boolean) => void;
  toggleIsPrivate: () => void;
  toggleIsUsingFakeCredits: () => void;
  togglePowerup: (powerup: PowerupType) => void;
  setAmountOfPowerUps: (amountOfPowerUps: number) => void;
  setPowerUpProbability: (probability: ProbabilityType) => void;
  removeProbability: (name: PowerupType) => void;
}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerUps: [],
  isUsingFakeCredits: false,
  amountOfPowerUps: 0,
  powerUpProbability: [],
  isButtonDisabled: true,
  toggleIsPrivate: () => set(({ isPrivate }) => ({ isPrivate: !isPrivate })),
  toggleIsUsingFakeCredits: () => set(({ isUsingFakeCredits }) => ({ isUsingFakeCredits: !isUsingFakeCredits })),
  togglePowerup: (powerup) =>
    set(({ availablePowerUps }) => {
      const powerupsSet = new Set(availablePowerUps);
      const itemFound = powerupsSet.delete(powerup);
      if (!itemFound) powerupsSet.add(powerup);

      return { availablePowerUps: Array.from(powerupsSet) };
    }),
  setAmountOfPowerUps: (amountOfPowerUps: number) => set(() => ({ amountOfPowerUps: amountOfPowerUps })),
  setPowerUpProbability: ({ name: name, probability: probability }) => {
    set((state) => ({
      powerUpProbability: [
        ...state.powerUpProbability,
        { name: name, probability: probability },
      ],
    }));
  },
  setButtonDisabled: () => set(({ isButtonDisabled }) => ({ isButtonDisabled: !isButtonDisabled })),
  removeProbability: (name: PowerupType) => set((state) => ({
    powerUpProbability: state.powerUpProbability.filter((probability) => probability.name !== name),
  }))
}));
