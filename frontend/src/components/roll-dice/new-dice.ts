import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { World } from "cannon";

// Get a reference to the container element
export const init = () => {
  const canvasElement = document.querySelector(".webgl");
  const canvas = canvasElement as HTMLCanvasElement | undefined;

  const scene = new THREE.Scene();
  const loader = new GLTFLoader();
  loader.load(
    "/src/components/assets/dice.glb",
    function (glb) {
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
