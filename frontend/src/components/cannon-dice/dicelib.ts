import { FlatShading, Vector3, Geometry, Face3, Color, Vector2, Sphere } from "three";
import { Shape, Vec3, ConvexPolyhedron } from "cannon";

const randomOrgApiKey = "f6e74d7b-070e-4f85-865d-d859fc0d078b";

let _randomStorage: any = [];
let _useTrueRandom = true;

export function useTrueRandom(value: boolean) {
  _useTrueRandom = value;
}

export function initRng(callback?: () => any) {
  if (!_randomStorage.length && _useTrueRandom) {
    const body = {
      jsonrpc: "2.0",
      method: "generateDecimalFractions",
      params: {
        apiKey: randomOrgApiKey,
        n: 512,
        decimalPlaces: 2,
        id: 1,
      },
    };

    _randomStorage = [1, 2, 3, 4, 5, 6];

    if (callback) callback();
  }
}

export function removeCssClass(el: HTMLElement, className: string) {
  const c = el.getAttribute("class");
  if (c) {
    const index = c.search("\\b" + className + "\\b");
    if (index !== -1) {
      const c2 = c.substr(0, index) + c.substr(index + className.length).replace(/\s+/g, " ");
      if (c !== c2) {
        el.setAttribute("class", c2);
      }
    }
  }
}

export function addCssClass(el: HTMLElement, className: string) {
  const c = el.getAttribute("class");
  let value: string;
  if (!c || !c.trim()) {
    value = className;
    el.setAttribute("class", value);
  } else {
    const index = c.search("\\b" + className + "\\b");
    if (index === -1) {
      value = c.trim() + " " + className;
      el.setAttribute("class", value);
    }
  }
}

export function bind(
  sel: EventTarget,
  eventName: string | string[],
  func: EventListenerOrEventListenerObject,
  bubble?: boolean | AddEventListenerOptions
) {
  if (eventName.constructor === Array) {
    (<string[]>eventName).forEach((x) => {
      sel.addEventListener(x, func, bubble ? bubble : false);
    });
  } else {
    sel.addEventListener(<string>eventName, func, bubble ? bubble : false);
  }
}

export function bindInput(
  sel: HTMLInputElement,
  eventName: string | string[],
  func: EventListenerOrEventListenerObject,
  bubble?: boolean | AddEventListenerOptions
) {
  if (eventName.constructor === Array) {
    (<string[]>eventName).forEach((x) => {
      sel.addEventListener(x, func, bubble ? bubble : false);
    });
  } else {
    sel.addEventListener(<string>eventName, func, bubble ? bubble : false);
  }
}

export function unbind(
  sel: EventTarget,
  eventName: string | string[],
  func: EventListenerOrEventListenerObject,
  bubble?: boolean | AddEventListenerOptions
) {
  if (eventName.constructor === Array) {
    (<string[]>eventName).forEach((x) => {
      sel.removeEventListener(x, func, bubble ? bubble : false);
    });
  } else {
    sel.removeEventListener(<string>eventName, func, bubble ? bubble : false);
  }
}

export function rng(): number {
  if (_randomStorage.length === 1) {
    initRng();
  }
  return _randomStorage.length ? _randomStorage.pop() : Math.random();
}

function copy(obj: any) {
  if (!obj) return obj;
  return copyto(obj, new obj.constructor());
}

export function copyto(obj: any, res: any) {
  if (obj == null || typeof obj !== "object") return obj;
  if (obj instanceof Array) {
    for (let i = obj.length - 1; i >= 0; --i) res[i] = copy(obj[i]);
  } else {
    for (const i in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(i)) res[i] = copy(obj[i]);
    }
  }
  return res;
}

function createShape(vertices: Vector3[], faces: number[][], radius: number) {
  const cv = vertices.map((v) => new Vec3(v.x * radius, v.y * radius, v.z * radius));
  const cf = faces.map((x, i) => faces[i].slice(0, faces[i].length));
  // BUG: @types/cannon incorrectly declares 2nd param as number[]
  return new ConvexPolyhedron(cv, <any>cf);
}

export interface GeometryWithCannnonShape extends THREE.Geometry {
  cannonShape?: Shape;
}

