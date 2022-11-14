export interface PolyhedronDefinition {
  vertices: number[];
  indices: number[];
  faces: number[][];
}

export interface Dice {
  d4: PolyhedronDefinition;
  d6: PolyhedronDefinition;
  d8: PolyhedronDefinition;
  d10: PolyhedronDefinition;
  d12: PolyhedronDefinition;
  d20: PolyhedronDefinition;
}

export type DiceType = keyof Dice;
