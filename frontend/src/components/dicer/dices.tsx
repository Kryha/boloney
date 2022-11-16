import * as CANNON from "cannon";
import { Material, Quaternion, Vec3, World } from "cannon";
import * as THREE from "three";
import { Geometry, Mesh, MeshPhongMaterial, MeshPhongMaterialParameters, Texture, Vector3 } from "three";

interface DiceObjectValue {
  dice: DiceObject;
  value: number;
  vectors?: { position: Vec3; quaternion: Quaternion; velocity: Vec3; angularVelocity: Vec3 };
  stableCount?: number;
}

class DiceManagerClass {
  public world: World = new World();
  public throwRunning = false;

  public readonly diceBodyMaterial: Material = new CANNON.Material("dice");
  public readonly floorBodyMaterial: Material = new CANNON.Material("floor");
  public readonly barrierBodyMaterial: Material = new CANNON.Material("barrier");

  setWorld(world: World) {
    this.world = world;

    world.addContactMaterial(
      new CANNON.ContactMaterial(this.floorBodyMaterial, this.diceBodyMaterial, {
        friction: 0.1,
        restitution: 0.3,
      })
    );

    world.addContactMaterial(
      new CANNON.ContactMaterial(this.barrierBodyMaterial, this.diceBodyMaterial, {
        friction: 0,
        restitution: 0.5,
      })
    );

    world.addContactMaterial(
      new CANNON.ContactMaterial(this.diceBodyMaterial, this.diceBodyMaterial, {
        friction: 0,
        restitution: 0.3,
      })
    );
  }

  prepareValues(diceValues: DiceObjectValue[]) {
    if (this.throwRunning) {
      throw new Error("Cannot start another throw. Please wait, until the current throw is finished.");
    }

    for (let i = 0; i < diceValues.length; i++) {
      if (diceValues[i].value < 1 || diceValues[i].dice.values < diceValues[i].value) {
        throw new Error(
          "Cannot throw die to value " + diceValues[i].value + ", because it has only " + diceValues[i].dice.values + " sides."
        );
      }
    }

    this.throwRunning = true;

    for (let i = 0; i < diceValues.length; i++) {
      diceValues[i].dice.simulationRunning = true;
      diceValues[i].vectors = diceValues[i].dice.getCurrentVectors();
      diceValues[i].stableCount = 0;
    }

    const check = () => {
      let allStable = true;

      for (let i = 0; i < diceValues.length; i++) {
        if (diceValues[i].dice.isFinished()) {
          diceValues[i].stableCount!++;
        } else {
          diceValues[i].stableCount = 0;
        }

        if (diceValues[i].stableCount! < 50) {
          allStable = false;
        }
      }

      if (allStable) {
        DiceManager.world.removeEventListener("postStep", check);

        for (let i = 0; i < diceValues.length; i++) {
          diceValues[i].dice.shiftUpperValue(diceValues[i].value);
          diceValues[i].dice.setVectors(diceValues[i].vectors!);
          diceValues[i].dice.simulationRunning = false;
        }

        this.throwRunning = false;
      }
    };

    this.world.addEventListener("postStep", check);
  }
}

interface DiceOptions {
  size?: number;
  fontColor?: string;
  backColor?: string;
}

interface PhysicsDiceMesh extends Mesh<Geometry> {
  body?: CANNON.Body;
  diceObject?: DiceObject;
}

export class DiceObject {
  protected readonly size: number;

  // default material properties
  private readonly materialOptions: MeshPhongMaterialParameters;
  private readonly labelColor: string;
  private readonly diceColor: string;

  private object: PhysicsDiceMesh;

  // important for the d4
  protected invertUpside = false;

  protected mass = 1;
  protected scaleFactor = 1;
  protected vertices: number[][] = [];
  protected faces: number[][] = [];
  protected chamfer = 1;
  protected tab = 1;
  protected af: number = Math.PI;
  protected textMargin = 0;
  protected faceTexts: string[] | number[][] = [];
  protected customTextTextureFunction?: (faceTexts: string | number[], labelColor: string, diceColor: string) => Texture;

  public values = 0;

  public simulationRunning = false;

  constructor(overrideOptions: Partial<DiceOptions>) {
    const options = Object.assign(
      {
        size: 1,
        fontColor: "#000000",
        backColor: "#ffffff",
      },
      overrideOptions
    );

    // @ts-ignore
    this.object = null;

    this.size = options.size;
    this.invertUpside = false;

    this.materialOptions = {
      specular: 0x172022,
      color: 0xf0f0f0,
      shininess: 45,
      flatShading: true,
    };
    this.labelColor = options.fontColor;
    this.diceColor = options.backColor;
  }

