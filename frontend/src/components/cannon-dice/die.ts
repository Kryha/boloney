import { Body, Material } from "cannon";
import { DiceConsts } from "./diceconsts";
import { calculateTextureSize, copyto, createDiceGeometry, GeometryWithCannnonShape } from "./dicelib";
import { FlatShading, Mesh, MeshFaceMaterial, MeshPhongMaterial, Object3D, Quaternion, Texture, Vector3 } from "three";

export abstract class Die extends Object3D {
  static diceBodyMaterial = new Material("dice");
  castShadow = false;
  diceColor = "#202020";
  labelColor = "#aaaaaa";
  stopped: number | boolean | undefined = 0;

  get body(): Body {
    if (!this._body) {
      this._body = new Body({
        mass: (this.constructor as any).mass,
        material: Die.diceBodyMaterial,
      });
      this._body.addShape(this.geometry.cannonShape);
    }
    return this._body;
  }

  get threeQuaternion(): THREE.Quaternion {
    const q = this.body.quaternion;
    return new Quaternion(q.x, q.y, q.z, q.w);
  }

  static get range(): number {
    throw new Error("Derived class did not define range");
  }
  static get mass(): number {
    throw new Error("Derived class did not define mass");
  }
  static get inertia(): number {
    throw new Error("Derived class did not define inertia");
  }
  static get sides(): number {
    throw new Error("Derived class did not define sides");
  }

  get range(): number[] {
    return (this.constructor as any).range;
  }

  get mass(): number {
    return (this.constructor as any).mass;
  }

  get inertia(): number {
    return (this.constructor as any).inertia;
  }

  get sides(): number {
    return (this.constructor as any).sides;
  }

  geometry: GeometryWithCannnonShape;
  protected material: MeshFaceMaterial;

  private materialOptions = {
    specular: 0x172022,
    color: 0xf0f0f0,
    shininess: 40,
    shading: FlatShading,
  };

  protected geometryScale = 0.9;
  protected faceLabels = DiceConsts.DISCRETE_LABELS;
  protected margin = 1.0;
  protected abstract get vertices(): number[][];
  protected abstract get faces(): number[][];
  protected abstract get tab(): number;
  protected abstract get af(): number;
  protected abstract get chamfer(): number;

  private _body: Body;

  get value() {
    const sides: number = (this.constructor as any).sides;

    const vector = new Vector3(0, 0, sides === 4 ? -1 : 1);
    let closestFace;
    let closestAngle = Math.PI * 2;

    for (let i = 0, l = this.geometry.faces.length; i < l; ++i) {
      const face = this.geometry.faces[i];
      if (face.materialIndex == 0) continue;
      const angle = face.normal.clone().applyQuaternion(this.threeQuaternion).angleTo(vector);
      if (angle < closestAngle) {
        closestAngle = angle;
        closestFace = face;
      }
    }
    let matindex = closestFace.materialIndex - 1;
    if (sides === 100) matindex *= 10;
    return matindex;
  }

  protected createGeometry(radius: number) {
    return createDiceGeometry(this.vertices, this.faces, radius, this.tab, this.af, this.chamfer);
  }

  protected createMaterials(size: number) {
    const materials = [];
    for (let i = 0; i < this.faceLabels.length; ++i)
      materials.push(
        new MeshPhongMaterial(
          copyto(this.materialOptions, {
            map: this.createTextTexture(this.faceLabels[i], this.labelColor, this.diceColor, size, this.margin),
          })
        )
      );
    return materials;
  }

  protected createMesh(): Mesh {
    if (!this.geometry) this.geometry = this.createGeometry(this.scale.x * this.geometryScale);
    if (!this.material) this.material = new MeshFaceMaterial(this.createMaterials(this.scale.x / 2));
    return new Mesh(this.geometry, this.material);
  }

  protected createTextTexture(text: string, color: string, backColor: string, size: number, margin: number) {
    if (text == undefined) return null;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const ts = calculateTextureSize(size + size * 2 * margin) * 2;
    canvas.width = canvas.height = ts;
    context.font = ts / (1 + 2 * margin) + "pt Arial";
    context.fillStyle = backColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = color;
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    if (text == "6" || text == "9") {
      context.fillText("  .", canvas.width / 2, canvas.height / 2);
    }
    const texture = new Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
}
