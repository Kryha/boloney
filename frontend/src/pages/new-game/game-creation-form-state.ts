import { PowerupType } from "@zk-liars-dice/types";
import create from "zustand";

export interface NewGameState {
  availablePowerups: PowerupType[];
  isPrivate: boolean;
  isUsingFakeCredits: boolean;

  toggleIsPrivate: () => void;
  toggleIsUsingFakeCredits: () => void;
  togglePowerup: (powerup: PowerupType) => void;
}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerups: [],
  isPrivate: false,
  isUsingFakeCredits: false,

  toggleIsPrivate: () => set(({ isPrivate }) => ({ isPrivate: !isPrivate })),
  toggleIsUsingFakeCredits: () => set(({ isUsingFakeCredits }) => ({ isUsingFakeCredits: !isUsingFakeCredits })),
  togglePowerup: (powerup) =>
    set(({ availablePowerups }) => {
      const powerupsSet = new Set(availablePowerups);
      const itemFound = powerupsSet.delete(powerup);
      if (!itemFound) powerupsSet.add(powerup);

      return { availablePowerups: Array.from(powerupsSet) };
    }),
}));
