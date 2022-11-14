import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Vec3, World } from "cannon";
import { useState } from "react";
import { WebGLObjects } from "three";
import { DiceD6, DiceManager } from "threejs-dice";

const dice: number[] = [1, 2, 3];
const g = 9.8; //[m/s^2] gravitational acceleration

function getCryptoRange(min: number, max: number) {
  const range = max - min + 1;
  const mBits = Math.ceil(Math.log2(range));
  const mBytes = Math.ceil(mBits / 8);
  const nAllowed = Math.floor(256 ** mBytes / range) * range;
  const arBytes = new Uint8Array(mBytes);
  let value;
  do {
    crypto.getRandomValues(arBytes);
    value = arBytes.reduce((acc, x, n) => acc + x * 256 ** n, 0);
  } while (value >= nAllowed);
  return min + (value % range);
}
const diceModel: any = null;

function Dice(this: any, physicalWorld: CANNON.World, sceneWorld: CANNON.World, position: Vec3) {
  const r = 0.15; //size
  const initPosition = { ...position };

  let isInitial = true;

  //physical
  this.phy = new CANNON.Body({ mass: 0.01 });
  this.phy.addShape(new CANNON.Box(new CANNON.Vec3(r, r, r)));
  this.phy.position = initPosition;
  this.phy.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 1), Math.PI / 4);
  this.phy.angularVelocity.set(0, 0, 0);
  this.phy.angularDamping = 0.01;
  physicalWorld.addBody(this.phy);

  //scene
  if (diceModel) {
    this.view = diceModel.clone();
    this.view.castShadow = true;
    this.view.receiveShadow = true;
    sceneWorld.addBody(this.view);
  }

  let time = 0;

  this.floating = () => {
    const swing = 0.01;
    const omega = 2 * Math.PI; //[rad/s]
    this.phy.type = CANNON.Body.KINEMATIC;
    this.phy.position = new CANNON.Vec3(initPosition.x, initPosition.y + swing * Math.sin(omega * time), initPosition.z);
    this.phy.angularVelocity.set(0, omega + 2 * Math.PI * Math.random(), 0);
    time += 1 / 60;
  };

  this.throwing = () => {
    const t = 1.15; //[s]  flight time
    const vy = -initPosition.y / t + 0.5 * g * t;
    const vz = -initPosition.z / t;
    const angVmax = 7;
    this.phy.type = CANNON.Body.DYNAMIC;
    this.phy.velocity = new CANNON.Vec3(0, vy, vz);
    const angularV = new CANNON.Vec3(angVmax * Math.random(), angVmax * Math.random(), angVmax * Math.random());
    this.phy.angularVelocity = angularV;
    isInitial = false;
  };

  this.getValue = () => {
    let value = NaN;
    const i = new THREE.Vector4(1, 0, 0, 0);
    const j = new THREE.Vector4(0, 1, 0, 0);
    const k = new THREE.Vector4(0, 0, 1, 0);
    const p = [];
    p[0] = i.applyMatrix4(this.view.matrixWorld).y;
    p[1] = j.applyMatrix4(this.view.matrixWorld).y;
    p[2] = k.applyMatrix4(this.view.matrixWorld).y;
    const p_abs: number[] = [];
    p.forEach((p_) => {
      p_abs.push(Math.abs(p_));
    });
    switch (p_abs.indexOf(Math.max(...p_abs))) {
      case 0:
        value = p[0] > 0 ? 1 : 6;
        break;
      case 1:
        value = p[1] > 0 ? 4 : 3;
        break;
      case 2:
        value = p[2] > 0 ? 2 : 5;
        break;
      default:
    }
    return value;
  };

  this.remove = () => {
    physicalWorld.remove(this.phy);
    sceneWorld.remove(this.view);
  };

  //Execute every frame
  this.run = () => {
    if (isInitial) this.floating();
    this.view.position.copy(this.phy.position);
    this.view.quaternion.copy(this.phy.quaternion);
  };
}

const clickButton = () => {
  // const [click, setClick] = useState(false);
  // const [disable, setDisable] = useState(false);
  // if (click) {
  dice.forEach((d) => {
    d.throwing();
  });
  setTimeout(() => {
    totalling();
    // setDisable(false)
  }, 4000);
  // } else {
  //   setDisable(true)
  //   dice.forEach((d) => {
  //     d.getValue();
  //   });
  //   diceRemove();
  //   diceGenerate(5);
  // setDisable(true)
};

function totalling() {
  let total = 0;
  dice.forEach((d) => {
    const value = d.getValue();
    if (isNaN(value)) {
      return NaN;
    }
    total += value;
  });
  console.log("total = ", total);
}

function diceGenerate(q: number) {
  //read quantity of dice
  const step_position = 0.5;
  const q_x_lim = 8; //limit of quantity of row direction
  const init_position_x = (-step_position * (q <= q_x_lim ? q - 1 : q_x_lim - 1)) / 2;
  const init_position_z = 3.2;
  let scale = 1;
  for (let i = 0; i < Math.ceil(q / q_x_lim); i++) {
    for (let j = 0; j < q_x_lim; j++) {
      if (i * q_x_lim + j >= q) break;
      dice.push(
        new dice_using(
          world,
          scene,
          {
            x: init_position_x + step_position * j,
            y: 1.5,
            z: init_position_z - step_position * i,
          },
          scale
        )
      );
      scale *= dice_using === Dice10 ? 10 : 1;
    }
  }
}
function diceRemove() {
  dice.forEach((d) => {
    d.remove();
  });
  dice.length = 0;
}

const startRoll = () => {
  diceRemove();
  dice_using = Dice10;
  diceGenerate(6);
};

// Get a reference to the container element
export const init = () => {
  const canvasElement = document.querySelector(".webgl");
  const canvas = canvasElement as HTMLCanvasElement | undefined;

  const scene = new THREE.Scene();
  const loader = new GLTFLoader();
  loader.load(
    "/src/components/assets/dice.glb",
    function (glb: GLTF) {
      console.log(glb);
      const root = glb.scene;
      root.scale.set(0.07, 0.07, 0.07);
      scene.add(root);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log("an error occurred", error);
    }
  );

  const light = new THREE.DirectionalLight("#ffffff", 1);
  light.position.set(2, 2, 5);
  scene.add(light);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

  camera.position.set(0, 1, 2);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(sizes.width * 0.75, sizes.height * 0.75);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
};
