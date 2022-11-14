import * as CANNON from "cannon";
// import { Camera, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";

// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import * as THREE from "three";

// // const OrbitControls = require("three-orbit-controls")(THREE);

// // //Constructor
// function Dice(this: any, physicalWorld: any, sceneWorld: any, position: any) {
//   const r = 0.15; //size
//   const initPosition = { ...position };

//   let isInitial = true;

//   //physical
//   const phy = new CANNON.Body({ mass: 0.01 });
//   phy.addShape(new CANNON.Box(new CANNON.Vec3(r, r, r)));
//   phy.position = initPosition;
//   phy.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 1), Math.PI / 4);
//   phy.angularVelocity.set(0, 0, 0);
//   phy.angularDamping = 0.01;
//   physicalWorld.add(phy);
//   let view;
//   //scene
//   if (diceModel) view = diceModel.clone();
//   view.castShadow = true;
//   view.receiveShadow = true;
//   sceneWorld.add(view);

//   let time = 0;

//   const floating = () => {
//     const swing = 0.01;
//     const omega = 2 * Math.PI; //[rad/s]
//     this.phy.type = CANNON.Body.KINEMATIC;
//     this.phy.position = new CANNON.Vec3(initPosition.x, initPosition.y + swing * Math.sin(omega * time), initPosition.z);
//     this.phy.angularVelocity.set(0, omega + 2 * Math.PI * Math.random(), 0);
//     time += 1 / 60;
//   };

//   const throwing = () => {
//     const t = 1.15; //[s]  flight time
//     const vy = -initPosition.y / t + 0.5 * g * t;
//     const vz = -initPosition.z / t;
//     const angVmax = 7;
//     this.phy.type = CANNON.Body.DYNAMIC;
//     this.phy.velocity = new CANNON.Vec3(0, vy, vz);
//     const angularV = new CANNON.Vec3(angVmax * Math.random(), angVmax * Math.random(), angVmax * Math.random());
//     this.phy.angularVelocity = angularV;
//     isInitial = false;
//   };

//   const getValue = () => {
//     let value = NaN;
//     const i = new THREE.Vector4(1, 0, 0, 0);
//     const j = new THREE.Vector4(0, 1, 0, 0);
//     const k = new THREE.Vector4(0, 0, 1, 0);
//     const p = [];
//     p[0] = i.applyMatrix4(this.view.matrixWorld).y;
//     p[1] = j.applyMatrix4(this.view.matrixWorld).y;
//     p[2] = k.applyMatrix4(this.view.matrixWorld).y;
//     const p_abs: number[] = [];
//     p.forEach((p_) => {
//       p_abs.push(Math.abs(p_));
//     });
//     switch (p_abs.indexOf(Math.max(...p_abs))) {
//       case 0:
//         value = p[0] > 0 ? 1 : 6;
//         break;
//       case 1:
//         value = p[1] > 0 ? 4 : 3;
//         break;
//       case 2:
//         value = p[2] > 0 ? 2 : 5;
//         break;
//       default:
//     }
//     return value;
//   };

//   const remove = () => {
//     physicalWorld.remove(this.phy);
//     sceneWorld.remove(this.view);
//   };

//   //Execute every frame
//   const run = () => {
//     if (isInitial) this.floating();
//     this.view.position.copy(this.phy.position);
//     this.view.quaternion.copy(this.phy.quaternion);
//   };
// }

// let world: CANNON.World | null = null;
// let scene: Scene | Object3D<Event> | null = null;
// let camera: Camera | PerspectiveCamera | null = null;
// const renderer: WebGLRenderer | null = null;
// let dice_using = Dice;

// const dice: any = [Dice, Dice, Dice];

// let phyPlane = null;
// const diceModel: any = null;
// const loader = new GLTFLoader();

// const g = 9.8; //[m/s^2] gravitational acceleration

