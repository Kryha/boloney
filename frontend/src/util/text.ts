export const countNumber = (n: number): string => {
  switch (n) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    default:
      return n + "th";
  }
};

export const prefixDigit = (n: number): string => {
  if (n >= 10) return String(n);
  return "0" + n;
};
