import { Die } from "./die";
import { DiceConsts } from "./diceconsts";
import { Mesh, MeshFaceMaterial, Texture, Vector3 } from "three";
import { calculateTextureSize, createDiceGeometry, GeometryWithCannnonShape } from "./dicelib";

export class DieD4 extends Die {
  private _inertia = 5;
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
  private _range = [1, 4];
  public get range() {
    return this._range;
  }
  public set range(value) {
    this._range = value;
  }
  private _sides = 4;
  public get sides() {
    return this._sides;
  }
  public set sides(value) {
    this._sides = value;
  }

  protected af = (Math.PI * 7) / 6;
  protected chamfer = 0.96;
  protected faceLabels = DiceConsts.D4_LABELS;
  protected faces = [
    [1, 0, 2, 1],
    [0, 1, 3, 2],
    [0, 3, 2, 3],
    [1, 2, 3, 4],
  ];
  protected geometryScale = 1.2;
  protected tab = -0.1;
  protected vertices = [
    [1, 1, 1],
    [-1, -1, 1],
    [-1, 1, -1],
    [1, -1, -1],
  ];

  protected createTextTexture(text: string, color: string, backColor: string, size: number, margin: number) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const ts = calculateTextureSize(size + margin) * 2;

    canvas.width = canvas.height = ts;
    if (context) {
      context.font = (ts - margin) / 1.5 + "pt Arial";
      context.fillStyle = backColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = color;

      for (const i of text.split(/,/)) {
        context.fillText(text[Number(i)], canvas.width / 2, canvas.height / 2 - ts * 0.3);
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate((Math.PI * 2) / 3);
        context.translate(-canvas.width / 2, -canvas.height / 2);
      }
    }
    const texture = new Texture(canvas);
    texture.needsUpdate = true;

    return texture;
  }
}
