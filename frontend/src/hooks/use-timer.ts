import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";
import { text } from "../assets";
import { MILLISECONDS } from "../constants";
import { useStore } from "../store";

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const useTimer = () => {
  const initialTimerTime = useStore((state) => state.timerTimeInSeconds);

  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: initialTimerTime,
    intervalMs: MILLISECONDS,
  });

  //  get number of full minutes
  const minutes = Math.floor(count / 60);

  //  get remainder of seconds
  const seconds = count % 60;
  const time = text.param.time(padTo2Digits(minutes), padTo2Digits(seconds));

  useEffect(() => {
    startCountdown();
  }, [startCountdown, initialTimerTime]);

  return {
    time,
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
};
