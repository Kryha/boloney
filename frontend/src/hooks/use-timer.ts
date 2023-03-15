import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";
import { timerSound, text } from "../assets";
import { MILLISECONDS, SOUND_TIMER_TRIGGERS } from "../constants";
import { useLocalPlayer } from "../service";
import { useStore } from "../store";
import { usePlaySound } from "./use-sound";

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const useTimer = () => {
  const initialTimerTime = useStore((state) => state.timerTimeInSeconds);
  const setTimer = useStore((state) => state.setTimerTimeInSeconds);
  const localPlayer = useLocalPlayer();
  const playSound = usePlaySound();

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

  useEffect(() => {
    setTimer(count);
  }, [count, setTimer]);

  // checks if the timer is less than 1 and if the local player is active
  useEffect(() => {
    if (minutes < 1 && localPlayer?.isActive) {
      // checks if the amount of secons are present in the trigger array
      if (SOUND_TIMER_TRIGGERS.includes(seconds)) {
        playSound(timerSound);
      }
    }
  }, [minutes, seconds, playSound, localPlayer]);

  return {
    time,
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
};
