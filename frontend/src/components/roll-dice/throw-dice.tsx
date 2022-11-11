import { useViewport } from "../../hooks";
import { BottomField, CenterField, Label, LabelHelp, RollDiceContainer, SelectorDivButton, SetHelp, Set } from "./styles";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import { Heading1 } from "../atoms";
import { clamp } from "lodash";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { World } from "cannon";
import { DiceManager, DiceD10, DiceD4 } from "threejs-dice/lib/dice";

let container: HTMLElement | null = document.getElementById("ThreeJS");
let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let controls: OrbitControls;
let stats: Stats;
let world: World;
const dice = [];

const init = () => {
  scene = new THREE.Scene();
  // CAMERA
  const SCREEN_WIDTH = window.innerWidth * 0.6,
    SCREEN_HEIGHT = window.innerHeight * 0.49;
  const VIEW_ANGLE = 45,
    ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
    NEAR = 0.01,
    FAR = 20000;
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 30, 30);
  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container = document.getElementById("ThreeJS");
  if (container) {
    container.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    // STATS
    stats = Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.bottom = "0px";
    stats.domElement.style.zIndex = "100";
    container.appendChild(stats.domElement);

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
    const floorMaterial = new THREE.MeshPhongMaterial({ color: "#00aa00", side: THREE.DoubleSide });
    const floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    // SKYBOX/FOG
    const skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    const skyBoxMaterial = new THREE.MeshPhongMaterial({ color: 0x9999ff, side: THREE.BackSide });
    const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    // scene.add(skyBox);
    scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);
    ////////////
    // CUSTOM //
    ////////////
    world = new CANNON.World();

    world.gravity.set(0, -9.82 * 20, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    DiceManager.setWorld(world);
  }
};
const inits = () => {
  const scene = new THREE.Scene();
  scene.add(new THREE.AxesHelper(5));

  // const light = new THREE.SpotLight();
  // light.position.set(5, 5, 5)
  // scene.add(light);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;

  const renderer = new THREE.WebGLRenderer();
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  // renderer.outputEncoding = THREE.sRGBEncoding
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const loader = new GLTFLoader();
  loader.load(
    "models/monkey.glb",
    function (gltf) {
      gltf.scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.receiveShadow = true;
          m.castShadow = true;
        }
        if ((child as THREE.Light).isLight) {
          const l = child as THREE.Light;
          l.castShadow = true;
          l.shadow.bias = -0.003;
          l.shadow.mapSize.width = 2048;
          l.shadow.mapSize.height = 2048;
        }
      });
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    }
  );

  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  const stats = Stats();
  document.body.appendChild(stats.dom);

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    render();

    stats.update();
  }

  function render() {
    renderer.render(scene, camera);
  }

  animate();
};
export const ThrowDice = () => {
  const { width, height } = useViewport();
  const canvasWidth = width * 0.6;
  const canvasHeight = height < 900 ? height * 0.49 : height * 0.59;
  // init(canvasHeight, canvasWidth);
  init();
  return <div></div>;
};
