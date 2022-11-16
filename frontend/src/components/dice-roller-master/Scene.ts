import * as THREE from "three";
import * as CANNON from "cannon";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import icosahedronTemplate from "./icosahedron";

const D6_MODEL_URL = "/src/components/dice-roller-master/d6/scene.gltf";
const D20_MODEL_URL = "/src/components/dice-roller-master/d20/scene.gltf";
interface Vectors {
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  angularVelocity: { x: number; y: number; z: number };
}
interface AllVectors {
  position: CANNON.Vec3;
  velocity: CANNON.Vec3;
  angularVelocity: CANNON.Vec3;
  quaternion: CANNON.Quaternion;
}
export interface DiceValue {
  body: CANNON.Body;
  value: number;
  vectors: AllVectors;
  stableCount: number;
  dice: {
    values: number;
    simulationRunning: boolean;
  };
}

interface Dice {
  physicsBody: CANNON.Body;
  renderBody: THREE.Object3D;
}

interface Models {
  [type: string]: THREE.Object3D;
}
const startPosition = new CANNON.Vec3(5, 0, 2);
const endPosition = new CANNON.Vec3(-5, 0, 2);
const tweenTime = 3; // seconds

export default class {
  scene: THREE.Scene;

  camera: THREE.PerspectiveCamera;

  modelLoader: GLTFLoader;

  renderer: THREE.WebGLRenderer;

  customModels: Models;

  world: CANNON.World;

  fixedTimeStep: number;

  objectsList: Array<Dice>;

  numOfUsedModels: number;

  throwRunning: boolean;

  simulationRunning: boolean;
  isFinished: boolean;
  values: number;
  localUp: CANNON.Vec3;
  inverseBodyOrientation: CANNON.Quaternion;
  limit: number;
  startTime: number;
  offset: CANNON.Vec3;
  constructor() {
    this.scene = new THREE.Scene();
    this.world = new CANNON.World();
    this.world.gravity.set(0, 0, -60);
    this.world.broadphase = new CANNON.NaiveBroadphase();

    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(90, aspectRatio, 0.1, 1000);
    this.camera.fov = 80;
    this.camera.position.z = 30;

    this.fixedTimeStep = 1.0 / 60.0;
    this.modelLoader = new GLTFLoader();
    this.customModels = {};
    this.objectsList = [];
    this.numOfUsedModels = 2;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 1.5 : 1);
    this.renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    const containerElement = document.getElementById("container") as HTMLElement;
    containerElement.appendChild(this.renderer.domElement);

    const color = "#ffffff";
    const planeGeometry = new THREE.PlaneBufferGeometry(200, 200);
    const planeMaterial = new THREE.MeshPhysicalMaterial({ color });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.receiveShadow = true;
    this.scene.add(plane);

    this.loadModel(D6_MODEL_URL, "d6", [0.16, 0.16, 0.16]);
    this.loadModel(D20_MODEL_URL, "d20", [0.035, 0.035, 0.035]);

    this.addPhysicsPlaneBody(0);
    this.addPhysicsPlaneBody(0, [0, 20, 0], [0.7071, 0, 0, 0.7071]);
    this.addPhysicsPlaneBody(0, [0, -20, 0], [-0.3826, 0, 0, 0.9238]);
    this.addPhysicsPlaneBody(0, [20, 0, 0], [0, -0.7071, 0, 0.7071]);
    this.addPhysicsPlaneBody(0, [-20, 0, 0], [0, 0.7071, 0, 0.7071]);

    this.addSpotLight("#ffffff", [60, 60, 60]);
    this.throwRunning = false;
    this.simulationRunning = false;
    this.values = 0;
    this.isFinished = false;
    this.localUp = new CANNON.Vec3();
    this.inverseBodyOrientation = new CANNON.Quaternion();
    this.limit = Math.sin(Math.PI / 4);
    this.startTime = this.world.time;