  public isFinished(): boolean {
    const threshold = Math.min(this.size / 100, 1);

    const angularVelocity = this.object.body?.angularVelocity;
    const velocity = this.object.body?.velocity;

    if (angularVelocity && velocity) {
      return (
        Math.abs(angularVelocity.x) < threshold &&
        Math.abs(angularVelocity.y) < threshold &&
        Math.abs(angularVelocity.z) < threshold &&
        Math.abs(velocity.x) < threshold &&
        Math.abs(velocity.y) < threshold &&
        Math.abs(velocity.z) < threshold
      );
    } else {
      return true;
    }
  }

  private getUpsideValue(): number {
    const vector = new THREE.Vector3(0, 0, this.invertUpside ? -1 : 1);

    let closestFace: THREE.Face3;
    let closestAngle = Math.PI * 2;

    for (let i = 0; i < this.object.geometry.faces.length; ++i) {
      const face = this.object.geometry.faces[i];

      if (face.materialIndex === 0) {
        continue;
      }

      const angle = face.normal
        .clone()
        .applyQuaternion(
          new THREE.Quaternion(
            this.object.body?.quaternion.x,
            this.object.body?.quaternion.y,
            this.object.body?.quaternion.z,
            this.object.body?.quaternion.w
          )
        )
        .angleTo(vector);

      if (angle < closestAngle) {
        closestAngle = angle;
        closestFace = face;
      }
    }

    return closestFace!.materialIndex - 1;
  }

  public getCurrentVectors(): { position: Vec3; quaternion: Quaternion; velocity: Vec3; angularVelocity: Vec3 } {
    return {
      position: this.object.body!.position.clone(),
      quaternion: this.object.body!.quaternion.clone(),
      velocity: this.object.body!.velocity.clone(),
      angularVelocity: this.object.body!.angularVelocity.clone(),
    };
  }

  public setVectors(vectors: { position: Vec3; quaternion: Quaternion; velocity: Vec3; angularVelocity: Vec3 }) {
    if (this.object.body) {
      this.object.body.position = vectors.position;
      this.object.body.quaternion = vectors.quaternion;
      this.object.body.velocity = vectors.velocity;
      this.object.body.angularVelocity = vectors.angularVelocity;
    }
  }

  public shiftUpperValue(toValue: number): void {
    const geometry = this.object.geometry.clone();
    const fromValue = this.getUpsideValue();

    for (let i = 0, l = geometry.faces.length; i < l; ++i) {
      let materialIndex = geometry.faces[i].materialIndex;

      if (materialIndex === 0) {
        continue;
      }

      materialIndex += toValue - fromValue - 1;

      while (materialIndex > this.values) {
        materialIndex -= this.values;
      }

      while (materialIndex < 1) {
        materialIndex += this.values;
      }

      geometry.faces[i].materialIndex = materialIndex + 1;
    }

    this.object.geometry = geometry;

    if (this.values === 4) {
      // to shift faces on a d4, we need to alter faceTexts and recreate the textures from it
      let num = toValue - fromValue;
      if (num < 0) num += 4;
      this.faceTexts = [
        [[], [0, 0, 0], [2, 4, 3], [1, 3, 4], [2, 1, 4], [1, 2, 3]],
        [[], [0, 0, 0], [2, 3, 4], [3, 1, 4], [2, 4, 1], [3, 2, 1]],
        [[], [0, 0, 0], [4, 3, 2], [3, 4, 1], [4, 2, 1], [3, 1, 2]],
        [[], [0, 0, 0], [4, 2, 3], [1, 4, 3], [4, 1, 2], [1, 3, 2]],
      ][num];
      this.object.material = this.getMaterials();
    }
  }

