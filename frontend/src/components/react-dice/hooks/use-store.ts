import create from "zustand";
// import { Triplet } from "@react-three/cannon";
import { position, rotation, uniqueId } from "../lib/utils";

export declare type Triplet = [x: number, y: number, z: number];
import { DiceType } from "../types";

interface Roll {
  id: string;
  position: Triplet;
  rotation: Triplet;
  type: DiceType;
}

interface ScreenDimensions {
  x: number;
  y: number;
}

export interface State {
  dice: Array<Roll>;
  screen: ScreenDimensions;
  setScreen: (x: number, y: number) => void;
  addDice: (type: DiceType) => void;
  removeDice: () => void;
}

export const useStore = create<State>((set) => ({
  dice: [],
  screen: { x: 0, y: 0 },
  setScreen: (x, y) => set(() => ({ screen: { x, y } })),
  addDice: (type) =>
    set((state) =>
      state.dice.length === 0
        ? {
            dice: [
              {
                id: uniqueId(),
                rotation: rotation(),
                position: position(state.screen.x, state.screen.y, -17),
                type,
              },
            ],
          }
        : state
    ),
  removeDice: () => set(() => ({ dice: [] })),
}));
