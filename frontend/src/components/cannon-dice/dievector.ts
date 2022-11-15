import { Die } from "./die";
import { Vector3, Vector4 } from "three";

export interface DieVector {
  sides: number;
  pos: Vector3;
  velocity: Vector3;
  angle: Vector3;
  axis: Vector4;
}