  private static getChamferGeometry(vectors: Vector3[], faces: number[][], chamfer: number): { vectors: Vector3[]; faces: number[][] } {
    const chamfer_vectors: Vector3[] = [];
    const chamfer_faces: number[][] = [];
    const corner_faces = new Array(vectors.length);

    for (let i = 0; i < vectors.length; ++i) corner_faces[i] = [];
    for (let i = 0; i < faces.length; ++i) {
      const ii = faces[i],
        fl = ii.length - 1;
      const center_point = new THREE.Vector3();
      const face = new Array(fl);
      for (let j = 0; j < fl; ++j) {
        const vv = vectors[ii[j]].clone();
        center_point.add(vv);
        corner_faces[ii[j]].push((face[j] = chamfer_vectors.push(vv) - 1));
      }
      center_point.divideScalar(fl);
      for (let j = 0; j < fl; ++j) {
        const vv = chamfer_vectors[face[j]];
        vv.subVectors(vv, center_point).multiplyScalar(chamfer).addVectors(vv, center_point);
      }
      face.push(ii[fl]);
      chamfer_faces.push(face);
    }
    for (let i = 0; i < faces.length - 1; ++i) {
      for (let j = i + 1; j < faces.length; ++j) {
        const pairs = [];
        let lastm = -1;

        for (let m = 0; m < faces[i].length - 1; ++m) {
          const n = faces[j].indexOf(faces[i][m]);
          if (n >= 0 && n < faces[j].length - 1) {
            if (lastm >= 0 && m !== lastm + 1) pairs.unshift([i, m], [j, n]);
            else pairs.push([i, m], [j, n]);
            lastm = m;
          }
        }

        if (pairs.length !== 4) {
          continue;
        }

        chamfer_faces.push([
          chamfer_faces[pairs[0][0]][pairs[0][1]],
          chamfer_faces[pairs[1][0]][pairs[1][1]],
          chamfer_faces[pairs[3][0]][pairs[3][1]],
          chamfer_faces[pairs[2][0]][pairs[2][1]],
          -1,
        ]);
      }
    }
    for (let i = 0; i < corner_faces.length; ++i) {
      let cf = corner_faces[i],
        face = [cf[0]],
        count = cf.length - 1;
      while (count) {
        for (let m = faces.length; m < chamfer_faces.length; ++m) {
          let index = chamfer_faces[m].indexOf(face[face.length - 1]);
          if (index >= 0 && index < 4) {
            if (--index === -1) index = 3;
            const next_vertex = chamfer_faces[m][index];
            if (cf.indexOf(next_vertex) >= 0) {
              face.push(next_vertex);
              break;
            }
          }
        }
        --count;
      }
      face.push(-1);
      chamfer_faces.push(face);
    }
    return { vectors: chamfer_vectors, faces: chamfer_faces };
  }

