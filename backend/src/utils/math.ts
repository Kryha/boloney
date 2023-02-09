export const randomInt = (max: number, min = 0) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// TODO: improve `range` in array.ts and delete this eventually
export const getRange = (amount: number): number[] => {
  return Array.from(Array(amount).keys());
};
