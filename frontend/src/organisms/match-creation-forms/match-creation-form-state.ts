import { create } from "zustand";
import { produce } from "immer";

import { PowerUpId, PowerUpProbability } from "../../types";
import { DEFAULT_MATCH_SETTINGS } from "../../constants";

export interface NewMatchState {
  availablePowerUps: Set<PowerUpId>;
  powerUpProbability: Map<PowerUpId, PowerUpProbability>;
  isProbabilityManuallyUpdated: boolean;

  togglePowerUp: (powerUp: PowerUpId) => void;
  setPowerUpProbability: (probability: PowerUpProbability) => void;

  getTotalProbability: () => number;
  getIsError: () => boolean;
}

export const useMatchCreationFormState = create<NewMatchState>((set, get) => ({
  availablePowerUps: new Set<PowerUpId>(DEFAULT_MATCH_SETTINGS.availablePowerUps),
  powerUpProbability: new Map<PowerUpId, PowerUpProbability>(DEFAULT_MATCH_SETTINGS.powerUpProbability.map((p) => [p.id, p])),
  isProbabilityManuallyUpdated: false,

  getTotalProbability: () => Array.from(get().powerUpProbability.values()).reduce((total, p) => total + p.probability, 0),
  getIsError: () => get().getTotalProbability() !== 100 || Array.from(get().powerUpProbability.values()).some((p) => p.probability <= 0),

  togglePowerUp: (id) =>
    set(
      produce((state: NewMatchState) => {
        const splitProbabilities = () => {
          if (!state.isProbabilityManuallyUpdated) {
            const total = 100;

            const probability = Math.floor(total / state.availablePowerUps.size);
            let rest = total - probability * state.availablePowerUps.size;

            state.availablePowerUps.forEach((powerUp) => {
              state.powerUpProbability.set(powerUp, { id: powerUp, probability: probability + rest });
              rest = 0;
            });
          } else {
            state.powerUpProbability.set(id, { id, probability: 0 });
          }
        };

        const itemFound = state.availablePowerUps.delete(id);
        if (itemFound) {
          state.powerUpProbability.delete(id);
          splitProbabilities();
        } else {
          state.availablePowerUps.add(id);
          splitProbabilities();
        }
      })
    ),

  setPowerUpProbability: ({ id, probability }) =>
    set(
      produce((state: NewMatchState) => {
        if (probability === 0) {
          state.powerUpProbability.delete(id);
        } else {
          state.powerUpProbability.set(id, { id, probability });
          state.isProbabilityManuallyUpdated = true;
        }
      })
    ),
}));
