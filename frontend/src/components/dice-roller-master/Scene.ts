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
export interface DiceValue {
  body: CANNON.Body;
  value: number;
  vectors: Vectors;
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

const translatedVerticies = icosahedronTemplate.vertices.map(({ x, y, z }) => new CANNON.Vec3(x * 2, y * 2, z * 2));
const icosahedron = { vertices: translatedVerticies, faces: icosahedronTemplate.faces };

const randNum = (multiplier: number, allowNegative = true): number => {
  const baseValue = allowNegative ? (Math.random() - 0.5) * 2 : Math.random();
  return baseValue * multiplier;
};

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
    this.renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
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
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
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
      mass,
      shape: new CANNON.Plane(),
      position: pos && new CANNON.Vec3(px, py, pz),
      quaternion: qt && new CANNON.Quaternion(qx, qy, qz, qw),
    });
    this.world.addBody(body);
  }

  addSpotLight(color: number | string, position: number[]) {
    const colors = "#DDDDD9";
    const intensity = 0.823;
    const lights = new THREE.AmbientLight(colors, intensity);
    this.scene.add(lights);
  }

  clear() {
    this.objectsList.forEach((dice) => {
      dice.renderBody.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
      this.scene.remove(dice.renderBody);
      this.world.remove(dice.physicsBody);
    });
    this.objectsList = [];
  }

  roll(amount: number, model: THREE.Object3D, vectors: Vectors[]) {
    this.clear();
    for (let i = 0; i < amount; i += 1) {
      const diceShape = new CANNON.Box(new CANNON.Vec3(1.5, 1.5, 1.5));
      const diceModel = model.clone();
      // set the position of enter f the die
      const diceBody = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, -35, 40),
        velocity: new CANNON.Vec3(0, 20, 7),
        angularVelocity: new CANNON.Vec3(5, 6, 7),
        shape: diceShape,
      });
      console.log(diceBody);
      this.world.addBody(diceBody);
      this.scene.add(diceModel);
      this.objectsList.push({ physicsBody: diceBody, renderBody: diceModel });
    }
  }

  render(): void {
    requestAnimationFrame(() => this.render());
    this.world.step(this.fixedTimeStep);
    this.renderer.render(this.scene, this.camera);
    this.objectsList.forEach(({ physicsBody, renderBody }) => {
      const { x, y, z } = physicsBody.position;
      const qt = physicsBody.quaternion;
      renderBody.quaternion.set(qt.x, qt.y, qt.z, qt.w);
      renderBody.position.set(x, y, z);
      renderBody.rotateX(0);
      renderBody.rotateY(1.4);
      renderBody.rotateZ(0);
    });
  }
}
