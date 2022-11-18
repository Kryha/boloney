import * as CANNON from "cannon";
import * as THREE from "three";
import { BufferGeometry } from "three";

const zeroDie = "src/assets/images/zero-die.png";
const zeroOneDie = "src/assets/images/zero-one-die.png";
const oneDie = "src/assets/images/one-die.png";
const twoDie = "src/assets/images/two-die.png";
const threeDie = "src/assets/images/three-die.png";
const fourDie = "src/assets/images/four-die.png";
const fiveDie = "src/assets/images/five-die.png";
const sixDie = "src/assets/images/six-die.png";

class DiceManagerClass {
  diceBodyMaterial?: CANNON.Material;
  floorBodyMaterial?: CANNON.Material;
  barrierBodyMaterial?: CANNON.Material;
  world!: CANNON.World;
  public throwRunning = false;

  setWorld(world: CANNON.World) {
    this.world = world;

    this.diceBodyMaterial = new CANNON.Material("diceBody");
    this.floorBodyMaterial = new CANNON.Material("floorBody");
    this.barrierBodyMaterial = new CANNON.Material("barrierBody");

    world.addContactMaterial(
      new CANNON.ContactMaterial(this.floorBodyMaterial, this.diceBodyMaterial, {
        friction: 0.01,
        restitution: 0.5,
      })
    );
    world.addContactMaterial(
      new CANNON.ContactMaterial(this.barrierBodyMaterial, this.diceBodyMaterial, {
        friction: 0,
        restitution: 1.0,
      })
    );
    world.addContactMaterial(new CANNON.ContactMaterial(this.diceBodyMaterial, this.diceBodyMaterial, { friction: 0, restitution: 0.5 }));
  }

  prepareValues(diceValues: { dice: DiceObject; value: number; vectors?: Vectors; stableCount?: number }[]) {
    if (this.throwRunning) throw new Error("Cannot start another throw. Please wait, till the current throw is finished.");

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
      for (const value of diceValues) {
        if (value.dice.isFinished() && value.stableCount != null) {
          value.stableCount++;
        } else {
          value.stableCount = 0;
        }

        if (value.stableCount < 50) {
          allStable = false;
        }
      }

      if (allStable) {
        DiceManager.world.removeEventListener("postStep", check);

        for (const value of diceValues) {
          value.dice.shiftUpperValue(value.value);
          value.dice.resetBody();
          value.dice.setVectors(value.vectors!);
          value.dice.simulationRunning = false;
        }

        this.throwRunning = false;
      } else {
        DiceManager.world.step(DiceManager.world.dt);
      }
    };

    this.world.addEventListener("postStep", check);
  }
}

export interface DiceOptions {
  size: number;
  fontColor: string;
  backColor: string;
}

interface Vectors {
  position: CANNON.Vec3;
  quaternion: CANNON.Quaternion;
  velocity: CANNON.Vec3;
  angularVelocity: CANNON.Vec3;
}

type Faces = number[][];

export abstract class DiceObject {
  object!: THREE.Mesh & { body?: CANNON.Body; diceObject?: DiceObject };
  size: number;
  invertUpside: boolean;
  materialOptions: {
    specular: number;
    color: number;
    shininess: number;
    flatShading: boolean;
  };
  labelColor: string;
  diceColor: string;

  tab!: number;
  af!: number;
  chamfer!: number;
  vertices!: number[][];
  faces!: number[][];
  scaleFactor!: number;
  values!: number;
  d4FaceTexts!: number[][][];
  faceTexts!: (string | number[])[];
  textMargin!: number;
  mass!: number;
  inertia!: number;
  simulationRunning = false;

  customTextTextureFunction?: (...any: any[]) => THREE.Texture;

