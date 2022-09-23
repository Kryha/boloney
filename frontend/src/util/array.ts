export const range = (to: number, from = 0) => [...Array(to - from + 1).keys()].map((i) => i + from);
