import * as CANNON from "cannon";
import { MutableRefObject } from "react";
import * as THREE from "three";
import { DiceRoll } from ".";
import { OrbitControls } from "./controls";
import { DiceD10, DiceD100, DiceD100D10, DiceD12, DiceD20, DiceD4, DiceD6, DiceD8, DiceManager, DiceObject } from "./dice";

export const rollDice = (ref: MutableRefObject<any>, roll: DiceRoll) => {
  // SCENE
  const scene = new THREE.Scene();
  // CAMERA

  const SCREEN_WIDTH = ref?.current.clientWidth,
    SCREEN_HEIGHT = ref?.current.clientHeight ?? 800;
  const VIEW_ANGLE = 45,
    ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
    NEAR = 0.01,
    FAR = 20000;
  const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(-0.9, 80, 0);
  camera.rotation.set(-1.5, 1, 0.1);

  // RENDERER
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  ref?.current.appendChild(renderer.domElement);
  // EVENTS
  // CONTROLS
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;

  const ambient = new THREE.AmbientLight("#ffffff", 0.3);
  scene.add(ambient);

  const directionalLight = new THREE.DirectionalLight("#ffffff", 0.5);
  directionalLight.position.x = -1000;
  directionalLight.position.y = 1000;
  directionalLight.position.z = 1000;
  scene.add(directionalLight);

  const light = new THREE.SpotLight(0xefdfd5, 1.3);
  light.position.y = 100;
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.camera.near = 50;
  light.shadow.camera.far = 110;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  scene.add(light);

  ////////////
  // CUSTOM //
  ////////////
  const world = new CANNON.World();

  world.gravity.set(0, -9.82 * 20, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 16;

  const manager = DiceManager;
  manager.setWorld(world);

  //Floor
  const floorBody = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane(),
    material: manager.floorBodyMaterial,
  });
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  world.addBody(floorBody);

  const size = 11;
  const dice: DiceObject[] = [];
  const diceValues = [];
  for (const result of roll.result) {
    let die;
    switch (result.type) {
      case "d4":
        die = new DiceD4({
          size,
          fontColor: "white",
          backColor: "black",
        });
        scene.add(die.getObject());
        dice.push(die);
        diceValues.push({ dice: die, value: result.roll });
        break;
      case "d6":
        die = new DiceD6({
          size,
          fontColor: "white",
          backColor: roll.color,
        });
        scene.add(die.getObject());
        dice.push(die);
        diceValues.push({ dice: die, value: result.roll });
        break;
      case "d8":
        die = new DiceD8({
          size,
          fontColor: "white",
          backColor: "black",
        });
        scene.add(die.getObject());
        dice.push(die);
        diceValues.push({ dice: die, value: result.roll });
        break;
      case "d10":
        die = new DiceD10({
          size,
          fontColor: "white",
          backColor: "black",
        });
        scene.add(die.getObject());
        dice.push(die);
        diceValues.push({ dice: die, value: result.roll });
        break;
      case "d12":
        die = new DiceD12({
          size,
          fontColor: "white",
          backColor: "black",
        });
        scene.add(die.getObject());
        dice.push(die);
        diceValues.push({ dice: die, value: result.roll });
        break;
      case "d20":
        die = new DiceD20({
          size,
          fontColor: "white",
          backColor: "black",
        });
        scene.add(die.getObject());
        dice.push(die);
        diceValues.push({ dice: die, value: result.roll });
        break;
      case "d100":
        // eslint-disable-next-line no-case-declarations
        const die1 = new DiceD100({
          size,
          fontColor: "white",
          backColor: "black",
        });
        // eslint-disable-next-line no-case-declarations
        const die2 = new DiceD100D10({
          size,
          fontColor: "white",
          backColor: "black",
        });
        scene.add(die1.getObject());
        scene.add(die2.getObject());
        dice.push(die1, die2);
        diceValues.push({ dice: die1, value: Math.floor(result.roll / 10) + 1 }, { dice: die2, value: (result.roll % 10) + 1 });
        break;
      default:
        throw new Error(`invalid die ${result.type}`);
    }
  }

  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    const yRand = Math.random() * 20;
    die.resetBody(); // As the die is going to be reused between throws, it is necessary to reset the body
    die.getObject().position.x = -15 - (i % 3) * 10;
    die.getObject().position.y = 2 + Math.floor(i / 3) * 10;
    die.getObject().position.z = -15 + (i % 3) * 10;
    die.getObject().quaternion.x = ((Math.random() * 90 - 45) * Math.PI) / 180;
    die.getObject().quaternion.z = ((Math.random() * 90 - 45) * Math.PI) / 180;
    die.updateBodyFromMesh();
    const rand = Math.random() * 5;
    (die.getObject().body as any).velocity.set(25 + rand, 40 + yRand, 15 + rand);
    (die.getObject().body as any).angularVelocity.set(20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);
  }

  manager.prepareValues(diceValues);

  function animate() {
    updatePhysics();
    render();
    update();

    requestAnimationFrame(animate);
  }

  function updatePhysics() {
    world.step(1.0 / 60.0);

    for (const die of dice) {
      die.updateMeshFromBody();
    }
  }

  function update() {
    controls.update();
    // stats.update();
  }

  function render() {
    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);

  const checkDone = () => {
    // @ts-ignore
    if (world.bodies.map((b) => b.velocity.norm() < 0.1).every(Boolean)) {
      window.dispatchEvent(new Event("diceStable"));
    } else {
      setTimeout(checkDone, 50);
    }
  };
  setTimeout(checkDone, 50);

  return renderer.domElement;
};
