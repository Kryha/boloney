import { Die } from "./die";

export class DieD6 extends Die {
  private _inertia = 13;
  public get inertia() {
    return this._inertia;
  }
  public set inertia(value) {
    this._inertia = value;
  }
  private _mass = 300;
  public get mass() {
    return this._mass;
  }
  public set mass(value) {
    this._mass = value;
  }
  private _range = [1, 6];
  public get range() {
    return this._range;
  }
  public set range(value) {
    this._range = value;
  }
  private _sides!: 6;
  public get sides(): 6 {
    return this._sides;
  }
  public set sides(value: 6) {
    this._sides = value;
  }

  protected af = Math.PI / 4;
  protected chamfer = 0.96;
  protected faces = [
    [0, 3, 2, 1, 1],
    [1, 2, 6, 5, 2],
    [0, 1, 5, 4, 3],
    [3, 7, 6, 2, 4],
    [0, 4, 7, 3, 5],
    [4, 5, 6, 7, 6],
  ];
  protected tab = 0.1;
  protected vertices = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ];
}
