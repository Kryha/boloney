export const range = (to: number, from = 0) => [...Array(to - from + 1).keys()].map((i) => i + from);

export const shuffleArray = <Type>(array: Array<Type>): Array<Type> => {
  return array
    .slice()
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
