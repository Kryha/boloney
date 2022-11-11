// "use strict";
import * as CANNON from "cannon";
// import { World } from "cannon";
// import * as THREE from "three";

// class DiceManagerClass {
//   world: World | null;
//   diceBodyMaterial: CANNON.Material | undefined;
//   floorBodyMaterial: CANNON.Material | undefined;
//   barrierBodyMaterial: CANNON.Material | undefined;
//   throwRunning: any;
//   constructor() {
//     this.world = null;
//   }

//   setWorld(world: World | null) {
//     this.world = world;

//     this.diceBodyMaterial = new CANNON.Material("diceBody");
//     this.floorBodyMaterial = new CANNON.Material("floorBody");
//     this.barrierBodyMaterial = new CANNON.Material("barrierBody");
//     if (world) {
//       world.addContactMaterial(
//         new CANNON.ContactMaterial(this.floorBodyMaterial, this.diceBodyMaterial, { friction: 0.01, restitution: 0.5 })
//       );
//       world.addContactMaterial(
//         new CANNON.ContactMaterial(this.barrierBodyMaterial, this.diceBodyMaterial, { friction: 0, restitution: 1.0 })
//       );
//       world.addContactMaterial(new CANNON.ContactMaterial(this.diceBodyMaterial, this.diceBodyMaterial, { friction: 0, restitution: 0.5 }));
//     }
//   }

//   /**
//    *
//    * @param {array} diceValues
//    * @param {DiceObject} [diceValues.dice]
//    * @param {number} [diceValues.value]
//    *
//    */
//   prepareValues(diceValues: string | any[]) {
//     if (this.throwRunning) throw new Error("Cannot start another throw. Please wait, till the current throw is finished.");

//     for (let i = 0; i < diceValues.length; i++) {
//       if (diceValues[i].value < 1 || diceValues[i].dice.values < diceValues[i].value) {
//         throw new Error(
//           "Cannot throw die to value " + diceValues[i].value + ", because it has only " + diceValues[i].dice.values + " sides."
//         );
//       }
//     }

//     this.throwRunning = true;

//     for (let i = 0; i < diceValues.length; i++) {
//       diceValues[i].dice.simulationRunning = true;
//       diceValues[i].vectors = diceValues[i].dice.getCurrentVectors();
//       diceValues[i].stableCount = 0;
//     }

//     const check = () => {
//       let allStable = true;
//       for (let i = 0; i < diceValues.length; i++) {
//         if (diceValues[i].dice.isFinished()) {
//           diceValues[i].stableCount++;
//         } else {
//           diceValues[i].stableCount = 0;
//         }

//         if (diceValues[i].stableCount < 50) {
//           allStable = false;
//         }
//       }

//       if (allStable) {
//         console.log("all stable");
//         if (DiceManager.world) DiceManager.world.removeEventListener("postStep", check);

//         for (let i = 0; i < diceValues.length; i++) {
//           diceValues[i].dice.shiftUpperValue(diceValues[i].value);
//           diceValues[i].dice.resetBody();
//           diceValues[i].dice.setVectors(diceValues[i].vectors);
//           diceValues[i].dice.simulationRunning = false;
//         }

//         this.throwRunning = false;
//       } else {
//         if (DiceManager.world) DiceManager.world.step(DiceManager.world.dt);
//       }
//     };
//     if (this.world) this.world.addEventListener("postStep", check);
//   }
// }
// interface Options {
//   size: number;
//   fontColor: string;
//   backColor: string;
// }

// class DiceObject {
//   object: CANNON.Body | null;
//   size: any;
//   invertUpside: boolean;
//   materialOptions: { specular: number; color: number; shininess: number; flatShading: boolean };
//   labelColor: any;
//   diceColor: any;
//   values: any;
//   scaleFactor: any;
//   vertices: any;
//   textMargin: any;
//   faceTexts: any;
//   customTextTextureFunction: any;
//   mass: number | undefined;
//   simulationRunning: any;
//   /**
//    * @constructor
//    * @param {object} options
//    * @param {Number} [options.size = 100]
//    * @param {Number} [options.fontColor = '#000000']
//    * @param {Number} [options.backColor = '#ffffff']
//    */
//   constructor(options: Options) {
//     options = this.setDefaults(options, {
//       size: 100,
//       fontColor: "#000000",
//       backColor: "#ffffff",
//     });