    this.offset = new CANNON.Vec3();
  }

  resize() {
    const width = window.innerWidth * 0.7;
    const height = window.innerHeight * 0.7;
    const aspect = width / height;
    const zoomValue = width > 600 ? 1 : 0.6;
    this.renderer.setSize(width, height);
    this.camera.aspect = aspect;
    this.camera.zoom = zoomValue;
    this.camera.updateProjectionMatrix();
  }

  loadModel(url: string, modelType: string, scale: number[]) {
    const [x, y, z] = scale;
    this.modelLoader.load(url, (model): void => {
      model.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mesh = child;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
      const { userData } = model.scene;
      model.scene.scale.set(x, y, z);
      model.scene.position.set(0, 0, -100);
      userData.type = modelType;
      this.customModels = { ...this.customModels, [modelType]: model.scene };
    });
  }

  init() {
    const loadedModelsLength = Object.keys(this.customModels).length;
    const isLoaded = loadedModelsLength === this.numOfUsedModels;
    if (isLoaded) {
      this.resize();
      return true;
    }
    setTimeout(() => this.init(), 100);
    return false;
  }

  addPhysicsPlaneBody(mass: number, pos?: number[], qt?: number[]) {
    const [px, py, pz] = pos || [0, 0, 0];
    const [qx, qy, qz, qw] = qt || [0, 0, 0, 0];
    const body = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      type: CANNON.Body.KINEMATIC,
      position: startPosition,
    });
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
    this.world.addBody(body);
  }

  getUpsideValue(renderBody: THREE.Object3D) {
    let p: any = [];
    const p_abs = [];
    for (let i = 0; i < 5; i++) {
      p.push(renderBody.applyMatrix4(renderBody.matrixWorld));
      p_abs.push(Math.abs(p[i]));
    }
    const idx = p_abs.indexOf(Math.max(...p_abs)); //index of max abs
    p = p[idx];
    //console.log(idx, p);

    let value;
    switch (idx) {
      case 0:
        value = p > 0 ? 5 : 0;
        break;
      case 1:
        value = p > 0 ? 9 : 8;
        break;
      case 2:
        value = p > 0 ? 1 : 2;
        break;
      case 3:
        value = p > 0 ? 7 : 6;
        break;
      case 4:
        value = p > 0 ? 3 : 4;
        break;
      default:
        value = NaN;
        break;
    }
    return value * 1;
  }

  shiftUpperValue(toValue: number, id: number) {
    const geometr = new THREE.BufferGeometry();
    // const geometry = this.objectsList[id].renderBody.bo.clone();

    const fromValue = this.getUpsideValue(id);

    // for (let i = 0, l = geometry.faces.length; i < l; ++i) {
    //   let materialIndex = geometry.faces[i].materialIndex;
    //   if (materialIndex === 0) continue;

    //   materialIndex += toValue - fromValue - 1;
    //   while (materialIndex > this.values) materialIndex -= this.values;
    //   while (materialIndex < 1) materialIndex += this.values;

    //   geometry.faces[i].materialIndex = materialIndex + 1;
    // }

    // this.objectsList[id].geometry = geometry;
  }
  getCurrentVectors(id: number) {
    return {
      position: this.objectsList[id].physicsBody.position.clone(),
      quaternion: this.objectsList[id].physicsBody.quaternion.clone(),
      velocity: this.objectsList[id].physicsBody.velocity.clone(),
      angularVelocity: this.objectsList[id].physicsBody.angularVelocity.clone(),
    };
  }

  setVectors(vectors: AllVectors, id: number) {
    this.objectsList[id].physicsBody.position = vectors.position;
    this.objectsList[id].physicsBody.quaternion = vectors.quaternion;
    this.objectsList[id].physicsBody.velocity = vectors.velocity;
    this.objectsList[id].physicsBody.angularVelocity = vectors.angularVelocity;
  }

  addSpotLight(color: number | string, position: number[]) {
    const colors = "#DDDDD9";
    const intensity = 0.823;
    const lights = new THREE.AmbientLight(colors, intensity);
    this.scene.add(lights);
  }

  clearScene() {
    // this.objectsList.forEach((dice) => {
    //   dice.renderBody.traverse((child) => {
    //     if (child instanceof THREE.Mesh) {
    //       child.geometry.dispose();
    //       child.material.dispose();
    //     }
    //   });
    //   this.scene.remove(dice.renderBody);
    //   this.world.remove(dice.physicsBody);
    // });
    // this.objectsList = [];
    // this.isFinished = true;
  }
  clear() {
    setInterval(() => {
      this.clearScene();
    }, 3000);
  }

  roll(amount: number, model: THREE.Object3D, vectors: Vectors[]) {
    this.clear();
    for (let i = 0; i < amount; i += 1) {
      const diceShape = new CANNON.Box(new CANNON.Vec3(1.5, 1.5, 1.5));
      const diceModel = model.clone();
      // set the position of enter f the die
      const diceBody = new CANNON.Body({
        mass: 0,
        position: startPosition,
        shape: diceShape,
        // fixedRotation: true,
      });
      this.world.addBody(diceBody);
      this.scene.add(diceModel);

      this.objectsList.push({ physicsBody: diceBody, renderBody: diceModel });
    }
  }
  isMoreFinished(physicsBody: CANNON.Body) {
    const threshold = 1;

    const angularVelocity = physicsBody.angularVelocity;
    const velocity = physicsBody.velocity;

    return (
      Math.abs(angularVelocity.x) < threshold &&
      Math.abs(angularVelocity.y) < threshold &&
      Math.abs(angularVelocity.z) < threshold &&
      Math.abs(velocity.x) < threshold &&
      Math.abs(velocity.y) < threshold &&
      Math.abs(velocity.z) < threshold
    );
  }

  render(): void {
    requestAnimationFrame(() => this.render());
    this.world.step(this.fixedTimeStep, this.fixedTimeStep, 3);
    this.renderer.render(this.scene, this.camera);
    this.objectsList.forEach(({ physicsBody, renderBody }) => {
      const { x, y, z } = physicsBody.position;
      const qt = physicsBody.quaternion;
      renderBody.quaternion.set(qt.x, qt.y, qt.z, qt.w);
      renderBody.position.set(x, y, z);
      // const matrix = new THREE.Matrix4();
      // matrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      // renderBody.applyMatrix4(matrix);
      this.localUp.set(0, 1, 0);
      physicsBody.quaternion.inverse(this.inverseBodyOrientation);
      this.inverseBodyOrientation.vmult(this.localUp, this.localUp);
      // Check which side is up
      if (this.localUp.x > this.limit) {
        // Positive x is up
        console.log("1");
      } else if (this.localUp.x < -this.limit) {
        // Negative x is up
        console.log("2");
      } else if (this.localUp.y > this.limit) {
        // Positive y is up
        console.log("3");
      } else if (this.localUp.y < -this.limit) {
        // Negative y is up
        console.log("6");
      } else if (this.localUp.z > this.limit) {
        // Positive z is up
        console.log("5");
      } else if (this.localUp.z < -this.limit) {
        // Negative z is up
        console.log("4");
      } else {
        // The box is not resting flat on the ground plane
      }
      const direction = new CANNON.Vec3();
      endPosition.vsub(startPosition, direction);
      const totalLength = direction.distanceTo(endPosition);
      direction.normalize();
      const speed = totalLength / tweenTime;
      direction.scale(speed, physicsBody.velocity);
      const progress = (this.world.time - this.startTime) / tweenTime;
      if (progress < 1) {
        // Calculate current position
        direction.scale(progress * totalLength, this.offset);
        startPosition.vadd(this.offset, physicsBody.position);
      } else {
        // We passed the end position! Stop.
        physicsBody.velocity.set(0, 0, 0);
        physicsBody.position.copy(endPosition);
      }
      // console.log(value, "i");
    });

    // const allEqual = this.objectsList => this.objectsList..every( v => this.isMoreFinished(v) )
    const a = this.objectsList.map((a) => this.isMoreFinished(a.physicsBody));
    const result = a.every(Boolean);

    if (a.length && result) {
      // this.isFinished = true;
      // this.clear();
    }
  }
}
