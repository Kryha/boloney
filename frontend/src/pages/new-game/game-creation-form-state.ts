import create from "zustand";

import { PowerupType } from "../../types";

export interface ProbabilityType {
  name: PowerUpType;
  probability: number;
}

export interface NewGameState {
  availablePowerUps: PowerUpType[];
  isUsingFakeCredits: boolean;
  amountOfPowerUps: number;
  powerUpProbability: ProbabilityType[];
  isButtonDisabled: boolean;

  setButtonDisabled: (isButtonDisabled: boolean) => void;
  toggleIsUsingFakeCredits: () => void;
  togglePowerUp: (powerUp: PowerUpType) => void;
  setAmountOfPowerUps: (amountOfPowerUps: number) => void;
  setPowerUpProbability: (probability: ProbabilityType) => void;
  removeProbability: (name: PowerUpType) => void;
}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerUps: [],
  isUsingFakeCredits: false,
  amountOfPowerUps: 0,
  powerUpProbability: [],
  isButtonDisabled: true,
  toggleIsUsingFakeCredits: () => set(({ isUsingFakeCredits }) => ({ isUsingFakeCredits: !isUsingFakeCredits })),
  togglePowerUp: (powerUp) =>
    set(({ availablePowerUps }) => {
      const powerUpsSet = new Set(availablePowerUps);
      const itemFound = powerUpsSet.delete(powerUp);
      if (!itemFound) powerUpsSet.add(powerUp);

      return { availablePowerUps: Array.from(powerUpsSet) };
    }),
  setAmountOfPowerUps: (amountOfPowerUps: number) => set(() => ({ amountOfPowerUps: amountOfPowerUps })),
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
