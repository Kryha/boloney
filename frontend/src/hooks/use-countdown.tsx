import { ReactNode, useEffect, useState } from "react";

import { text } from "../assets/text";
import { FIFTY_NINE_SECONDS, MILLISECONDS, TEN_SECONDS } from "../constants";

interface CountdownTimerProps {
  startTimer: (initialMinute: number, initialSeconds: number) => void;
}

export const useCountdownTimer = (): [ReactNode, CountdownTimerProps] => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const startTimer = (initialMinute: number, initialSeconds: number) => {
    setMinutes(initialMinute);
    setSeconds(initialSeconds);
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(FIFTY_NINE_SECONDS);
        }
      }
    }, MILLISECONDS);
    return () => {
      clearInterval(myInterval);
    };
  });

  return [
    <>
      {minutes === 0 && seconds === 0
        ? `${text.general.defaultTime}`
        : `${minutes}:${seconds < TEN_SECONDS ? `${text.param.lessThanTenSeconds(seconds)}` : seconds}`}
    </>,
    { startTimer },
  ];
};
