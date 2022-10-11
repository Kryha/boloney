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

  toggleIsUsingFakeCredits: () => void;
  togglePowerup: (powerup: PowerupType) => void;
  setAmountOfPowerups: (amountOfPowerUps: number) => void;
  setPowerUpProbability: (probability: ProbabilityType) => void;
}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerups: [],
  isUsingFakeCredits: false,
  amountOfPowerUps: 0,
  powerUpProbability: [],

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
      powerUpProbability: [
        ...state.powerUpProbability,
        { name: name, probability: probability },
      ],
    }));
  },
}));
