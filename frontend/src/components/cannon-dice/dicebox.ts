import { AfterDiceRollCallback, BeforeDiceRollCallback, NotationGetter, DiceBoxCallback } from "./callbacks";
import {
  AmbientLight,
  Camera,
  CanvasRenderer,
  Light,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Renderer,
  Scene,
  SpotLight,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from "three";
import { Body, ContactMaterial, Material, NaiveBroadphase, Plane, Vec3, World } from "cannon";
import { DiceConsts } from "./diceconsts";
import { DiceFactory } from "./dicefactory";
import { DiceNotation } from "./dicenotation";
import { Die } from "./die";
import { DieVector } from "./dievector";
import { bind, initRng, randomizeVector, rng } from "./dicelib";

export class DiceBox {
  animateSelector = true;
  barrierBodyMaterial = new Material("barrier");
  callback: DiceBoxCallback | undefined;
  deskBodyMaterial = new Material("desk");
  desk: Mesh | undefined;
  dice: Die[] = [];
  light: Light = new Light();
  renderer: Renderer;
  rolling = false;
  scale: number | undefined;
  scene = new Scene();
  useAdaptiveTimestamp = true;
  world = new World();

  private ambientLightColor = 0xf0f5fb;
  private aspect: number | undefined;
  private camera: Camera = new Camera();
  private clientSize: Vector2 = new Vector2(0, 0);
  private iteration = 0;
  private lastTime = 0;
  private mouseStart: Vector2 | undefined = new Vector2();
  private mouseTime: number | undefined;
  private pane: Object3D = new Object3D();
  private running: number | boolean = 0;
  private size: Vector2 = new Vector2(0, 0);
  private windowSize: Vector2 = new Vector2(0, 0);

  constructor(private diceFactory: DiceFactory, container: HTMLElement, dimensions: ClientRect) {
    const canvas = document.createElement("canvas");

    const gl = canvas.getContext("webgl");
    this.renderer = gl ? new WebGLRenderer({ antialias: true }) : new CanvasRenderer /*{ antialias: true }*/();
    container.appendChild(this.renderer.domElement);
    if (gl) {
      const glRenderer = new WebGLRenderer({ antialias: true });
      glRenderer.shadowMap.enabled = true;
      glRenderer.shadowMap.type = PCFShadowMap;
      glRenderer.setClearColor(0xffffff, 1);
      this.renderer = glRenderer;
    }

    this.reinit(container, dimensions);

    this.world.gravity.set(0, 0, -9.8 * 800);
    this.world.broadphase = new NaiveBroadphase();
    this.world.solver.iterations = 16;

    const ambientLight = new AmbientLight(this.ambientLightColor);
    this.scene.add(ambientLight);

    this.world.addContactMaterial(
      new ContactMaterial(this.deskBodyMaterial, Die.diceBodyMaterial, {
        friction: 0.01,
        restitution: 0.5,
      })
    );
    this.world.addContactMaterial(
      new ContactMaterial(this.barrierBodyMaterial, Die.diceBodyMaterial, {
        friction: 0,
        restitution: 1.0,
      })
    );
    this.world.addContactMaterial(
      new ContactMaterial(Die.diceBodyMaterial, Die.diceBodyMaterial, {
        friction: 0,
        restitution: 0.5,
      })
    );

    const body = new Body({ mass: 0, material: this.deskBodyMaterial });
    body.addShape(new Plane());
    this.world.addBody(body);

    this.world.addBody(this.createBarrier(new Vec3(0, this.size.y * 0.93, 0), new Vec3(1, 0, 0), Math.PI / 2));
    this.world.addBody(this.createBarrier(new Vec3(0, -this.size.y * 0.93, 0), new Vec3(1, 0, 0), -Math.PI / 2));
    this.world.addBody(this.createBarrier(new Vec3(this.size.x * 0.93, 0, 0), new Vec3(0, 1, 0), -Math.PI / 2));
    this.world.addBody(this.createBarrier(new Vec3(-this.size.x * 0.93, 0, 0), new Vec3(0, 1, 0), Math.PI / 2));

    this.renderer.render(this.scene, this.camera);
  }

  bindMouse(container: HTMLElement, notationGetter: NotationGetter, beforeRoll: BeforeDiceRollCallback, afterRoll: AfterDiceRollCallback) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const box = this;
    bind(container, ["mousedown", "touchstart"], (ev: Event) => {
      ev.preventDefault();
      box.mouseTime = new Date().getTime();
      box.mouseStart = this.getMousePosition(ev);
    });
    bind(container, ["mouseup", "touchend"], (ev: Event) => {
      if (box.rolling || box.mouseStart === undefined) {
        return;
      }

      ev.stopPropagation();

      const m = this.getMousePosition(ev);
      const vector = new Vector2(m.x - box.mouseStart.x, -(m.y - box.mouseStart.y));

      // reset mouseStart
      box.mouseStart = undefined;

      const dist = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

      if (dist >= Math.sqrt(box.size.x * box.size.y * 0.01) && box.mouseTime) {
        let interval = new Date().getTime() - box.mouseTime;

        if (interval > 2000) {
          interval = 2000;
        }

        const boost = Math.sqrt((2500 - interval) / 2500) * dist * 2;
        initRng(() => {
          this.throwDice(vector, boost, dist, notationGetter, beforeRoll, afterRoll);
        });
      }
    });
  }

  bindThrow(button: any, notationGetter: NotationGetter, beforeRoll: BeforeDiceRollCallback, afterRoll: AfterDiceRollCallback) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const box = this;
    bind(button, ["mouseup", "touchend"], (ev: Event) => {
      ev.stopPropagation();
      box.startThrow(notationGetter, beforeRoll, afterRoll);
    });
  }

  clear() {
    this.running = false;
    let dice;
    while ((dice = this.dice.pop())) {
      this.scene.remove(dice);
      if (dice.body) this.world.remove(dice.body);
    }
    if (this.pane) this.scene.remove(this.pane);
    this.renderer.render(this.scene, this.camera);
    setTimeout(() => this.renderer.render(this.scene, this.camera), 100);
  }

  drawSelector() {
    this.clear();
    const step = this.size.x / 4.5;
    this.pane = new Mesh(new PlaneGeometry(this.size.x * 6, this.size.y * 6, 1, 1), new MeshPhongMaterial(DiceConsts.selectorBackColors));
    this.pane.receiveShadow = true;
    this.pane.position.set(0, 0, 1);
    this.scene.add(this.pane);

    const mouseCaptured = false;

    for (let i = 0, pos = -3; i < DiceConsts.KNOWN_DICE.length; ++i, ++pos) {
      const sides = DiceConsts.KNOWN_DICE[i];
      const die = this.diceFactory.createDie(sides);
      die.position.set(pos * step, 0, step * 0.5);
      die.castShadow = true;
      die.userData = `d${sides}`;
      this.dice.push(die);
      this.scene.add(die);
    }

    this.running = new Date().getTime();
    this.lastTime = 0;
    if (this.animateSelector) this.__selectorAnimate(this.running);
    else this.renderer.render(this.scene, this.camera);
  }

  findDieAtMousePosition(ev: Event) {
    const m = this.getMousePosition(ev);
    if (this.aspect) {
      const intersects = new Raycaster(
        this.camera.position,
        new Vector3((m.x - this.clientSize.x) / this.aspect, (m.y - this.clientSize.y) / this.aspect, this.size.x / 9)
          .sub(this.camera.position)
          .normalize()
      ).intersectObjects(this.dice);
      if (intersects.length) return intersects[0].object.userData;
    }
  }

  reinit(container: HTMLElement, dimensions: ClientRect) {
    this.clientSize.set(container.clientWidth / 2, container.clientHeight / 2);
    if (dimensions) {
      this.size.x = dimensions.width;
      this.size.y = dimensions.height;
    } else {
      this.size.copy(this.clientSize);
    }
    this.aspect = Math.min(this.clientSize.x / this.size.x, this.clientSize.y / this.size.y);
    this.scale = Math.sqrt(this.size.x * this.size.x + this.size.y * this.size.y) / 13;

    this.renderer.setSize(this.clientSize.x * 2, this.clientSize.y * 2);

    this.windowSize.y = this.clientSize.y / this.aspect / Math.tan((10 * Math.PI) / 180);
    if (this.camera) this.scene.remove(this.camera);
    this.camera = new PerspectiveCamera(20, this.clientSize.x / this.clientSize.y, 1, this.windowSize.y * 1.3);
    this.camera.position.z = this.windowSize.y;

    const mw = Math.max(this.size.x, this.size.y);
    if (this.light) {
      this.scene.remove(this.light);
    }

    const light = new SpotLight(DiceConsts.spotlightColor, 2.0);
    light.position.set(-mw / 2, mw / 2, mw * 2);
    light.target.position.set(0, 0, 0);
    light.distance = mw * 5;
    light.castShadow = true;
    light.shadowCameraNear = mw / 10;
    light.shadowCameraFar = mw * 5;
    light.shadowCameraFov = 50;
    light.shadowBias = 0.001;
    (<any>light).shadowDarkness = 1.1;
    light.shadowMapWidth = 1024;
    light.shadowMapHeight = 1024;
    this.light = light;
    this.scene.add(this.light);

    if (this.desk) {
      this.scene.remove(this.desk);
    }

    this.desk = new Mesh(new PlaneGeometry(this.size.x * 2, this.size.y * 2, 1, 1), new MeshPhongMaterial({ color: DiceConsts.deskColor }));
    this.desk.receiveShadow = true;
    this.scene.add(this.desk);

    this.renderer.render(this.scene, this.camera);
  }

  roll(vectors: DieVector[], values: any, callback: any) {
    this.initRoll(vectors);
    if (values != undefined && values.length) {
      this.useAdaptiveTimestamp = false;
      const res = this.emulateThrow();

      this.initRoll(vectors);

      for (const i in res) {
        this.shiftDieFaces(this.dice[i], values[i], res[i]);
      }
    }
    this.callback = callback;
    this.running = new Date().getTime();
    this.lastTime = 0;
    this.__animate(this.running);
  }

  throwDice(
    vector: Vector2,
    boost: number,
    dist: number,
    notationGetter: NotationGetter,
    beforeRoll: BeforeDiceRollCallback,
    afterRoll: AfterDiceRollCallback
  ) {
    const uat = this.useAdaptiveTimestamp;
    const roll = (requestResults = false) => {
      if (afterRoll) {
        this.clear();
        this.roll(vectors, requestResults || notation.result, (result: any) => {
          if (afterRoll) {
            afterRoll(this, notation, result);
          }
          this.rolling = false;
          this.useAdaptiveTimestamp = uat;
        });
      }
    };
    vector.x /= dist;
    vector.y /= dist;
    const notation = DiceNotation.parse(notationGetter());
    if (notation.set.length == 0) return;

    const vectors = this.generateVectors(notation, vector, boost);
    this.rolling = true;
    if (beforeRoll) {
      beforeRoll(this, vectors, notation, roll);
    } else {
      roll();
    }
  }

  private emulateThrow() {
    while (!this.isThrowFinished()) {
      ++this.iteration;
      this.world.step(DiceConsts.frameRate);
    }
    return this.dice.map((x) => x.value);
  }

  private createBarrier(pos: Vec3, axis: Vec3, angle: number) {
    let barrier: Body;
    // eslint-disable-next-line prefer-const
    barrier = new Body({ mass: 0, material: this.barrierBodyMaterial });
    barrier.addShape(new Plane());
    barrier.quaternion.setFromAxisAngle(axis, Math.PI / 2);
    barrier.position.set(pos.x, pos.y, pos.z);
    this.world.addBody(barrier);
    return barrier;
  }

  private generateVectors(notation: DiceNotation, vector: Vector2, boost: number): DieVector[] {
    const vectors: DieVector[] = [];
    for (const sides of notation.set) {
      const vec = randomizeVector(vector);
      const pos = new Vector3(this.size.x * (vec.x > 0 ? -1 : 1) * 0.9, this.size.y * (vec.y > 0 ? -1 : 1) * 0.9, rng() * 200 + 200);
      const projector = Math.abs(vec.x / vec.y);
      if (projector > 1.0) {
        pos.setY(pos.y / projector);
      } else {
        pos.setX(pos.x * projector);
      }
      const velvec = randomizeVector(vector);
      const velocity = new Vector3(velvec.x * boost, velvec.y * boost, -10);
      const inertia = this.diceFactory.getStatic(sides).inertia;
      const angle = new Vector3(-(rng() * vec.y * 5 + inertia * vec.y), rng() * vec.x * 5 + inertia * vec.x, 0);
      const axis = new Vector4(rng(), rng(), rng(), rng());
      vectors.push({
        sides: sides,
        pos: pos,
        velocity: velocity,
        angle: angle,
        axis: axis,
      });
    }
    return vectors;
  }

  private addDice(sides: number, pos: Vector3, velocity: Vector3, angle: Vector3, axis: Vector4) {
    const die = this.diceFactory.createDie(sides);

    die.castShadow = true;
    die.body.position.set(pos.x, pos.y, pos.z);
    die.body.quaternion.setFromAxisAngle(new Vec3(axis.x, axis.y, axis.z), axis.a * Math.PI * 2);
    die.body.angularVelocity.set(angle.x, angle.y, angle.z);
    die.body.velocity.set(velocity.x, velocity.y, velocity.z);
    die.body.linearDamping = 0.1;
    die.body.angularDamping = 0.1;
    this.scene.add(die);
    this.dice.push(die);
    this.world.addBody(die.body);
  }

  private isThrowFinished() {
    let result = true;
    const e = 6;

    if (this.iteration < 10 / DiceConsts.frameRate) {
      for (let i = 0; i < this.dice.length; ++i) {
        const die = this.dice[i];
        if (die.stopped === true) continue;
        const a = die.body.angularVelocity,
          v = die.body.velocity;
        if (Math.abs(a.x) < e && Math.abs(a.y) < e && Math.abs(a.z) < e && Math.abs(v.x) < e && Math.abs(v.y) < e && Math.abs(v.z) < e) {
          if (die.stopped) {
            if (this.iteration - die.stopped > 3) {
              die.stopped = true;
              continue;
            }
          } else die.stopped = this.iteration;
          result = false;
        } else {
          die.stopped = undefined;
          result = false;
        }
      }
    }
    return result;
  }

  private __animate(threadid: number | boolean) {
    const time = new Date().getTime();
    let timeDiff = (time - this.lastTime) / 1000;

    if (timeDiff > 3) {
      timeDiff = DiceConsts.frameRate;
    }

    ++this.iteration;

    if (this.useAdaptiveTimestamp) {
      while (timeDiff > DiceConsts.frameRate * 1.1) {
        this.world.step(DiceConsts.frameRate);
        timeDiff -= DiceConsts.frameRate;
      }
      this.world.step(timeDiff);
    } else {
      this.world.step(DiceConsts.frameRate);
    }
    for (const i in this.scene.children) {
      const interact = <Die>this.scene.children[i];
      if (interact.body !== undefined) {
        const p = interact.body.position;
        const q = interact.body.quaternion;
        interact.position.set(p.x, p.y, p.z);
        interact.quaternion.set(q.x, q.y, q.z, q.w);
      }
    }
    this.renderer.render(this.scene, this.camera);
    this.lastTime = this.lastTime ? time : new Date().getTime();
    if (this.running == threadid && this.isThrowFinished()) {
      this.running = false;
      if (this.callback) {
        this.callback(this.dice.map((x) => x.value));
      }
    }
    if (this.running == threadid) {
      (function (t, tid, uat) {
        if (!uat && timeDiff < DiceConsts.frameRate) {
          setTimeout(function () {
            requestAnimationFrame(function () {
              t.__animate(tid);
            });
          }, (DiceConsts.frameRate - timeDiff) * 1000);
        } else
          requestAnimationFrame(function () {
            t.__animate(tid);
          });
      })(this, threadid, this.useAdaptiveTimestamp);
    }
  }

  private initRoll(vectors: DieVector[]) {
    this.clear();
    this.iteration = 0;
    for (const i in vectors) {
      this.addDice(vectors[i].sides, vectors[i].pos, vectors[i].velocity, vectors[i].angle, vectors[i].axis);
    }
  }

  private shiftDieFaces(die: Die, value: number, res: number) {
    const r = die.range;
    if (!(value >= r[0] && value <= r[1])) return;
    const num = value - res;
    const geom = die.geometry.clone();
    for (let i = 0, l = geom.faces.length; i < l; ++i) {
      let matindex = geom.faces[i].materialIndex;
      if (matindex == 0) continue;
      matindex += num - 1;
      while (matindex > r[1]) matindex -= r[1];
      while (matindex < r[0]) matindex += r[1];
      geom.faces[i].materialIndex = matindex + 1;
    }
    die.geometry = geom;
  }

  private __selectorAnimate(threadid: number) {
    const time = new Date().getTime();
    let timeDiff = (time - this.lastTime) / 1000;
    if (timeDiff > 3) timeDiff = DiceConsts.frameRate;
    const dAngle = (0.3 * timeDiff * Math.PI * Math.min(24000 + threadid - time, 6000)) / 6000;
    if (dAngle < 0) this.running = false;
    for (const i in this.dice) {
      this.dice[i].rotation.y += dAngle;
      this.dice[i].rotation.x += dAngle / 4;
      this.dice[i].rotation.z += dAngle / 10;
    }
    this.lastTime = time;
    this.renderer.render(this.scene, this.camera);
    if (this.running == threadid) {
      (function (t, tid) {
        requestAnimationFrame(function () {
          t.__selectorAnimate(tid);
        });
      })(this, threadid);
    }
  }

  private startThrow(notationGetter: NotationGetter, beforeRoll: BeforeDiceRollCallback, afterRoll: AfterDiceRollCallback) {
    if (this.rolling) return;
    initRng(() => {
      const vector = new Vector2((rng() * 2 - 1) * this.size.x, -(rng() * 2 - 1) * this.size.y);
      const dist = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
      const boost = (rng() + 3) * dist;
      this.throwDice(vector, boost, dist, notationGetter, beforeRoll, afterRoll);
    });
  }

  private getMousePosition(ev: Event) {
    const touchEvent = <TouchEvent>ev;
    if (touchEvent.changedTouches !== undefined) {
      return new Vector2(touchEvent.changedTouches[0].clientX, touchEvent.changedTouches[0].clientY);
    }
    return new Vector2((<MouseEvent>ev).clientX, (<MouseEvent>ev).clientY);
  }
}
