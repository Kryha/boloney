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