//     this.object = null;
//     this.size = options.size;
//     this.invertUpside = false;

//     this.materialOptions = {
//       specular: 0x172022,
//       color: 0xf0f0f0,
//       shininess: 40,
//       flatShading: true,
//       //shading: THREE.FlatShading,
//     };
//     this.labelColor = options.fontColor;
//     this.diceColor = options.backColor;
//   }

//   setDefaults(
//     options: Options,
//     defaults: { [x: string]: any; size?: number; fontColor?: string; backColor?: string; hasOwnProperty?: any }
//   ) {
//     options = options || {};

//     for (const key in defaults) {
//       if (Object.prototype.hasOwnProperty.call(defaults, key)) continue;

//       if (!(key in options)) {
//         options = defaults[key];
//       }
//     }

//     return options;
//   }

//   emulateThrow(callback: (arg0: number) => void) {
//     let stableCount = 0;

//     const check = () => {
//       if (this.isFinished()) {
//         stableCount++;

//         if (stableCount === 50) {
//           if (DiceManager.world) DiceManager.world.removeEventListener("postStep", check);
//           callback(this.getUpsideValue());
//         }
//       } else {
//         stableCount = 0;
//       }

//       if (DiceManager.world) DiceManager.world.step(DiceManager.world.dt);
//     };

//     if (DiceManager.world) DiceManager.world.addEventListener("postStep", check);
//   }

//   isFinished() {
//     const threshold = 1;
//     // TODO: fix
//     if (this.object) {
//       const angularVelocity = this.object.angularVelocity;
//       const velocity = this.object.velocity;
//       return (
//         Math.abs(angularVelocity.x) < threshold &&
//         Math.abs(angularVelocity.y) < threshold &&
//         Math.abs(angularVelocity.z) < threshold &&
//         Math.abs(velocity.x) < threshold &&
//         Math.abs(velocity.y) < threshold &&
//         Math.abs(velocity.z) < threshold
//       );
//     }
//   }

//   getUpsideValue() {
//     const vector = new THREE.Vector3(0, this.invertUpside ? -1 : 1);
//     let closest_face;
//     let closest_angle = Math.PI * 2;
//     if (this.object) {
//       const normals = this.object.shapes;
//       for (let i = 0; i < this.object.geometry.groups.length; ++i) {
//         const face = this.object.geometry.groups[i];
//         if (face.materialIndex === 0) continue;

//         //Each group consists in 3 vertices of 3 elements (x, y, z) so the offset between faces in the Float32BufferAttribute is 9
//         const startVertex = i * 9;
//         const normal = new THREE.Vector3(normals[startVertex], normals[startVertex + 1], normals[startVertex + 2]);
//         const angle = normal.clone().applyQuaternion(this.object.body.quaternion).angleTo(vector);
//         if (angle < closest_angle) {
//           closest_angle = angle;
//           closest_face = face;
//         }
//       }
//     }
//     return closest_face.materialIndex - 1;
//   }

//   getCurrentVectors() {
//     if (this.object)
//       return {
//         position: this.object.position.clone(),
//         quaternion: this.object.quaternion.clone(),
//         velocity: this.object.velocity.clone(),
//         angularVelocity: this.object.angularVelocity.clone(),
//       };
//   }

//   setVectors(vectors) {
//     this.object.body.position = vectors.position;
//     this.object.body.quaternion = vectors.quaternion;
//     this.object.body.velocity = vectors.velocity;
//     this.object.body.angularVelocity = vectors.angularVelocity;
//   }

//   shiftUpperValue(toValue) {
//     const geometry = this.object.geometry.clone();

//     const fromValue = this.getUpsideValue();
//     for (let i = 0, l = geometry.groups.length; i < l; ++i) {
//       let materialIndex = geometry.groups[i].materialIndex;
//       if (materialIndex === 0) continue;

