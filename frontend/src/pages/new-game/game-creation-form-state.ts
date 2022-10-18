import create from "zustand";

import { PowerUpType, PowerUpProbability } from "../../types";


export interface NewGameState {
  availablePowerUps: PowerUpType[];
  isPrivate: boolean;
  isUsingFakeCredits: boolean;
  amountOfPowerUps: number;
  powerUpProbability: PowerUpProbability[];
  isButtonDisabled: boolean;


  toggleIsPrivate: () => void;
  toggleIsUsingFakeCredits: () => void;
  togglePowerUp: (powerUp: PowerUpType) => void;
  setAmountOfPowerUps: (amountOfPowerUps: number) => void;
  setPowerUpProbability: (probability: PowerUpProbability) => void;
  setButtonDisabled: (isButtonDisabled: boolean) => void;
  removeProbability: (name: PowerUpType) => void;

}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerUps: [],
  isPrivate: false,
  isUsingFakeCredits: false,
  amountOfPowerUps: 0,
  powerUpProbability: [],
  isButtonDisabled: true,

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
  setPowerUpProbability: ({ id: name, probability: probability }) => {
    set((state) => ({
      powerUpProbability: [
        ...state.powerUpProbability,
        { id: name, probability: probability },
      ],
    }));
  },
  setButtonDisabled: () => set(({ isButtonDisabled }) => ({ isButtonDisabled: !isButtonDisabled })),
  removeProbability: (name: PowerUpType) => set((state) => ({
    powerUpProbability: state.powerUpProbability.filter((probability) => probability.id !== name),
  }))
}));
