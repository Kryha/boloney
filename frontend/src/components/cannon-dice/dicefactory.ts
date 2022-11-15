import { DieD4 } from "./die-d4";
import { DieD6 } from "./die-d6";
import { DieD8 } from "./die-d8";
import { DieD10 } from "./die-d10";
import { DieD12 } from "./die-d12";
import { DieD20 } from "./die-d20";

export class DiceFactory {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  createDie(sides: number) {
    switch (sides) {
      case 4:
        return new DieD4();
      case 6:
        return new DieD6();
      case 8:
        return new DieD8();
      case 10:
        return new DieD10();
      case 12:
        return new DieD12();
      case 20:
        return new DieD20();
      case 100:
        return new DieD6();
      default:
        throw new Error(`Don't know how to make a die with ${sides} sides, sorry.`);
    }
  }

  getStatic(sides: number) {
    switch (sides) {
      case 4:
        return DieD4;
      case 6:
        return DieD6;
      case 8:
        return DieD8;
      case 10:
        return DieD10;
      case 12:
        return DieD12;
      case 20:
        return DieD20;
      case 100:
        return DieD6;
      default:
        throw new Error(`Don't know how to make a die with ${sides} sides, sorry.`);
    }
  }
}