//       materialIndex += toValue - fromValue - 1;
//       while (materialIndex > this.values) materialIndex -= this.values;
//       while (materialIndex < 1) materialIndex += this.values;

//       geometry.groups[i].materialIndex = materialIndex + 1;
//     }

//     this.updateMaterialsForValue(toValue - fromValue);

//     this.object.geometry = geometry;
//   }

//   getChamferGeometry(vectors, faces, chamfer) {
//     const chamfer_vectors = [],
//       chamfer_faces = [],
//       corner_faces = new Array(vectors.length);
//     for (let i = 0; i < vectors.length; ++i) corner_faces[i] = [];
//     for (let i = 0; i < faces.length; ++i) {
//       const ii = faces[i],
//         fl = ii.length - 1;
//       const center_point = new THREE.Vector3();
//       const face = new Array(fl);
//       for (let j = 0; j < fl; ++j) {
//         const vv = vectors[ii[j]].clone();
//         center_point.add(vv);
//         corner_faces[ii[j]].push((face[j] = chamfer_vectors.push(vv) - 1));
//       }
//       center_point.divideScalar(fl);
//       for (let j = 0; j < fl; ++j) {
//         const vv = chamfer_vectors[face[j]];
//         vv.subVectors(vv, center_point).multiplyScalar(chamfer).addVectors(vv, center_point);
//       }
//       face.push(ii[fl]);
//       chamfer_faces.push(face);
//     }
//     for (let i = 0; i < faces.length - 1; ++i) {
//       for (let j = i + 1; j < faces.length; ++j) {
//         let pairs = [],
//           lastm = -1;
//         for (let m = 0; m < faces[i].length - 1; ++m) {
//           const n = faces[j].indexOf(faces[i][m]);
//           if (n >= 0 && n < faces[j].length - 1) {
//             if (lastm >= 0 && m !== lastm + 1) pairs.unshift([i, m], [j, n]);
//             else pairs.push([i, m], [j, n]);
//             lastm = m;
//           }
//         }
//         if (pairs.length !== 4) continue;
//         chamfer_faces.push([
//           chamfer_faces[pairs[0][0]][pairs[0][1]],
//           chamfer_faces[pairs[1][0]][pairs[1][1]],
//           chamfer_faces[pairs[3][0]][pairs[3][1]],
//           chamfer_faces[pairs[2][0]][pairs[2][1]],
//           -1,
//         ]);
//       }
//     }
//     for (let i = 0; i < corner_faces.length; ++i) {
//       let cf = corner_faces[i],
//         face = [cf[0]],
//         count = cf.length - 1;
//       while (count) {
//         for (let m = faces.length; m < chamfer_faces.length; ++m) {
//           let index = chamfer_faces[m].indexOf(face[face.length - 1]);
//           if (index >= 0 && index < 4) {
//             if (--index === -1) index = 3;
//             const next_vertex = chamfer_faces[m][index];
//             if (cf.indexOf(next_vertex) >= 0) {
//               face.push(next_vertex);
//               break;
//             }
//           }
//         }
//         --count;
//       }
//       face.push(-1);
//       chamfer_faces.push(face);
//     }
//     return { vectors: chamfer_vectors, faces: chamfer_faces };
//   }

//   makeGeometry(vertices, faces, radius, tab, af) {
//     const geom = new THREE.BufferGeometry();

//     for (let i = 0; i < vertices.length; ++i) {
//       vertices[i] = vertices[i].multiplyScalar(radius);
//     }

//     const positions = [];
//     const normals = [];
//     const uvs = [];

//     const cb = new THREE.Vector3();
//     const ab = new THREE.Vector3();
//     let materialIndex;
//     let faceFirstVertexIndex = 0;

//     for (let i = 0; i < faces.length; ++i) {
//       const ii = faces[i],
//         fl = ii.length - 1;
//       const aa = (Math.PI * 2) / fl;
//       materialIndex = ii[fl] + 1;
//       for (let j = 0; j < fl - 2; ++j) {
//         //Vertices
//         positions.push(...vertices[ii[0]].toArray());
//         positions.push(...vertices[ii[j + 1]].toArray());
//         positions.push(...vertices[ii[j + 2]].toArray());

