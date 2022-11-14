import { Triplet } from "@react-three/cannon";
import { add, multiply, multiplyScalar, randomUnitVector } from "./vector";

/**
 *  Function which asserts if a thing defined
 * @param thing thing which may be undefined
 * @throws if thing is undefined
 */
export function assertDefined<T>(thing: T | undefined, message = "thing is undefined"): asserts thing is T {
  if (!isDefined(thing)) {
    throw new Error(message);
  }
}

let id = 0;

export function uniqueId(): string {
  return `${id++}`;
}

/** random starting orientation */
export function rotation(): Triplet {
  return multiplyScalar(randomUnitVector(), 2 * Math.PI);
}

/** random start position for roll within bounds of screen */
export function position(xmax: number, ymax: number, z: number): Triplet {
  return add(multiply(randomUnitVector(), [xmax / 2 - 1, ymax / 2 - 1, 0]), [0, 0, z]);
}

function isDefined<T>(thing: T | undefined): thing is T {
  return thing !== undefined;
}
