import create from "zustand";

import { PowerUpType, PowerUpProbability } from "../../types";

export interface NewGameState {
  availablePowerUps: PowerUpType[];
  powerUpProbability: PowerUpProbability[];
  totalProbability: number;
  isPowerUpError: boolean;

  togglePowerUp: (powerUp: PowerUpType) => void;
  setPowerUpProbability: (probability: PowerUpProbability) => void;
  removePowerUpProbability: (name: PowerUpType) => void;
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

      probabilitySet.delete({ id: id, probability: prob });

      probabilitySet.add({ id: id, probability: prob });

      const probabilities = Array.from(probabilitySet);
      const totalProbability = probabilities.reduce((a, b) => a + b.probability, 0);

      const powerUpError = totalProbability > 100;

      return { powerUpProbability: probabilities, totalProbability: totalProbability, isPowerUpError: powerUpError };
    });
  },
  removePowerUpProbability: (name: PowerUpType) =>
    set((state) => ({
      powerUpProbability: state.powerUpProbability.filter((probability) => probability.id !== name),
    })),
}));
