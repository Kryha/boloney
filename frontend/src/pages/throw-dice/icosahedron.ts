const t = (1.0 + Math.sqrt(5.0)) / 2.0;

const vertices = [
  { x: -1, y: t, z: 0 },
  { x: 1, y: t, z: 0 },
  { x: -1, y: -t, z: 0 },
  { x: 1, y: -t, z: 0 },
  { x: 0, y: -1, z: t },
  { x: 0, y: 1, z: t },
  { x: 0, y: -1, z: -t },
  { x: 0, y: 1, z: -t },
  { x: t, y: 0, z: -1 },
  { x: t, y: 0, z: 1 },
  { x: -t, y: 0, z: -1 },
  { x: -t, y: 0, z: 1 },
];

const faces: Array<any> = [
  [0, 11, 5],
  [0, 5, 1],
  [0, 1, 7],
  [0, 7, 10],
  [0, 10, 11],
  [1, 5, 9],
  [5, 11, 4],
  [11, 10, 2],
  [10, 7, 6],
  [7, 1, 8],
  [3, 9, 4],
  [3, 4, 2],
  [3, 2, 6],
  [3, 6, 8],
  [3, 8, 9],
  [4, 9, 5],
  [2, 4, 11],
  [6, 2, 10],
  [8, 6, 7],
  [9, 8, 1],
];

const icosahedronTemplate = { vertices, faces };

export default icosahedronTemplate;
