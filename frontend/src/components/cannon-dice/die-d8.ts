import { Die } from "./die";

export class DieD8 extends Die {
  private _range = [1, 8];
  public get range() {
    return this._range;
  }
  public set range(value) {
    this._range = value;
  }
  private _mass = 340;
  public get mass() {
    return this._mass;
  }
  public set mass(value) {
    this._mass = value;
  }
  private _inertia = 10;
  public get inertia() {
    return this._inertia;
  }
  public set inertia(value) {
    this._inertia = value;
  }
  private _sides = 8;
  public get sides() {
    return this._sides;
  }
  public set sides(value) {
    this._sides = value;
  }

  protected vertices = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  protected faces = [
    [0, 2, 4, 1],
    [0, 4, 3, 2],
    [0, 3, 5, 3],
    [0, 5, 2, 4],
    [1, 3, 4, 5],
    [1, 4, 2, 6],
    [1, 2, 5, 7],
    [1, 5, 3, 8],
  ];
  protected tab = 0;
  protected af = -Math.PI / 4 / 2;
  protected chamfer = 0.965;
  protected declare margin: 1.2;
}
