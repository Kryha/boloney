import Dice from "react-dice-roll";
import { BaseLayout, GameLayout, Hand, PrimaryButton, TopNavigation } from "../../components";
import { RightSection } from "../../components/base-layout/styles";
import { HUD } from "../../components/hud";
import { color } from "../../design";
import { Players } from "../../service/fake-players";
import { DiceContainer, ThrowDiceContainer } from "./styles";
import { DiceManager, DiceD6 } from "threejs-dice";

import Scene from "./roll";
import THREE, { OrbitControls } from "./three";
import CANNON from "cannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface Models {
  [type: string]: THREE.Object3D;
}

interface Dice {
  physicsBody: CANNON.Body;
  renderBody: THREE.Object3D;
}

let container;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let modelLoader: GLTFLoader;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let customModels: Models;
let world: CANNON.World;
let fixedTimeStep: number;
let objectsList: Array<Dice>;
let numOfUsedModels: number;
const dice: DiceD6[] = [];

export const ThrowDice = () => {
  const init = () => {
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    const SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight;
    const VIEW_ANGLE = 20,
      ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
      NEAR = 1,
      FAR = SCREEN_HEIGHT * 1.3;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 100, 0);
    // camera.position.z = SCREEN_HEIGHT
    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container = document.getElementById("ThreeJS");
    if (container) container.appendChild(renderer.domElement);
    // EVENTS
    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    // STATS
    // stats = new Stats();
    // stats.domElement.style.position = "absolute";
    // stats.domElement.style.bottom = "0px";
    // stats.domElement.style.zIndex = 100;
    // container.appendChild(stats.domElement);

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

    // FLOOR
    const floorMaterial = new THREE.MeshPhongMaterial({
      color: "transparent",
      side: THREE.DoubleSide,
    });
    const floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    // SKYBOX/FOG
    const skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    const skyBoxMaterial = new THREE.MeshPhongMaterial({
      color: color.lightGrey,
      side: THREE.BackSide,
    });
    const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);
    scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);

    ////////////
    // CUSTOM //
    ////////////
    world = new CANNON.World();

    world.gravity.set(0, -9.82 * 20, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    DiceManager.setWorld(world);

    //Floor
    const floorBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: DiceManager.floorBodyMaterial,
    });
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(floorBody);

    //Walls

    for (let i = 0; i < 5; i++) {
      const die = new DiceD6({
        size: 1.5,
        backColor: "#000",
        fontColor: "#fff",
      });
      const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      scene.add(light);
      dice.push(die);
    }

    function randomDiceThrow() {
      const diceValues = [];

      for (let i = 0; i < dice.length; i++) {
        const yRand = Math.random() * 20;
        dice[i].getObject().position.x = -15 - (i % 3) * 1.5;
        dice[i].getObject().position.y = 2 + Math.floor(i / 3) * 1.5;
        dice[i].getObject().position.z = -15 + (i % 3) * 1.5;
        dice[i].getObject().quaternion.x = ((Math.random() * 90 - 45) * Math.PI) / 180;
        dice[i].getObject().quaternion.z = ((Math.random() * 90 - 45) * Math.PI) / 180;
        dice[i].updateBodyFromMesh();
        const rand = Math.random() * 5;
        dice[i].getObject().body.velocity.set(25 + rand, 40 + yRand, 15 + rand);
        dice[i].getObject().body.angularVelocity.set(20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);

        diceValues.push({ dice: dice[i], value: 6 });
      }

      DiceManager.prepareValues(diceValues);
    }

    // setInterval(randomDiceThrow, 3000);
    randomDiceThrow();

    requestAnimationFrame(animate);
  };

  function animate() {
    updatePhysics();
    render();
    update();

    requestAnimationFrame(animate);
  }

  function updatePhysics() {
    world.step(1.0 / 60.0);

    for (const i in dice) {
      dice[i].updateMeshFromBody();
    }
  }

  function update() {
    controls.update();
  }

  function render() {
    renderer.render(scene, camera);
  }

  return (
    <ThrowDiceContainer>
      <BaseLayout
        leftSection={<Hand avatarName={Players[0].avatarName} name={Players[0].name} />}
        mainSection={
          <>
            <PrimaryButton text="roll" onClick={() => init()} />
            <DiceContainer id="ThreeJS"></DiceContainer>
          </>
        }
        rightSection={<TopNavigation isInGame />}
      />
    </ThrowDiceContainer>
  );
};
