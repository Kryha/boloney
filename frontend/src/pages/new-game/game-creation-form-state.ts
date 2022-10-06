import create from "zustand";

import { PowerupType } from "../../interfaces";

export interface NewGameState {
  availablePowerups: PowerupType[] | [];
  isUsingFakeCredits: boolean;

  toggleIsUsingFakeCredits: () => void;
  togglePowerup: (powerup: PowerupType) => void;
}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerups: [],
  isUsingFakeCredits: false,

  toggleIsUsingFakeCredits: () => set(({ isUsingFakeCredits }) => ({ isUsingFakeCredits: !isUsingFakeCredits })),
  togglePowerup: (powerup) =>
    set(({ availablePowerups }) => {
      const powerupsSet = new Set(availablePowerups);
      const itemFound = powerupsSet.delete(powerup);
      if (!itemFound) powerupsSet.add(powerup);

      return { availablePowerups: Array.from(powerupsSet) };
    }),
}));
