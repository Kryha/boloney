import { Die } from "./die";

export class DieD12 extends Die {
  private _inertia = 8;
  public get inertia() {
    return this._inertia;
  }
  public set inertia(value) {
    this._inertia = value;
  }
  private _mass = 350;
  public get mass() {
    return this._mass;
  }
  public set mass(value) {
    this._mass = value;
  }
  private _range = [1, 12];
  public get range() {
    return this._range;
  }
  public set range(value) {
    this._range = value;
  }
  private _sides = 12;
  public get sides() {
    return this._sides;
  }
  public set sides(value) {
    this._sides = value;
  }

  protected af = Math.PI / 4 / 2;
  protected chamfer = 0.968;
  protected faces: number[][] = [];
  protected tab = 0.2;
  protected vertices: number[][] = [];

  constructor() {
    super();
    const p = (1 + Math.sqrt(5)) / 2,
      q = 1 / p;
    const vertices = [
      [0, q, p],
      [0, q, -p],
      [0, -q, p],
      [0, -q, -p],
      [p, 0, q],
      [p, 0, -q],
      [-p, 0, q],
      [-p, 0, -q],
      [q, p, 0],
      [q, -p, 0],
      [-q, p, 0],
      [-q, -p, 0],
      [1, 1, 1],
      [1, 1, -1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, 1, 1],
      [-1, 1, -1],
      [-1, -1, 1],
      [-1, -1, -1],
    ];
    const faces = [
      [2, 14, 4, 12, 0, 1],
      [15, 9, 11, 19, 3, 2],
      [16, 10, 17, 7, 6, 3],
      [6, 7, 19, 11, 18, 4],
      [6, 18, 2, 0, 16, 5],
      [18, 11, 9, 14, 2, 6],
      [1, 17, 10, 8, 13, 7],
      [1, 13, 5, 15, 3, 8],
      [13, 8, 12, 4, 5, 9],
      [5, 4, 14, 9, 15, 10],
      [0, 12, 8, 10, 16, 11],
      [3, 19, 7, 17, 1, 12],
    ];

    this.vertices = vertices;
    this.faces = faces;
  }
}