// // class Dice6 {
// //   physicalWorld: any;
// //   sceneWorld: any;
// //   position: any;
// //   r: number = 0.15;
// //   initPosition: any;
// //   isInitial: boolean = true;
// //   constructor(physicalWorld: any, sceneWorld: any, position: any) {
// //     this.physicalWorld = physicalWorld;
// //     this.sceneWorld = sceneWorld;
// //     this.initPosition = {...position};
// //     this.phy = new CANNON.Body({ mass: 0.01 });
// //   }

// //   //physical
// //   // phy = new CANNON.Body({ mass: 0.01 });
// //   phy.addShape(new CANNON.Box(new CANNON.Vec3(this.r, this.r, this.r)));
// //   phy.position = this.initPosition;
// //   phy.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 1), Math.PI / 4);
// //   phy.angularVelocity.set(0, 0, 0);
// //   phy.angularDamping = 0.01;
// //   physicalWorld.add(this.phy);

// //   //scene
// //   if (diceModel) this.view = diceModel.clone();
// //   this.view.castShadow = true;
// //   this.view.receiveShadow = true;
// //   sceneWorld.add(this.view);

// //   let time = 0;

// //   this.floating = () => {
// //     const swing = 0.01;
// //     const omega = 2 * Math.PI; //[rad/s]
// //     this.phy.type = CANNON.Body.KINEMATIC;
// //     this.phy.position = new CANNON.Vec3(initPosition.x, initPosition.y + swing * Math.sin(omega * time), initPosition.z);
// //     this.phy.angularVelocity.set(0, omega + 2 * Math.PI * Math.random(), 0);
// //     time += 1 / 60;
// //   };

// //   this.throwing = () => {
// //     const t = 1.15; //[s]  flight time
// //     const vy = -initPosition.y / t + 0.5 * g * t;
// //     const vz = -initPosition.z / t;
// //     const angVmax = 7;
// //     this.phy.type = CANNON.Body.DYNAMIC;
// //     this.phy.velocity = new CANNON.Vec3(0, vy, vz);
// //     const angularV = new CANNON.Vec3(angVmax * Math.random(), angVmax * Math.random(), angVmax * Math.random());
// //     this.phy.angularVelocity = angularV;
// //     isInitial = false;
// //   };

// //   this.getValue = () => {
// //     let value = NaN;
// //     const i = new THREE.Vector4(1, 0, 0, 0);
// //     const j = new THREE.Vector4(0, 1, 0, 0);
// //     const k = new THREE.Vector4(0, 0, 1, 0);
// //     const p = [];
// //     p[0] = i.applyMatrix4(this.view.matrixWorld).y;
// //     p[1] = j.applyMatrix4(this.view.matrixWorld).y;
// //     p[2] = k.applyMatrix4(this.view.matrixWorld).y;
// //     const p_abs: number[] = [];
// //     p.forEach((p_) => {
// //       p_abs.push(Math.abs(p_));
// //     });
// //     switch (p_abs.indexOf(Math.max(...p_abs))) {
// //       case 0:
// //         value = p[0] > 0 ? 1 : 6;
// //         break;
// //       case 1:
// //         value = p[1] > 0 ? 4 : 3;
// //         break;
// //       case 2:
// //         value = p[2] > 0 ? 2 : 5;
// //         break;
// //       default:
// //     }
// //     return value;
// //   };

// //   this.remove = () => {
// //     physicalWorld.remove(this.phy);
// //     sceneWorld.remove(this.view);
// //   };

// //   //Execute every frame
// //   this.run = () => {
// //     if (isInitial) this.floating();
// //     this.view.position.copy(this.phy.position);
// //     this.view.quaternion.copy(this.phy.quaternion);
// //   };
// // }

// // function getNormal(face: any, vertices_: any) {
// //   const ab = new THREE.Vector3();
// //   const ac = new THREE.Vector3();
// //   ab.subVectors(vertices_[face.b], vertices_[face.a]);
// //   ac.subVectors(vertices_[face.c], vertices_[face.a]);
// //   const n = new THREE.Vector3();
// //   n.crossVectors(ab, ac);
// //   n.normalize();
// //   return n;
// // }