  private static makeGeometry(vertices: Vector3[], faces: number[][], radius: number, tab: number, af: number): Geometry {
    const geom = new THREE.Geometry();

    for (let i = 0; i < vertices.length; ++i) {
      const vertex = vertices[i].multiplyScalar(radius);
      // @ts-ignore
      vertex.index = geom.vertices.push(vertex) - 1;
    }

    for (let i = 0; i < faces.length; ++i) {
      const ii = faces[i],
        fl = ii.length - 1;
      const aa = (Math.PI * 2) / fl;
      for (let j = 0; j < fl - 2; ++j) {
        // @ts-ignore
        geom.faces.push(
          new THREE.Face3(
            ii[0],
            ii[j + 1],
            ii[j + 2],
            [geom.vertices[ii[0]], geom.vertices[ii[j + 1]], geom.vertices[ii[j + 2]]],
            0,
            ii[fl] + 1
          )
        );
        geom.faceVertexUvs[0].push([
          new THREE.Vector2((Math.cos(af) + 1 + tab) / 2 / (1 + tab), (Math.sin(af) + 1 + tab) / 2 / (1 + tab)),
          new THREE.Vector2(
            (Math.cos(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab),
            (Math.sin(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab)
          ),
          new THREE.Vector2(
            (Math.cos(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab),
            (Math.sin(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab)
          ),
        ]);
      }
    }
    geom.computeFaceNormals();
    geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);

    return geom;
  }

  private static createCannonShape(vertices: Vector3[], faces: number[][], radius: number): CANNON.ConvexPolyhedron {
    const shapePoints = new Array(vertices.length);
    const shapeFaces = new Array(faces.length);

    for (let i = 0; i < vertices.length; ++i) {
      const v = vertices[i];
      shapePoints[i] = new CANNON.Vec3(v.x * radius, v.y * radius, v.z * radius);
    }
    for (let i = 0; i < faces.length; ++i) {
      shapeFaces[i] = faces[i].slice(0, faces[i].length - 1);
    }
    return new CANNON.ConvexPolyhedron(shapePoints, shapeFaces);
  }

  private buildGeometries(): { geometry: Geometry; cannonShape: CANNON.ConvexPolyhedron } {
    const radius = this.size * this.scaleFactor;
    const vectors = new Array(this.vertices.length);

    for (let i = 0; i < this.vertices.length; ++i) {
      vectors[i] = new THREE.Vector3().fromArray(this.vertices[i]).normalize();
    }

    const chamferGeometry = DiceObject.getChamferGeometry(vectors, this.faces, this.chamfer);
    const geometry = DiceObject.makeGeometry(chamferGeometry.vectors, chamferGeometry.faces, radius, this.tab, this.af);

    const cannonShape = DiceObject.createCannonShape(vectors, this.faces, radius);

    return { geometry, cannonShape };
  }

  protected static calculateTextureSize(approx: number): number {
    return Math.max(128, Math.pow(2, Math.floor(Math.log(approx) / Math.log(2))));
  }

  private createTextTexture(text: string | number[], color: string, backColor: string): Texture {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const textureSize = DiceObject.calculateTextureSize(this.size / 2 + this.size * this.textMargin) * 2;
    const approximateFontSize = textureSize / (1 + 2 * this.textMargin);

    canvas.width = textureSize;
    canvas.height = textureSize;

    if (context) {
      context.font = `${approximateFontSize}pt Arial`;
      context.fillStyle = backColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = color;

      if (typeof text === "string") {
        context.fillText(text, canvas.width / 2, canvas.height / 2);
      }
    }

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;
  }

  private getMaterials(): MeshPhongMaterial[] {
    const materials: MeshPhongMaterial[] = [];

    for (let i = 0; i < this.faceTexts.length; ++i) {
      let texture = null;
      if (this.customTextTextureFunction) {
        texture = this.customTextTextureFunction(this.faceTexts[i], this.labelColor, this.diceColor);
      } else {
        texture = this.createTextTexture(this.faceTexts[i], this.labelColor, this.diceColor);
      }

      materials.push(new THREE.MeshPhongMaterial(Object.assign({}, this.materialOptions, { map: texture })));
    }

    return materials;
  }

  public getObject(): PhysicsDiceMesh {
    return this.object;
  }

  public create(): PhysicsDiceMesh {
    if (!DiceManager.world) {
      throw new Error("You must call DiceManager.setWorld(world) first.");
    }
    const { geometry, cannonShape } = this.buildGeometries();
    const diceMaterials = this.getMaterials();

    this.object = new THREE.Mesh(geometry, diceMaterials);

    this.object.castShadow = true;
    this.object.diceObject = this;

    this.object.body = new CANNON.Body({
      mass: this.mass,
      shape: cannonShape,
      material: DiceManager.diceBodyMaterial,
    });

    this.object.body.linearDamping = 0.1;
    this.object.body.angularDamping = 0.1;

    DiceManager.world.addBody(this.object.body);

    return this.object;
  }

  public updateMeshFromBody(): void {
    if (!this.simulationRunning) {
      this.object.position.copy(new Vector3(this.object.body?.position.x, this.object.body?.position.y, this.object.body?.position.z));

      this.object.quaternion.copy(
        new THREE.Quaternion(
          this.object.body?.quaternion.x,
          this.object.body?.quaternion.y,
          this.object.body?.quaternion.z,
          this.object.body?.quaternion.w
        )
      );
    }
  }

  public updateBodyFromMesh(): void {
    this.object.body?.position.copy(new Vec3(this.object.position.x, this.object.position.y, this.object.position.z));

    this.object.body?.quaternion.copy(
      new Quaternion(this.object.quaternion.x, this.object.quaternion.y, this.object.quaternion.z, this.object.quaternion.w)
    );
  }
}

export class DiceD4 extends DiceObject {
  constructor(options: DiceOptions) {
    super(options);

    this.tab = -0.1;
    this.af = (Math.PI * 7) / 6;
    this.chamfer = 0.96;
    this.vertices = [
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ];
    this.faces = [
      [1, 0, 2, 1],
      [0, 1, 3, 2],
      [0, 3, 2, 3],
      [1, 2, 3, 4],
    ];
    this.scaleFactor = 1.2;
    this.values = 4;
    this.faceTexts = [[], [0, 0, 0], [2, 4, 3], [1, 3, 4], [2, 1, 4], [1, 2, 3]];

    this.customTextTextureFunction = function (text, color, backColor) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const ts = DiceObject.calculateTextureSize(this.size / 2 + this.size * 2) * 2;
      canvas.width = canvas.height = ts;

      if (context !== null) {
        context.font = ts / 5 + "pt Arial";
        context.fillStyle = backColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = color;

        if (typeof text !== "string") {
          for (const i in text) {
            context.fillText(text[i].toString(), canvas.width / 2, canvas.height / 2 - ts * 0.3);

            context.translate(canvas.width / 2, canvas.height / 2);
            context.rotate((Math.PI * 2) / 3);
            context.translate(-canvas.width / 2, -canvas.height / 2);
          }
        }
      }

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };
    this.mass = 3;
    this.invertUpside = true;

    this.create();
  }
}

export class DiceD6 extends DiceObject {
  constructor(options: DiceOptions) {
    super(options);

    this.tab = 0.1;
    this.af = Math.PI / 4;
    this.chamfer = 0.96;
    this.vertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];
    this.faces = [
      [0, 3, 2, 1, 1],
      [1, 2, 6, 5, 2],
      [0, 1, 5, 4, 3],
      [3, 7, 6, 2, 4],
      [0, 4, 7, 3, 5],
      [4, 5, 6, 7, 6],
    ];
    this.scaleFactor = 0.9;
    this.values = 6;
    this.faceTexts = [" ", "0", "1", "2", "3", "4", "5", "6."];
    this.textMargin = 1.0;
    this.mass = 4;

    this.create();
  }
}

export class DiceD8 extends DiceObject {
  constructor(options: DiceOptions) {
    super(options);

    this.tab = 0;
    this.af = -Math.PI / 4 / 2;
    this.chamfer = 0.965;
    this.vertices = [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ];
    this.faces = [
      [0, 2, 4, 1],
      [0, 4, 3, 2],
      [0, 3, 5, 3],
      [0, 5, 2, 4],
      [1, 3, 4, 5],
      [1, 4, 2, 6],
      [1, 2, 5, 7],
      [1, 5, 3, 8],
    ];
    this.scaleFactor = 1;
    this.values = 8;
    this.faceTexts = [" ", "0", "1", "2", "3", "4", "5", "6.", "7", "8"];
    this.textMargin = 1.2;
    this.mass = 3;

    this.create();
  }
}

export class DiceD10 extends DiceObject {
  constructor(options: DiceOptions) {
    super(options);

    this.tab = 0;
    this.af = (Math.PI * 6) / 5;
    this.chamfer = 0.945;
    this.vertices = [];
    this.faces = [
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
      [1, 0, 2, -1],
      [1, 2, 3, -1],
      [3, 2, 4, -1],
      [3, 4, 5, -1],
      [5, 4, 6, -1],
      [5, 6, 7, -1],
      [7, 6, 8, -1],
      [7, 8, 9, -1],
      [9, 8, 0, -1],
      [9, 0, 1, -1],
    ];

    for (let i = 0, b = 0; i < 10; ++i, b += (Math.PI * 2) / 10) {
      this.vertices.push([Math.cos(b), Math.sin(b), 0.105 * (i % 2 ? 1 : -1)]);
    }
    this.vertices.push([0, 0, -1]);
    this.vertices.push([0, 0, 1]);

    this.scaleFactor = 0.9;
    this.values = 10;
    this.faceTexts = [" ", "0", "1", "2", "3", "4", "5", "6.", "7", "8", "9.", "0"];
    this.textMargin = 1.0;
    this.mass = 3;

    this.create();
  }
}

export class DiceD12 extends DiceObject {
  constructor(options: DiceOptions) {
    super(options);

    const p = (1 + Math.sqrt(5)) / 2;
    const q = 1 / p;

    this.tab = 0.2;
    this.af = -Math.PI / 4 / 2;
    this.chamfer = 0.968;
    this.vertices = [
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
    this.faces = [
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
    this.scaleFactor = 0.9;
    this.values = 12;
    this.faceTexts = [" ", "0", "1", "2", "3", "4", "5", "6.", "7", "8", "9.", "10", "11", "12"];
    this.textMargin = 1.0;
    this.mass = 6;

    this.create();
  }
}

export class DiceD20 extends DiceObject {
  constructor(options: DiceOptions) {
    super(options);

    const t = (1 + Math.sqrt(5)) / 2;

    this.tab = -0.2;
    this.af = -Math.PI / 4 / 2;
    this.chamfer = 0.955;
    this.vertices = [
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
    this.faces = [
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
    this.scaleFactor = 1;
    this.values = 20;
    this.faceTexts = [
      " ",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6.",
      "7",
      "8",
      "9.",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ];
    this.textMargin = 1.0;
    this.mass = 5;

    this.create();
  }
}

export const DiceManager = new DiceManagerClass();
