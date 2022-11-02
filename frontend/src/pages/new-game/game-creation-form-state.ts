import create from "zustand";
import { splitInteger } from "../../components/checkbox/power-up-checkbox";

import { PowerUpType, PowerUpProbability } from "../../types";

export interface NewGameState {
  availablePowerUps: PowerUpType[];
  powerUpProbability: PowerUpProbability[];
  totalProbability: number;
  isPowerUpError: boolean;
  powerUpValue: PowerUpProbability[];
  value: number;

  togglePowerUp: (powerUp: PowerUpType) => void;
  setPowerUpProbability: (probability: PowerUpProbability) => void;
  removePowerUpProbability: (name: PowerUpType) => void;
  setPowerUpValue: (name: PowerUpType, probability: number) => void;
  getProbability: (name: PowerUpType) => void;
  removePowerUpValue: (name: PowerUpType) => void;
}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerUps: [],
  powerUpProbability: [],
  isPowerUpError: false,
  totalProbability: 0,
  powerUpValue: [],
  value: 0,

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
      console.log(powerUpError);
      return { powerUpProbability: probabilities, totalProbability: totalProbability, isPowerUpError: powerUpError };
    });
  },
  removePowerUpProbability: (name: PowerUpType) => {
    set(({ powerUpProbability }) => {
      const powerUpProbabilities = powerUpProbability.filter((probability) => probability.id !== name);

      const totalProbability = powerUpProbabilities.reduce((a, b) => a + b.probability, 0);

      return { powerUpProbability: powerUpProbabilities, totalProbability: totalProbability };
    });
  },
  removePowerUpValue: (name: PowerUpType) => {
    set(({ powerUpProbability }) => {
      const powerUpProbabilities = powerUpProbability.filter((probability) => probability.id !== name);
      const length = powerUpProbabilities.length;
      const values = splitInteger(100, length);
      console.log(values);
      const a = powerUpProbabilities;
      const newA: PowerUpProbability[] = a.map((as, index) => {
        as.probability = values[index];
        return as;
      });
      const totalProbability = newA.reduce((a, b) => a + b.probability, 0);

      return { powerUpProbability: newA, totalProbability: totalProbability };
    });
  },
  setPowerUpValue: (id: PowerUpType, value: number) => {
    set(({ powerUpProbability }) => {
      const probabilitySet = new Set(powerUpProbability);
      probabilitySet.delete({ id: id, probability: 0 });

      probabilitySet.add({ id: id, probability: 0 });

      const probabilities = Array.from(probabilitySet);
      const length = probabilities.length;
      const values = splitInteger(100, length);
      console.log(values);
      const a = probabilities;
      const newA: PowerUpProbability[] = a.map((as, index) => {
        as.probability = values[index];
        return as;
      });
      console.log(newA);
      const totalProbability = newA.reduce((a, b) => a + b.probability, 0);

      const powerUpError = totalProbability > 100;

      return { powerUpProbability: newA, totalProbability: totalProbability, isPowerUpError: powerUpError };
    });
  },
  getProbability: (id: PowerUpType) => {
    set(({ powerUpProbability }) => {
      const probability = powerUpProbability.find((o) => o.id === id);
      const newVal = probability ? probability.probability : 0;
      return { value: newVal };
    });
  },
}));
