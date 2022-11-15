import { Die } from "./die";

export class DieD20 extends Die {
  private _inertia = 6;
  public get inertia() {
    return this._inertia;
  }
  public set inertia(value) {
    this._inertia = value;
  }
  private _mass = 400;
  public get mass() {
    return this._mass;
  }
  public set mass(value) {
    this._mass = value;
  }
  private _range = [1, 20];
  public get range() {
    return this._range;
  }
  public set range(value) {
    this._range = value;
  }
  private _sides = 20;
  public get sides() {
    return this._sides;
  }
  public set sides(value) {
    this._sides = value;
  }

  protected af = -Math.PI / 4 / 2;
  protected chamfer = 0.955;
  protected faces: number[][] = [];
  protected tab = -0.2;
  protected vertices: number[][] = [];

  constructor() {
    super();
    const t = (1 + Math.sqrt(5)) / 2;
    const vertices = [
      [-1, t, 0],
      [1, t, 0],
      [-1, -t, 0],
      [1, -t, 0],
      [0, -1, t],
      [0, 1, t],
      [0, -1, -t],
      [0, 1, -t],
      [t, 0, -1],
      [t, 0, 1],
      [-t, 0, -1],
      [-t, 0, 1],
    ];
    const faces = [
      [0, 11, 5, 1],
      [0, 5, 1, 2],
      [0, 1, 7, 3],
      [0, 7, 10, 4],
      [0, 10, 11, 5],
      [1, 5, 9, 6],
      [5, 11, 4, 7],
      [11, 10, 2, 8],
      [10, 7, 6, 9],
      [7, 1, 8, 10],
      [3, 9, 4, 11],
      [3, 4, 2, 12],
      [3, 2, 6, 13],
      [3, 6, 8, 14],
      [3, 8, 9, 15],
      [4, 9, 5, 16],
      [2, 4, 11, 17],
      [6, 2, 10, 18],
      [8, 6, 7, 19],
      [9, 8, 1, 20],
    ];

    this.vertices = vertices;
    this.faces = faces;
  }
}
