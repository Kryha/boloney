import { losingSound, timerDone, playerWins } from "../../assets";

export const getActiveMargin = (isBoloney: boolean, isWinner: boolean, isInitial: boolean): string => {
  if (isInitial) return "4vh";

  if (!isBoloney && isWinner) return "-8vh";

  return "-5vh";
};

export const getSound = (isWinner: boolean, isTimeOut?: boolean): string => {
  if (isTimeOut) return timerDone;
  return isWinner ? playerWins : losingSound;
};
