import { useCountdown } from "usehooks-ts";
import { text } from "../assets";
import { MILLISECONDS } from "../constants";

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

// TODO: use ticks from nakama
export const useTimer = (countStartSeconds: number) => {
  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: countStartSeconds,
    intervalMs: MILLISECONDS,
  });
  //  get number of full minutes
  const minutes = Math.floor(count / 60);

  //  get remainder of seconds
  const seconds = count % 60;
  const time = text.param.timeInMinsAndSeconds(padTo2Digits(minutes), padTo2Digits(seconds));

  return {
    time,
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
};
