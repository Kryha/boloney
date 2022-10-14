import create from "zustand";

import { PowerupType } from "../../types";

export interface ProbabilityType {
  name: PowerupType;
  probability: number;
}

export interface NewGameState {
  availablePowerups: PowerupType[];
  isUsingFakeCredits: boolean;
  amountOfPowerUps: number;
  powerUpProbability: ProbabilityType[];
  isButtonDisabled: boolean;

  setButtonDisabled: (isButtonDisabled: boolean) => void;
  toggleIsPrivate: () => void;
  toggleIsUsingFakeCredits: () => void;
  togglePowerup: (powerup: PowerupType) => void;
  setAmountOfPowerups: (amountOfPowerUps: number) => void;
  setPowerUpProbability: (probability: ProbabilityType) => void;
  removeProbability: (name: PowerupType) => void;
}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerups: [],
  isUsingFakeCredits: false,
  amountOfPowerUps: 0,
  powerUpProbability: [],
  isButtonDisabled: true,
  toggleIsPrivate: () => set(({ isPrivate }) => ({ isPrivate: !isPrivate })),
  toggleIsUsingFakeCredits: () => set(({ isUsingFakeCredits }) => ({ isUsingFakeCredits: !isUsingFakeCredits })),
  togglePowerup: (powerup) =>
    set(({ availablePowerups }) => {
      const powerupsSet = new Set(availablePowerups);
      const itemFound = powerupsSet.delete(powerup);
      if (!itemFound) powerupsSet.add(powerup);

      return { availablePowerups: Array.from(powerupsSet) };
    }),
  setAmountOfPowerups: (amountOfPowerUps: number) => set(() => ({ amountOfPowerUps: amountOfPowerUps })),
  setPowerUpProbability: ({ name: name, probability: probability }) => {
    set((state) => ({
      powerUpProbability: [...state.powerUpProbability, { name: name, probability: probability }],
    }));
  },
  setButtonDisabled: () => set(({ isButtonDisabled }) => ({ isButtonDisabled: !isButtonDisabled })),
  removeProbability: (name: PowerupType) =>
    set((state) => ({
      powerUpProbability: state.powerUpProbability.filter((probability) => probability.name !== name),
    })),
}));
