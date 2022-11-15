import { DiceBox } from "./dicebox";
import { DiceNotation } from "./dicenotation";
import { DieVector } from "./dievector";

export interface AfterDiceRollCallback {
  (box: DiceBox, notation: DiceNotation, result: number[]): void;
}

export interface BeforeDiceRollCallback {
  (box: DiceBox, vectors: DieVector[], notation: DiceNotation, roll: (requestResults?: boolean) => void): void;
}

export interface DiceBoxCallback {
  (values: number[]): void;
}

export interface NotationGetter {
  (): string;
}
