import create from "zustand";

import { PowerUpType, } from "../../types";


export interface NewGameState {
  availablePowerups: PowerUpType[];
  isPrivate: boolean;
  isUsingFakeCredits: boolean;
  amountOfPowerUps: number;
  powerUpProbability: ProbabilityType[];
  isButtonDisabled: boolean;


  toggleIsPrivate: () => void;
  toggleIsUsingFakeCredits: () => void;
  togglePowerUp: (powerUp: PowerUpType) => void;
  setAmountOfPowerUps: (amountOfPowerUps: number) => void;
  setPowerUpProbability: (probability: ProbabilityType) => void;
  setButtonDisabled: (isButtonDisabled: boolean) => void;
  removeProbability: (name: PowerUpType) => void;

}

export const useGameCreationFormState = create<NewGameState>((set) => ({
  availablePowerups: [],
  isPrivate: false,
  isUsingFakeCredits: false,
  amountOfPowerUps: 0,
  powerUpProbability: [],
  isButtonDisabled: true,

  toggleIsPrivate: () => set(({ isPrivate }) => ({ isPrivate: !isPrivate })),
  toggleIsUsingFakeCredits: () => set(({ isUsingFakeCredits }) => ({ isUsingFakeCredits: !isUsingFakeCredits })),
  togglePowerUp: (powerUp) =>
    set(({ availablePowerups }) => {
      const powerUpsSet = new Set(availablePowerups);
      const itemFound = powerUpsSet.delete(powerUp);
      if (!itemFound) powerUpsSet.add(powerUp);

      return { availablePowerups: Array.from(powerUpsSet) };
    }),
  setAmountOfPowerUps: (amountOfPowerUps: number) => set(() => ({ amountOfPowerUps: amountOfPowerUps })),
  setPowerUpProbability: ({ name: name, probability: probability }) => {
    set((state) => ({
      powerUpProbability: [
        ...state.powerUpProbability,
        { name: name, probability: probability },
      ],
    }));
  },
  setButtonDisabled: () => set(({ isButtonDisabled }) => ({ isButtonDisabled: !isButtonDisabled })),
  removeProbability: (name: PowerUpType) => set((state) => ({
    powerUpProbability: state.powerUpProbability.filter((probability) => probability.name !== name),
  }))
}));
