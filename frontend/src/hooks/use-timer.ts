import { useCountdown } from "usehooks-ts";

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const useTimer = (seconds: number) => {
  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: seconds,
    intervalMs: 1000,
  });
  // 👇️ get number of full minutes
  const minutes = Math.floor(count / 60);

  // 👇️ get remainder of seconds
  const second = count % 60;
  const time = `-${padTo2Digits(minutes)}.${padTo2Digits(second)}`;
  return {
    time,
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
};
