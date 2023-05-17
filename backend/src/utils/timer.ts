import { TICK_RATE } from "../constants";

export const getTicksFromSeconds = (timeInSec: number) => {
  return timeInSec * TICK_RATE;
};

export const getSecondsFromTicks = (ticks: number) => {
  return ticks / TICK_RATE;
};
