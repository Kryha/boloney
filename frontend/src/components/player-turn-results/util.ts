export const getActiveMargin = (isBoloney: boolean, isWinner: boolean, isInitial: boolean): string => {
  if (isInitial) return "4vh";

  if (!isBoloney && isWinner) return "-8vh";

  return "-5vh";
};
