import { PowerUpId } from "./power-up";
import { isNumber } from "./primitive";

export interface RandomNumberBodyToolkit {
  seed: number;
  min: number;
  max: number;
}

export interface RandomNumberResToolkit {
  randomNumber: number;
}

export const isRandomNumberResToolkit = (value: unknown): value is RandomNumberResToolkit => {
  const assertedVal = value as RandomNumberResToolkit;

  return assertedVal.randomNumber !== undefined && isNumber(assertedVal.randomNumber);
};

export interface PowerUpToolkit {
  owner: string;
  gates: number;
  matchId: string;
  powerUpId: PowerUpId;
  _nonce: string;
}

export interface DiceDataToolkit {
  dice_1: number;
  dice_2: number;
  dice_3: number;
  dice_4: number;
  dice_5: number;
  dice_6: number;
  dice_7: number;
  dice_8: number;
  dice_9: number;
  dice_10: number;
}

export interface UseBirdsEyeBodyToolkit {
  powerUp: PowerUpToolkit;
  diceData: DiceDataToolkit;
}

export interface UseBirdsEyeResToolkit {
  sum: number;
}

export const isBirdsEyeResToolkit = (value: unknown): value is UseBirdsEyeResToolkit => {
  const assertedVal = value as UseBirdsEyeResToolkit;

  return assertedVal.sum !== undefined && isNumber(assertedVal.sum);
};