  constructor(options: DiceOptions) {
    options = this.setDefaults(options, {
      size: 100,
      fontColor: "#000000",
      backColor: "#ffffff",
    });

    (this.object as any) = null;
    this.size = options.size;
    this.invertUpside = false;

    this.materialOptions = {
      specular: 0x172022,
      color: 0xf0f0f0,
      shininess: 1,
      flatShading: true,
    };
    this.labelColor = options.fontColor;
    this.diceColor = options.backColor;
  }

  setDefaults(options: DiceOptions, defaults: DiceOptions) {
    return { ...defaults, ...options };
  }

  emulateThrow(callback: (value: number) => void) {
    let stableCount = 0;

    const check = () => {
      if (this.isFinished()) {
        stableCount++;

        if (stableCount === 50) {
          DiceManager.world.removeEventListener("postStep", check);
          callback(this.getUpsideValue());
        }
      } else {
        stableCount = 0;
      }

      DiceManager.world.step(DiceManager.world.dt);
    };

    DiceManager.world.addEventListener("postStep", check);
  }

  isFinished() {
    const threshold = 1;

    const angularVelocity = this.object?.body?.angularVelocity ?? new CANNON.Vec3(1, 1, 1);
    const velocity = this.object?.body?.velocity ?? new CANNON.Vec3(1, 1, 1);

    return [angularVelocity.x, angularVelocity.y, angularVelocity.z, velocity.x, velocity.y, velocity.z].every((v) => v < threshold);
  }

  getUpsideValue() {
    if (!this.object?.body) throw new Error("object not initialized");
    const vector = new THREE.Vector3(0, this.invertUpside ? -1 : 1);
    let closestFace;
    let closestAngle = Math.PI * 2;

    const geometry = this.object?.geometry as BufferGeometry;
    const normals = geometry.getAttribute("normal").array;
    for (let i = 0; i < (geometry.groups.length ?? 0); ++i) {
      const face = geometry.groups[i];
      if (face?.materialIndex === 0) continue;

      //Each group consists in 3 vertices of 3 elements (x, y, z) so the offset between faces in the Float32BufferAttribute is 9
      const startVertex = i * 9;
      const normal = new THREE.Vector3(normals?.[startVertex], normals?.[startVertex + 1], normals?.[startVertex + 2]);
      const angle = normal
        .clone()
        .applyQuaternion(this.object.body.quaternion as unknown as THREE.Quaternion)
        .angleTo(vector);
      if (angle < closestAngle) {
        closestAngle = angle;
        closestFace = face;
      }
    }

    return (closestFace?.materialIndex ?? 0) - 1;
  }

  getCurrentVectors(): Vectors {
    if (!this.object?.body) throw new Error("object not initialized");
    return {
      position: this.object.body.position.clone(),
      quaternion: this.object.body.quaternion.clone(),
      velocity: this.object.body.velocity.clone(),
      angularVelocity: this.object.body.angularVelocity.clone(),
    };
  }

  setVectors(vectors: Vectors) {
    if (!this.object?.body) throw new Error("object not initialized");
    this.object.body.position = vectors.position;
    this.object.body.quaternion = vectors.quaternion;
    this.object.body.velocity = vectors.velocity;
    this.object.body.angularVelocity = vectors.angularVelocity;
  }

  shiftUpperValue(toValue: number) {
    if (!this.object?.body) throw new Error("object not initialized");
    const geometry = (this.object?.geometry as BufferGeometry).clone();

    const fromValue = this.getUpsideValue();
    for (let i = 0, l = geometry.groups.length; i < l; ++i) {
      let materialIndex = geometry.groups[i].materialIndex ?? 0;
      if (materialIndex === 0) continue;

      materialIndex += toValue - fromValue - 1;
      while (materialIndex > this.values) materialIndex -= this.values;
      while (materialIndex < 1) materialIndex += this.values;

      geometry.groups[i].materialIndex = materialIndex + 1;
    }

    this.updateMaterialsForValue(toValue - fromValue);

    this.object.geometry = geometry;
  }