function createGeometry(vertices: Vector3[], faces: number[][], radius: number, tab: number, af: number): GeometryWithCannnonShape {
  const geom = new Geometry();

  for (let i = 0; i < vertices.length; ++i) {
    const vertex = vertices[i].multiplyScalar(radius);
    /*vertex.index = */ geom.vertices.push(vertex) /* - 1 */;
  }
  for (let i = 0; i < faces.length; ++i) {
    const ii = faces[i];
    const fl = ii.length - 1;
    const aa = (Math.PI * 2) / fl;
    for (let j = 0; j < fl - 2; ++j) {
      geom.faces.push(
        new Face3(
          ii[0],
          ii[j + 1],
          ii[j + 2],
          [geom.vertices[ii[0]], geom.vertices[ii[j + 1]], geom.vertices[ii[j + 2]]],
          new Color(0),
          ii[fl] + 1
        )
      );
      geom.faceVertexUvs[0].push([
        new Vector2((Math.cos(af) + 1 + tab) / 2 / (1 + tab), (Math.sin(af) + 1 + tab) / 2 / (1 + tab)),
        new Vector2((Math.cos(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab), (Math.sin(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab)),
        new Vector2((Math.cos(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab), (Math.sin(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab)),
      ]);
    }
  }
  geom.computeFaceNormals();
  geom.boundingSphere = new Sphere(new Vector3(), radius);
  return geom;
}

function chamferGeometry(vectors: Vector3[], faces: number[][], chamfer: number) {
  const chamferVectors: Vector3[] = [];
  const chamferFaces: number[][] = [];
  const cornerFaces: number[][] = vectors.map((x) => []);
  for (let i = 0; i < faces.length; ++i) {
    const ii = faces[i];
    const fl = ii.length - 1;
    const centerPoint = new Vector3();
    const face: number[] = new Array(fl);
    for (let j = 0; j < fl; ++j) {
      const vv = vectors[ii[j]].clone();
      centerPoint.add(vv);
      cornerFaces[ii[j]].push((face[j] = chamferVectors.push(vv) - 1));
    }
    centerPoint.divideScalar(fl);
    for (let j = 0; j < fl; ++j) {
      const vv = chamferVectors[face[j]];
      vv.subVectors(vv, centerPoint).multiplyScalar(chamfer).addVectors(vv, centerPoint);
    }
    face.push(ii[fl]);
    chamferFaces.push(face);
  }
  for (let i = 0; i < faces.length - 1; ++i) {
    for (let j = i + 1; j < faces.length; ++j) {
      const pairs = [];
      let lastm = -1;
      for (let m = 0; m < faces[i].length - 1; ++m) {
        const n = faces[j].indexOf(faces[i][m]);
        if (n >= 0 && n < faces[j].length - 1) {
          if (lastm >= 0 && m != lastm + 1) pairs.unshift([i, m], [j, n]);
          else pairs.push([i, m], [j, n]);
          lastm = m;
        }
      }
      if (pairs.length != 4) continue;
      chamferFaces.push([
        chamferFaces[pairs[0][0]][pairs[0][1]],
        chamferFaces[pairs[1][0]][pairs[1][1]],
        chamferFaces[pairs[3][0]][pairs[3][1]],
        chamferFaces[pairs[2][0]][pairs[2][1]],
        -1,
      ]);
    }
  }
  for (let i = 0; i < cornerFaces.length; ++i) {
    const cf = cornerFaces[i];
    const face = [cf[0]];
    let count = cf.length - 1;

    while (count) {
      for (let m = faces.length; m < chamferFaces.length; ++m) {
        let index = chamferFaces[m].indexOf(face[face.length - 1]);
        if (index >= 0 && index < 4) {
          if (--index == -1) {
            index = 3;
          }
          const nextVertex = chamferFaces[m][index];
          if (cf.indexOf(nextVertex) >= 0) {
            face.push(nextVertex);
            break;
          }
        }
      }
      --count;
    }
    face.push(-1);
    chamferFaces.push(face);
  }
  return { vectors: chamferVectors, faces: chamferFaces };
}

export function createDiceGeometry(vertices: number[][], faces: number[][], radius: number, tab: number, af: number, chamfer: number) {
  const vectors = new Array(vertices.length);
  for (let i = 0; i < vertices.length; ++i) {
    vectors[i] = new Vector3().fromArray(vertices[i]).normalize();
  }
  const cg = chamferGeometry(vectors, faces, chamfer);
  const geom = createGeometry(cg.vectors, cg.faces, radius, tab, af);
  //const geom = createGeometry(vectors, faces, radius, tab, af); // Without chamfer
  geom.cannonShape = createShape(vectors, faces, radius);
  return geom;
}

export function calculateTextureSize(approx: number) {
  return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
}

export function randomizeVector(vector: Vector2): Vector2 {
  const randomAngle = (rng() * Math.PI) / 5 - Math.PI / 5 / 2;
  const vec = new Vector2(
    vector.x * Math.cos(randomAngle) - vector.y * Math.sin(randomAngle),
    vector.x * Math.sin(randomAngle) + vector.y * Math.cos(randomAngle)
  );
  if (vec.x == 0) vec.x = 0.01;
  if (vec.y == 0) vec.y = 0.01;
  return vec;
}
