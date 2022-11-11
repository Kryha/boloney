import { DieD6 } from "./die-d6";

export class DiceFactory {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  createDie(sides: number) {
    switch (sides) {
      case 4:
        return new DieD6();
      case 6:
        return new DieD6();
      case 8:
        return new DieD6();
      case 10:
        return new DieD6();
      case 12:
        return new DieD6();
      case 20:
        return new DieD6();
      case 100:
        return new DieD6();
      default:
        throw new Error(`Don't know how to make a die with ${sides} sides, sorry.`);
    }
  }

  getStatic(sides: number) {
    switch (sides) {
      case 4:
        return DieD6;
      case 6:
        return DieD6;
      case 8:
        return DieD6;
      case 10:
        return DieD6;
      case 12:
        return DieD6;
      case 20:
        return DieD6;
      case 100:
        return DieD6;
      default:
        throw new Error(`Don't know how to make a die with ${sides} sides, sorry.`);
    }
  }
}