//         // Flat face normals
//         cb.subVectors(vertices[ii[j + 2]], vertices[ii[j + 1]]);
//         ab.subVectors(vertices[ii[0]], vertices[ii[j + 1]]);
//         cb.cross(ab);
//         cb.normalize();

//         // Vertex Normals
//         normals.push(...cb.toArray());
//         normals.push(...cb.toArray());
//         normals.push(...cb.toArray());

//         //UVs
//         uvs.push((Math.cos(af) + 1 + tab) / 2 / (1 + tab), (Math.sin(af) + 1 + tab) / 2 / (1 + tab));
//         uvs.push((Math.cos(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab), (Math.sin(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab));
//         uvs.push((Math.cos(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab), (Math.sin(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab));
//       }

//       //Set Group for face materials.
//       const numOfVertices = (fl - 2) * 3;
//       for (let i = 0; i < numOfVertices / 3; i++) {
//         geom.addGroup(faceFirstVertexIndex, 3, materialIndex);
//         faceFirstVertexIndex += 3;
//       }
//     }

//     geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
//     geom.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
//     geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
//     geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);
//     return geom;
//   }

//   createShape(vertices, faces, radius) {
//     const cv = new Array(vertices.length),
//       cf = new Array(faces.length);
//     for (let i = 0; i < vertices.length; ++i) {
//       const v = vertices[i];
//       cv[i] = new CANNON.Vec3(v.x * radius, v.y * radius, v.z * radius);
//     }
//     for (let i = 0; i < faces.length; ++i) {
//       cf[i] = faces[i].slice(0, faces[i].length - 1);
//     }
//     return new CANNON.ConvexPolyhedron(cv, cf);
//   }

//   getGeometry() {
//     const radius = this.size * this.scaleFactor;

//     const vectors = new Array(this.vertices.length);
//     for (let i = 0; i < this.vertices.length; ++i) {
//       vectors[i] = new THREE.Vector3().fromArray(this.vertices[i]).normalize();
//     }

//     const chamferGeometry = this.getChamferGeometry(vectors, this.faces, this.chamfer);
//     const geometry = this.makeGeometry(chamferGeometry.vectors, chamferGeometry.faces, radius, this.tab, this.af);
//     geometry.cannon_shape = this.createShape(vectors, this.faces, radius);

//     return geometry;
//   }
//   faces(vectors: any[], faces: any, chamfer: any) {
//     throw new Error("Method not implemented.");
//   }
//   chamfer(vectors: any[], faces: any, chamfer: any) {
//     throw new Error("Method not implemented.");
//   }
//   tab(vectors: any[], faces: any[][], radius: number, tab: any, af: any) {
//     throw new Error("Method not implemented.");
//   }
//   af(vectors: any[], faces: any[][], radius: number, tab: any, af: any) {
//     throw new Error("Method not implemented.");
//   }

//   calculateTextureSize(approx) {
//     return Math.max(128, Math.pow(2, Math.floor(Math.log(approx) / Math.log(2))));
//   }

//   createTextTexture(text, color, backColor) {
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");
//     const ts = this.calculateTextureSize(this.size / 2 + this.size * this.textMargin) * 2;
//     canvas.width = canvas.height = ts;
//     context.font = ts / (1 + 2 * this.textMargin) + "pt Arial";
//     context.fillStyle = backColor;
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     context.textAlign = "center";
//     context.textBaseline = "middle";
//     context.fillStyle = color;
//     context.fillText(text, canvas.width / 2, canvas.height / 2);
//     const texture = new THREE.Texture(canvas);
//     texture.needsUpdate = true;
//     return texture;
//   }

//   getMaterials() {
//     const materials = [];
//     for (let i = 0; i < this.faceTexts.length; ++i) {
//       let texture = null;
//       if (this.customTextTextureFunction) {
//         texture = this.customTextTextureFunction(this.faceTexts[i], this.labelColor, this.diceColor);
//       } else {
//         texture = this.createTextTexture(this.faceTexts[i], this.labelColor, this.diceColor);
//       }

