import create from "zustand";

import { PowerUpType } from "../../interfaces";

export interface NewGameState {
  availablePowerUps: PowerUpType[];
  isUsingFakeCredits: boolean;

  toggleIsUsingFakeCredits: () => void;
  togglePowerUp: (powerUp: PowerUpType) => void;
}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerUps: [],
  isUsingFakeCredits: false,

  toggleIsUsingFakeCredits: () => set(({ isUsingFakeCredits }) => ({ isUsingFakeCredits: !isUsingFakeCredits })),
  togglePowerUp: (powerUp) =>
    set(({ availablePowerUps }) => {
      const powerUpsSet = new Set(availablePowerUps);
      const itemFound = powerUpsSet.delete(powerUp);
      if (!itemFound) powerUpsSet.add(powerUp);

      return { availablePowerUps: Array.from(powerUpsSet) };
    }),
}));
