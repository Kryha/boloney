import { Triplet } from "@react-three/cannon";

/** random vector start position on XZ plane */
export const randomUnitVector = (): Triplet => {
  return [2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5)];
};

/** a1*b1, a2*b2, a3*b3 */
export const multiply = (a: Triplet, b: Triplet): Triplet => {
  return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
};

/** multiply triplet by scalar */
export const multiplyScalar = (a: Triplet, s: number): Triplet => {
  return [a[0] * s, a[1] * s, a[2] * s];
};

/** add two triplets */
export const add = (a: Triplet, b: Triplet): Triplet => {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
};