// // function setWorld() {
// //   //Create world (physical)
// //   world = new CANNON.World();

// //   world.gravity.set(0, -g, 0);
// //   world.broadphase = new CANNON.NaiveBroadphase();
// //   world.solver.iterations = 10;

// //   //Plane
// //   phyPlane = new CANNON.Body({ mass: 0 });
// //   phyPlane.addShape(new CANNON.Plane());
// //   phyPlane.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

// //   //add to world (physical)
// //   world.addBody(phyPlane);
// // }

// // const display = document.getElementById("dice-box");

// // function setView() {
// //   const width = window.innerWidth;
// //   const height = window.innerHeight * 0.8;

// //   //Renderer
// //   renderer = new THREE.WebGLRenderer({
// //     canvas: display as HTMLCanvasElement | undefined,
// //     antialias: true,
// //   });
// //   renderer.setPixelRatio(window.devicePixelRatio);
// //   renderer.setSize(width, height);
// //   renderer.shadowMap.enabled = true;

// //   //Scene
// //   scene = new THREE.Scene();

// //   //Lighting
// //   const light_amb = new THREE.AmbientLight(0xffffff, 0.3);
// //   const light_spt = new THREE.SpotLight(0xffffff, 1.3, 20, Math.PI / 8, 0.5, 0.5); //Color Intensity Distance Angle Exponent Decay
// //   light_spt.castShadow = true;
// //   light_spt.position.set(2, 4, 5);
// //   light_spt.shadow.mapSize.height = 2048;
// //   light_spt.shadow.mapSize.width = 2048;
// //   //const light_spt_helper = new THREE.SpotLightHelper(light_spt);
// //   //scene.add(lightHelper);
// //   const light_pnt1 = new THREE.PointLight(0xffffff, 1.6, 10, 0.8);
// //   light_pnt1.position.set(0, 2.5, 5);
// //   const light_pnt2 = new THREE.PointLight(0xffffff, 0.6, 10, 0.4);
// //   light_pnt2.position.set(0, 7, 0);
// //   scene.add(light_spt);
// //   scene.add(light_amb);
// //   scene.add(light_pnt1);
// //   scene.add(light_pnt2);

// //   //Floor
// //   const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 10), new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.8 }));
// //   floor.receiveShadow = true;
// //   floor.position.set(0, 0, 0);
// //   floor.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
// //   scene.add(floor);

// //   //Camera
// //   camera = new THREE.PerspectiveCamera(30, width / height);
// //   // camera.near = 0.5;
// //   // camera.far = 20;
// //   camera.position.set(0, 4, 5.7);
// //   camera.lookAt(new THREE.Vector3(0, 0, 0));
// //   // camera.updateProjectionMatrix();
// //   scene.add(camera);

// //   //OrbitControls
// //   // const controls = new OrbitControls(camera, display);
// // }

// function getNormal(face: any, vertices_: any) {
//   const ab = new THREE.Vector3();
//   const ac = new THREE.Vector3();
//   ab.subVectors(vertices_[face.b], vertices_[face.a]);
//   ac.subVectors(vertices_[face.c], vertices_[face.a]);
//   const n = new THREE.Vector3();
//   n.crossVectors(ab, ac);
//   n.normalize();
//   return n;
// }

// function setWorld() {
//   //Create world (physical)
//   world = new CANNON.World();

//   world.gravity.set(0, -g, 0);
//   world.broadphase = new CANNON.NaiveBroadphase();
//   world.solver.iterations = 10;

//   //Plane
//   phyPlane = new CANNON.Body({ mass: 0 });
//   phyPlane.addShape(new CANNON.Plane());
//   phyPlane.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

//   //add to world (physical)
//   world.addBody(phyPlane);
// }

// const canvasElement = document.querySelector(".webgl");
// const canvas = canvasElement as HTMLCanvasElement | undefined;

// function setView() {
//   const width = window.innerWidth;
//   const height = window.innerHeight;

//   //Renderer
//   const renderer = new THREE.WebGLRenderer({ canvas: canvas });
//   renderer.setSize(width * 0.75, height * 0.75);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.shadowMap.enabled = true;

