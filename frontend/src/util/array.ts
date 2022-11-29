export const range = (to: number, from = 0) => [...Array(to - from + 1).keys()].map((i) => i + from);

export const getNumberWithOrdinal = (n: number) => {
  const ordinal = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  return n + (ordinal[(remainder - 20) % 10] || ordinal[remainder] || ordinal[0]);
};