//       materials.push(new THREE.MeshPhongMaterial(Object.assign({}, this.materialOptions, { map: texture })));
//     }
//     return materials;
//   }

//   getObject() {
//     return this.object;
//   }

//   create() {
//     if (!DiceManager.world) throw new Error("You must call DiceManager.setWorld(world) first.");
//     this.object = new THREE.Mesh(this.getGeometry(), this.getMaterials());

//     this.object.reveiceShadow = true;
//     this.object.castShadow = true;
//     this.object.diceObject = this;
//     this.object.body = new CANNON.Body({
//       mass: this.mass,
//       shape: this.object.geometry.cannon_shape,
//       material: DiceManager.diceBodyMaterial,
//     });
//     this.object.body.linearDamping = 0.1;
//     this.object.body.angularDamping = 0.1;
//     DiceManager.world.add(this.object.body);

//     return this.object;
//   }

//   updateMeshFromBody() {
//     if (!this.simulationRunning) {
//       this.object.position.copy(this.object.body.position);
//       this.object.quaternion.copy(this.object.body.quaternion);
//     }
//   }

//   updateBodyFromMesh() {
//     this.object.body.position.copy(this.object.position);
//     this.object.body.quaternion.copy(this.object.quaternion);
//   }

//   resetBody() {
//     if (this.object) {
//       this.object.body.vlambda = new CANNON.Vec3();
//       //this.object.body.collisionResponse = true;
//       this.object.body.position = new CANNON.Vec3();
//       this.object.body.previousPosition = new CANNON.Vec3();
//       this.object.body.initPosition = new CANNON.Vec3();
//       this.object.body.velocity = new CANNON.Vec3();
//       this.object.body.initVelocity = new CANNON.Vec3();
//       this.object.body.force = new CANNON.Vec3();
//       //this.object.body.sleepState = 0;
//       //this.object.body.timeLastSleepy = 0;
//       //this.object.body._wakeUpAfterNarrowphase = false;
//       this.object.body.torque = new CANNON.Vec3();
//       this.object.body.quaternion = new CANNON.Quaternion();
//       this.object.body.initQuaternion = new CANNON.Quaternion();
//       this.object.body.angularVelocity = new CANNON.Vec3();
//       this.object.body.initAngularVelocity = new CANNON.Vec3();
//       this.object.body.interpolatedPosition = new CANNON.Vec3();
//       this.object.body.interpolatedQuaternion = new CANNON.Quaternion();
//       this.object.body.inertia = new CANNON.Vec3();
//       this.object.body.invInertia = new CANNON.Vec3();
//       this.object.body.invInertiaWorld = new CANNON.Mat3();
//       //this.object.body.invMassSolve = 0;
//       this.object.body.invInertiaSolve = new CANNON.Vec3();
//       this.object.body.invInertiaWorldSolve = new CANNON.Mat3();
//       //this.object.body.aabb = new CANNON.AABB();
//       //this.object.body.aabbNeedsUpdate = true;
//       this.object.body.wlambda = new CANNON.Vec3();

//       this.object.body.updateMassProperties();
//     }
//   }

//   updateMaterialsForValue(diceValue) {}
// }

// export class DiceD4 extends DiceObject {
//   d4FaceTexts: number[][][];
//   inertia: number;
//   constructor(options) {
//     super(options);

