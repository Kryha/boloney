import create from "zustand";

import { PowerUpType, PowerUpProbability } from "../../types";

export interface NewGameState {
  availablePowerUps: PowerUpType[];
  powerUpProbability: PowerUpProbability[];
  totalProbability: number;
  isPowerUpError: boolean;

  togglePowerUp: (powerUp: PowerUpType) => void;
  setPowerUpProbability: (probability: PowerUpProbability) => void;
  removeProbability: (name: PowerUpType) => void;
}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerUps: [],
  powerUpProbability: [],
  isPowerUpError: false,
  totalProbability: 0,

  togglePowerUp: (powerUp) =>
    set(({ availablePowerUps }) => {
      const powerUpsSet = new Set(availablePowerUps);
      const itemFound = powerUpsSet.delete(powerUp);
      if (!itemFound) powerUpsSet.add(powerUp);

      return { availablePowerUps: Array.from(powerUpsSet) };
    }),
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

      const powerUpError = probability > 100;

      return { powerUpProbability: probabilities, probability: probability, isPowerUpError: powerUpError };
    });
  },
  removeProbability: (name: PowerUpType) =>
    set((state) => ({
      powerUpProbability: state.powerUpProbability.filter((probability) => probability.id !== name),
    })),
}));
