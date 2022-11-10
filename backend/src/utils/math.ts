export const randomInt = (max: number, min = 0) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getRange = (amount: number): number[] => {
  return Array.from(Array(amount).keys());
};