//   //Scene
//   scene = new THREE.Scene();

//   //Lighting
//   const light_amb = new THREE.AmbientLight(0xffffff, 0.3);
//   const light_spt = new THREE.SpotLight(0xffffff, 1.3, 20, Math.PI / 8, 0.5, 0.5); //Color Intensity Distance Angle Exponent Decay
//   // light_spt.castShadow = true;
//   light_spt.position.set(2, 4, 5);
//   light_spt.shadow.mapSize.height = 2048;
//   light_spt.shadow.mapSize.width = 2048;
//   //const light_spt_helper = new THREE.SpotLightHelper(light_spt);
//   //scene.add(lightHelper);
//   const light_pnt1 = new THREE.PointLight(0xffffff, 1.6, 10, 0.8);
//   light_pnt1.position.set(0, 2.5, 5);
//   const light_pnt2 = new THREE.PointLight(0xffffff, 0.6, 10, 0.4);
//   light_pnt2.position.set(0, 7, 0);
//   scene.add(light_spt);
//   scene.add(light_amb);
//   scene.add(light_pnt1);
//   scene.add(light_pnt2);

//   //Floor
//   const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 10), new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.8 }));
//   floor.receiveShadow = true;
//   floor.position.set(0, 0, 0);
//   floor.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
//   scene.add(floor);

//   //Camera
//   camera = new THREE.PerspectiveCamera(30, width / height);
//   // camera.near = 0.5;
//   // camera.far = 20;
//   camera.position.set(0, 4, 5.7);
//   camera.lookAt(new THREE.Vector3(0, 0, 0));
//   // camera.updateProjectionMatrix();
//   scene.add(camera);

//   //OrbitControls
//   // const controls = new OrbitControls(camera, display);
// }

// setWorld();
// setView();

// function animate() {
//   if (dice)
//     dice.forEach((d: any) => {
//       d.run();
//     });
//   //dice.run();
//   if (world) world.step(1 / 60);
//   if (renderer && scene && camera) renderer.render(scene, camera);
//   requestAnimationFrame(animate);
// }

// loader.load(
//   "/src/components/assets/dice.glb",
//   function (glb) {
//     console.log(glb);
//     const diceModel = glb.scene;
//     diceModel.scale.set(0.07, 0.07, 0.07);
//     diceGenerate(10);
//     animate();
//   },
//   function (xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   function (error) {
//     console.log("an error occurred", error);
//   }
// );

// export const GoButton = () => {
//   if (dice)
//     dice.forEach((d: any) => {
//       d.throwing();
//     });
//   //dice.throwing();
//   setTimeout(() => {
//     totalling();
//   }, 4000);
// };

// function totalling() {
//   let total = 0;
//   if (dice)
//     dice.forEach((d: any) => {
//       const value = d.getValue();
//       if (isNaN(value)) {
//         return NaN;
//       }
//       total += value;
//     });
//   console.log("total = ", total);
// }

// export const SelectButton = () => {
//   diceRemove();
//   dice_using = Dice;
//   diceGenerate(10);
// };

// function diceRemove() {
//   dice.forEach((d: any) => {
//     d.remove();
//   });
//   dice.length = 0;
// }

// function diceGenerate(q: 10) {
//   //read quantity of dice
//   const step_position = 0.5;
//   const q_x_lim = 8; //limit of quantity of row direction
//   const init_position_x = (-step_position * (q <= q_x_lim ? q - 1 : q_x_lim - 1)) / 2;
//   const init_position_z = 3.2;
//   for (let i = 0; i < Math.ceil(q / q_x_lim); i++) {
//     for (let j = 0; j < q_x_lim; j++) {
//       if (i * q_x_lim + j >= q) break;
//       if (dice)
//         dice.push(
//           dice_using(world, scene, {
//             x: init_position_x + step_position * j,
//             y: 1.5,
//             z: init_position_z - step_position * i,
//           })
//         );
//     }
//   }
// }
