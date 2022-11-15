import { Die } from "./die";

export class DieD10 extends Die {
  private _range = [0, 9];
  public get range() {
    return this._range;
  }
  public set range(value) {
    this._range = value;
  }
  private _mass = 350;
  public get mass() {
    return this._mass;
  }
  public set mass(value) {
    this._mass = value;
  }
  private _inertia = 9;
  public get inertia() {
    return this._inertia;
  }
  public set inertia(value) {
    this._inertia = value;
  }
  private _sides = 10;
  public get sides() {
    return this._sides;
  }
  public set sides(value) {
    this._sides = value;
  }

  protected vertices: number[][] = [];
  protected faces: number[][] = [];
  protected tab = 0;
  protected af = Math.PI / 6 / 5;
  protected chamfer = 0.945;

  constructor() {
    super();
    const a = (Math.PI * 2) / 10,
      k = Math.cos(a),
      h = 0.105,
      v = -1;
    const vertices: number[][] = [];

    for (let i = 0, b = 0; i < 10; ++i, b += a) {
      vertices.push([Math.cos(b), Math.sin(b), h * (i % 2 ? 1 : -1)]);
    }

    vertices.push([0, 0, -1]);
    vertices.push([0, 0, 1]);

    const faces = [
      [5, 7, 11, 0],
      [4, 2, 10, 1],
      [1, 3, 11, 2],
      [0, 8, 10, 3],
      [7, 9, 11, 4],
      [8, 6, 10, 5],
      [9, 1, 11, 6],
      [2, 0, 10, 7],
      [3, 5, 11, 8],
      [6, 4, 10, 9],
      [1, 0, 2, v],
      [1, 2, 3, v],
      [3, 2, 4, v],
      [3, 4, 5, v],
      [5, 4, 6, v],
      [5, 6, 7, v],
      [7, 6, 8, v],
      [7, 8, 9, v],
      [9, 8, 0, v],
      [9, 0, 1, v],
    ];

    this.vertices = vertices as number[][];
    this.faces = faces as number[][];
  }
}