//     this.tab = -0.1;
//     this.af = (Math.PI * 7) / 6;
//     this.chamfer = 0.96;
//     this.vertices = [
//       [1, 1, 1],
//       [-1, -1, 1],
//       [-1, 1, -1],
//       [1, -1, -1],
//     ];
//     this.faces = [
//       [1, 0, 2, 1],
//       [0, 1, 3, 2],
//       [0, 3, 2, 3],
//       [1, 2, 3, 4],
//     ];
//     this.scaleFactor = 1.2;
//     this.values = 4;
//     this.d4FaceTexts = [
//       [[], [0, 0, 0], [2, 4, 3], [1, 3, 4], [2, 1, 4], [1, 2, 3]],
//       [[], [0, 0, 0], [2, 3, 4], [3, 1, 4], [2, 4, 1], [3, 2, 1]],
//       [[], [0, 0, 0], [4, 3, 2], [3, 4, 1], [4, 2, 1], [3, 1, 2]],
//       [[], [0, 0, 0], [4, 2, 3], [1, 4, 3], [4, 1, 2], [1, 3, 2]],
//     ];
//     this.faceTexts = this.d4FaceTexts[0];
//     this.updateMaterialsForValue = function (diceValue) {
//       if (diceValue < 0) diceValue += 4;
//       this.faceTexts = this.d4FaceTexts[diceValue];
//       this.object.material = this.getMaterials();
//     };
//     this.customTextTextureFunction = function (text, color, backColor) {
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");
//       const ts = this.calculateTextureSize(this.size / 2 + this.size * 2) * 2;
//       canvas.width = canvas.height = ts;
//       context.font = ts / 5 + "pt Arial";
//       context.fillStyle = backColor;
//       context.fillRect(0, 0, canvas.width, canvas.height);
//       context.textAlign = "center";
//       context.textBaseline = "middle";
//       context.fillStyle = color;
//       for (const i in text) {
//         context.fillText(text[i], canvas.width / 2, canvas.height / 2 - ts * 0.3);
//         context.translate(canvas.width / 2, canvas.height / 2);
//         context.rotate((Math.PI * 2) / 3);
//         context.translate(-canvas.width / 2, -canvas.height / 2);
//       }
//       const texture = new THREE.Texture(canvas);
//       texture.needsUpdate = true;
//       return texture;
//     };
//     this.mass = 300;
//     this.inertia = 5;
//     this.invertUpside = true;

//     this.create();
//   }
// }

// export class DiceD6 extends DiceObject {
//   inertia: number;
//   constructor(options) {
//     super(options);

//     this.tab = 0.1;
//     this.af = Math.PI / 4;
//     this.chamfer = 0.96;
//     this.vertices = [
//       [-1, -1, -1],
//       [1, -1, -1],
//       [1, 1, -1],
//       [-1, 1, -1],
//       [-1, -1, 1],
//       [1, -1, 1],
//       [1, 1, 1],
//       [-1, 1, 1],
//     ];
//     this.faces = [
//       [0, 3, 2, 1, 1],
//       [1, 2, 6, 5, 2],
//       [0, 1, 5, 4, 3],
//       [3, 7, 6, 2, 4],
//       [0, 4, 7, 3, 5],
//       [4, 5, 6, 7, 6],
//     ];
//     this.scaleFactor = 0.9;
//     this.values = 6;
//     this.faceTexts = [
//       " ",
//       "0",
//       "1",
//       "2",
//       "3",
//       "4",
//       "5",
//       "6",
//       "7",
//       "8",
//       "9",
//       "10",
//       "11",
//       "12",
//       "13",
//       "14",
//       "15",
//       "16",
//       "17",
//       "18",
//       "19",
//       "20",
//     ];
//     this.textMargin = 1.0;
//     this.mass = 300;
//     this.inertia = 13;

//     this.create();
//   }
// }

// //---------------------------------------------//

// export const DiceManager = new DiceManagerClass();

// if (typeof define === "function" && define.amd) {
//   define(function () {
//     return {
//       DiceManager: DiceManager,
//       DiceD4: DiceD4,
//       DiceD6: DiceD6,
//       DiceD8: DiceD8,
//       DiceD10: DiceD10,
//       DiceD12: DiceD12,
//       DiceD20: DiceD20,
//     };
//   });
// } else if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
//   module.exports = {
//     DiceManager: DiceManager,
//     DiceD4: DiceD4,
//     DiceD6: DiceD6,
//     DiceD8: DiceD8,
//     DiceD10: DiceD10,
//     DiceD12: DiceD12,
//     DiceD20: DiceD20,
//   };
// } else {
//   window.Dice = {
//     DiceManager: DiceManager,
//     DiceD4: DiceD4,
//     DiceD6: DiceD6,
//     DiceD8: DiceD8,
//     DiceD10: DiceD10,
//     DiceD12: DiceD12,
//     DiceD20: DiceD20,
//   };
// }
