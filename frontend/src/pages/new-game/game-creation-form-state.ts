import { z } from "zod";
import create from "zustand";

import { PowerUpType, PowerUpProbability } from "../../types";

interface PowerUpError {
  id: string,
  isError: boolean;
}
export interface NewGameState {
  availablePowerUps: PowerUpType[];
  isPrivate: boolean;
  isUsingFakeCredits: boolean;
  amountOfPowerUps: number;
  powerUpProbability: PowerUpProbability[];
  probability: number;
  isPowerUpError: PowerUpError[];
  isPowerUpDisabled: boolean;

  toggleIsPrivate: () => void;
  toggleIsUsingFakeCredits: () => void;
  togglePowerUp: (powerUp: PowerUpType) => void;
  setIsPowerUpDisabled: (powerUp?: PowerUpType) => void;
  setAmountOfPowerUps: (amountOfPowerUps: number) => void;
  setPowerUpProbability: (probability: PowerUpProbability) => void;
  removeProbability: (name: PowerUpType) => void;
}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerUps: [],
  isPrivate: false,
  isUsingFakeCredits: false,
  amountOfPowerUps: 0,
  powerUpProbability: [],
  isPowerUpError: false,
  isPowerUpDisabled: true,
  probability: 0,

  toggleIsPrivate: () => set(({ isPrivate }) => ({ isPrivate: !isPrivate })),
  toggleIsUsingFakeCredits: () => set(({ isUsingFakeCredits }) => ({ isUsingFakeCredits: !isUsingFakeCredits })),
  togglePowerUp: (powerUp) =>
    set(({ availablePowerUps }) => {
      const powerUpsSet = new Set(availablePowerUps);
      const itemFound = powerUpsSet.delete(powerUp);
      if (!itemFound) powerUpsSet.add(powerUp);

      return { availablePowerUps: Array.from(powerUpsSet) };
    }),
  setAmountOfPowerUps: (amountOfPowerUps: number) => set(() => ({ amountOfPowerUps: amountOfPowerUps })),
  setPowerUpProbability: ({ id: id, probability: prob }) => {
    set(({ powerUpProbability }) => {
      const probabilitySet = new Set(powerUpProbability);

      probabilitySet.forEach((setId) => {
        if (setId.id === id) {
          probabilitySet.delete(setId);
        }
      });

      probabilitySet.add({ id: id, probability: prob });

      const probabilities = Array.from(probabilitySet);
      const probability = probabilities.reduce((a, b) => a + b.probability, 0);

      const powerUpError = probability > 100 && powerUpProbability.some((e) => e.id === id);

      // Add the id to power up error
      return { powerUpProbability: probabilities, probability: probability, isPowerUpError: !powerUpError };
    });
  },
  removeProbability: (name: PowerUpType) => set((state) => ({
    powerUpProbability: state.powerUpProbability.filter((probability) => probability.id !== name),
  })),
  setIsPowerUpDisabled: (powerUp) =>
    set(({ availablePowerUps, amountOfPowerUps }) => {
      let isDisabled = true;
      if (powerUp) {
        isDisabled = !availablePowerUps.includes(powerUp);
      } else {
        isDisabled = amountOfPowerUps === availablePowerUps.length;
      }
      return { isPowerUpDisabled: isDisabled };
    }),
}));