  getChamferGeometry(vectors: THREE.Vector3[], faces: number[][], chamfer: number) {
    const chamfer_vectors = [],
      chamfer_faces = [],
      corner_faces = new Array(vectors.length);
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
        if (pairs.length !== 4) continue;
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
      const cf = corner_faces[i];
      const face = [cf[0]];
      let count = cf.length - 1;
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

  makeGeometry(vertices: THREE.Vector3[], faces: Faces, radius: number, tab: number, af: number) {
    const geom: THREE.BufferGeometry & { cannonShape?: CANNON.Shape } = new THREE.BufferGeometry();

    for (let i = 0; i < vertices.length; ++i) {
      vertices[i] = vertices[i].multiplyScalar(radius);
    }

    const positions = [];
    const normals = [];
    const uvs = [];

    const cb = new THREE.Vector3();
    const ab = new THREE.Vector3();
    let materialIndex;
    let faceFirstVertexIndex = 0;

    for (let i = 0; i < faces.length; ++i) {
      const ii = faces[i],
        fl = ii.length - 1;
      const aa = (Math.PI * 2) / fl;
      materialIndex = ii[fl] + 1;
      for (let j = 0; j < fl - 2; ++j) {
        //Vertices
        positions.push(...vertices[ii[0]].toArray());
        positions.push(...vertices[ii[j + 1]].toArray());
        positions.push(...vertices[ii[j + 2]].toArray());

        // Flat face normals
        cb.subVectors(vertices[ii[j + 2]], vertices[ii[j + 1]]);
        ab.subVectors(vertices[ii[0]], vertices[ii[j + 1]]);
        cb.cross(ab);
        cb.normalize();

        // Vertex Normals
        normals.push(...cb.toArray());
        normals.push(...cb.toArray());
        normals.push(...cb.toArray());

        //UVs
        uvs.push((Math.cos(af) + 1 + tab) / 2 / (1 + tab), (Math.sin(af) + 1 + tab) / 2 / (1 + tab));
        uvs.push((Math.cos(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab), (Math.sin(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab));
        uvs.push((Math.cos(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab), (Math.sin(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab));
      }

      //Set Group for face materials.
      const numOfVertices = (fl - 2) * 3;
      for (let i = 0; i < numOfVertices / 3; i++) {
        geom.addGroup(faceFirstVertexIndex, 3, materialIndex);
        faceFirstVertexIndex += 3;
      }
    }

    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);
    return geom;
  }

  createShape(vertices: THREE.Vector3[], faces: Faces, radius: number) {
    const cv = new Array(vertices.length),
      cf = new Array(faces.length);
    for (let i = 0; i < vertices.length; ++i) {
      const v = vertices[i];
      cv[i] = new CANNON.Vec3(v.x * radius, v.y * radius, v.z * radius);
    }
    for (let i = 0; i < faces.length; ++i) {
      cf[i] = faces[i].slice(0, faces[i].length - 1);
    }
    return new CANNON.ConvexPolyhedron(cv, cf);
  }

  getGeometry() {
    const radius = this.size * this.scaleFactor;

    const vectors = new Array(this.vertices.length);
    for (let i = 0; i < this.vertices.length; ++i) {
      vectors[i] = new THREE.Vector3().fromArray(this.vertices[i]).normalize();
    }

    const chamferGeometry = this.getChamferGeometry(vectors, this.faces, this.chamfer);
    const geometry = this.makeGeometry(chamferGeometry.vectors, chamferGeometry.faces, radius, this.tab, this.af);
    geometry.cannonShape = this.createShape(vectors, this.faces, radius);

    return geometry;
  }

  calculateTextureSize(approx: number) {
    return Math.max(128, Math.pow(2, Math.floor(Math.log(approx) / Math.log(2))));
  }

  createTextTexture(text: string, color: string, backColor: string) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("failed to initialize canvas");
    const ts = this.calculateTextureSize(this.size / 2 + this.size * this.textMargin) * 2;
    canvas.width = canvas.height = ts;
    context.font = ts / (1 + 2 * this.textMargin) + "pt Arial";
    context.fillStyle = backColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = color;
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  getMaterials() {
    const materials = [];
    for (let i = 0; i < (this.faceTexts?.length ?? 0); ++i) {
      // TODO: make smart component
      const texture0 = new THREE.TextureLoader().load(zeroDie);
      materials.push(new THREE.MeshPhongMaterial(Object.assign({}, this.materialOptions, { map: texture0 })));
      const texture01 = new THREE.TextureLoader().load(zeroOneDie);
      materials.push(new THREE.MeshPhongMaterial(Object.assign({}, this.materialOptions, { map: texture01 })));
      const texture1 = new THREE.TextureLoader().load(oneDie);
      materials.push(new THREE.MeshPhongMaterial(Object.assign({}, this.materialOptions, { map: texture1 })));
      const texture2 = new THREE.TextureLoader().load(twoDie);
      materials.push(new THREE.MeshPhongMaterial(Object.assign({}, this.materialOptions, { map: texture2 })));
      const texture3 = new THREE.TextureLoader().load(threeDie);
      materials.push(new THREE.MeshPhongMaterial(Object.assign({}, this.materialOptions, { map: texture3 })));
      const texture4 = new THREE.TextureLoader().load(fourDie);
      materials.push(new THREE.MeshPhongMaterial(Object.assign({}, this.materialOptions, { map: texture4 })));
      const texture5 = new THREE.TextureLoader().load(fiveDie);
      materials.push(new THREE.MeshPhongMaterial(Object.assign({}, this.materialOptions, { map: texture5 })));
      const texture6 = new THREE.TextureLoader().load(sixDie);
      materials.push(new THREE.MeshPhongMaterial(Object.assign({}, this.materialOptions, { map: texture6 })));
    }
    return materials;
  }

  getObject() {
    return this.object;
  }

  create() {
    if (!DiceManager.world) throw new Error("You must call DiceManager.setWorld(world) first.");
    this.object = new THREE.Mesh(this.getGeometry(), this.getMaterials());

    this.object.receiveShadow = true;
    this.object.castShadow = true;
    this.object.diceObject = this;
    this.object.body = new CANNON.Body({
      mass: this.mass,
      shape: (this.object.geometry as any).cannonShape,
      material: DiceManager.diceBodyMaterial,
    });
    this.object.body.linearDamping = 0.1;
    this.object.body.angularDamping = 0.1;
    DiceManager.world.addBody(this.object.body);

    return this.object;
  }

  updateMeshFromBody() {
    if (!this.object?.body) throw new Error("object not initialized");
    if (!this.simulationRunning) {
      this.object.position.copy(this.object.body.position as any);
      this.object.quaternion.copy(this.object.body.quaternion as any);
    }
  }

  updateBodyFromMesh() {
    if (!this.object?.body) throw new Error("object not initialized");
    this.object.body.position.copy(this.object.position as any);
    this.object.body.quaternion.copy(this.object.quaternion as any);
  }

  resetBody() {
    if (!this.object?.body) throw new Error("object not initialized");
    this.object.body.vlambda = new CANNON.Vec3();
    //this.object.body.collisionResponse = true;
    this.object.body.position = new CANNON.Vec3();
    this.object.body.previousPosition = new CANNON.Vec3();
    this.object.body.initPosition = new CANNON.Vec3();
    this.object.body.velocity = new CANNON.Vec3();
    this.object.body.initVelocity = new CANNON.Vec3();
    this.object.body.force = new CANNON.Vec3();
    //this.object.body.sleepState = 0;
    //this.object.body.timeLastSleepy = 0;
    //this.object.body._wakeUpAfterNarrowphase = false;
    this.object.body.torque = new CANNON.Vec3();
    this.object.body.quaternion = new CANNON.Quaternion();
    this.object.body.initQuaternion = new CANNON.Quaternion();
    this.object.body.angularVelocity = new CANNON.Vec3();
    this.object.body.initAngularVelocity = new CANNON.Vec3();
    this.object.body.interpolatedPosition = new CANNON.Vec3();
    this.object.body.interpolatedQuaternion = new CANNON.Quaternion();
    this.object.body.inertia = new CANNON.Vec3();
    this.object.body.invInertia = new CANNON.Vec3();
    this.object.body.invInertiaWorld = new CANNON.Mat3();
    //this.object.body.invMassSolve = 0;
    this.object.body.invInertiaSolve = new CANNON.Vec3();
    // @ts-ignore
    this.object.body.invInertiaWorldSolve = new CANNON.Mat3();
    //this.object.body.aabb = new CANNON.AABB();
    //this.object.body.aabbNeedsUpdate = true;
    this.object.body.wlambda = new CANNON.Vec3();

    this.object.body.updateMassProperties();
  }

  updateMaterialsForValue(diceValue: any) {
    //
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
    this.d4FaceTexts = [
      [[], [0, 0, 0], [2, 4, 3], [1, 3, 4], [2, 1, 4], [1, 2, 3]],
      [[], [0, 0, 0], [2, 3, 4], [3, 1, 4], [2, 4, 1], [3, 2, 1]],
      [[], [0, 0, 0], [4, 3, 2], [3, 4, 1], [4, 2, 1], [3, 1, 2]],
      [[], [0, 0, 0], [4, 2, 3], [1, 4, 3], [4, 1, 2], [1, 3, 2]],
    ];
    this.faceTexts = this.d4FaceTexts[0];
    this.updateMaterialsForValue = function (diceValue) {
      if (diceValue < 0) diceValue += 4;
      this.faceTexts = this.d4FaceTexts[diceValue];
      this.object.material = this.getMaterials();
    };
    this.customTextTextureFunction = function (text, color, backColor) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) throw new Error("failed to initialize canvas");
      const ts = this.calculateTextureSize(this.size / 2 + this.size * 2) * 2;
      canvas.width = canvas.height = ts;
      context.font = ts / 5 + "pt Arial";
      context.fillStyle = backColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = color;
      for (const i in text) {
        context.fillText(text[i], canvas.width / 2, canvas.height / 2 - ts * 0.3);
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate((Math.PI * 2) / 3);
        context.translate(-canvas.width / 2, -canvas.height / 2);
      }
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };
    this.mass = 300;
    this.inertia = 5;
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
    this.scaleFactor = 0.5;
    this.values = 6;
    this.faceTexts = [" ", "", "1", "2", "3", "4", "5", "6", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

    this.textMargin = 2;
    this.mass = 300;
    this.inertia = 13;

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
    this.faceTexts = [
      " ",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
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
    this.textMargin = 1.2;
    this.mass = 340;
    this.inertia = 10;

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
    this.faceTexts = [
      " ",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
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
    this.mass = 350;
    this.inertia = 9;

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
    this.faceTexts = [
      " ",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
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
    this.mass = 350;
    this.inertia = 8;

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
      "6",
      "7",
      "8",
      "9",
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
    this.mass = 400;
    this.inertia = 6;

    this.create();
  }
}

export class DiceD100 extends DiceObject {
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
    this.faceTexts = ["", "", "00", "10", "20", "30", "40", "50", "60", "70", "80", "90", "00"];
    this.textMargin = 2.0;
    this.mass = 350;
    this.inertia = 9;

    // @ts-ignore
    this.create();
  }
}

export class DiceD100D10 extends DiceObject {
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
    this.faceTexts = [
      " ",
      "0",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
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
    this.mass = 350;
    this.inertia = 9;

    this.create();
  }
}

export const DiceManager = new DiceManagerClass();
