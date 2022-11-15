export const DiceRolls = (value: number) => {
  switch (value) {
    case 1:
      return {
        position: {
          x: 0,
          y: -35,
          z: 40,
        },
        velocity: {
          x: 0,
          y: 45,
          z: 0,
        },
        angularVelocity: { x: -3.2, y: 30, z: 4.56 },
        straight: { x: 0, y: 1.4, z: 0 },
      };
    case 2:
      return {
        position: { x: 0, y: -50, z: 50 },
        velocity: { x: 0, y: 2, z: 0 },
        angularVelocity: { x: 20, y: 20, z: 20 },
        straight: { x: 0, y: 1.4, z: 0 },
      };
    case 3:
      return {
        position: { x: 15, y: -35, z: 40 },
        velocity: { x: 0, y: 25, z: 0 },
        angularVelocity: { x: -20, y: -7, z: -50 },
        straight: { x: 0, y: 1.4, z: 0 },
      };
    case 4:
      return {
        position: { x: 15, y: -35, z: 40 },
        velocity: { x: 0, y: 55, z: 0 },
        angularVelocity: { x: 30, y: 30, z: 20 },
        straight: { x: 0, y: 1.4, z: 0 },
      };
    case 5:
      return {
        position: { x: 15, y: -35, z: 40 },
        velocity: { x: 0, y: 25, z: 0 },
        angularVelocity: { x: 20, y: 20, z: 20 },
        straight: { x: 0, y: 1.4, z: 0 },
      };
    case 6:
      return {
        position: { x: 0, y: -10, z: 50 },
        velocity: { x: 0, y: 15, z: 0 },
        angularVelocity: { x: 20, y: 30, z: 20 },
        straight: { x: 0, y: 1.4, z: 0 },
      };
    default:
      return {
        position: {
          x: 0,
          y: -35,
          z: 40,
        },
        velocity: {
          x: 0,
          y: 45,
          z: 0,
        },
        angularVelocity: { x: -3.2, y: 30, z: 4.56 },
        straight: { x: 0, y: 1.4, z: 0 },
      };
  }
};
