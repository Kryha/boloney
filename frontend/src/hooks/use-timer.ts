import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";
import { timerSound, text } from "../assets";
import { MILLISECONDS, SOUND_TIMER_TRIGGERS, TIMEOUT_STAGE_TRANSITION_TIME } from "../constants";
import { useLocalPlayer, useMatch } from "../service";
import { useStore } from "../store";
import { usePlaySound } from "./use-sound";

const padTo2Digits = (num: number) => {
  return Math.max(num, 0).toString().padStart(2, "0");
};

// TODO: also define a hook that does not generate a new timer every time, but hooks to a global one
export const useTimer = () => {
  const initialTimerTime = useStore((state) => state.timerTimeInSeconds);
  const setTimer = useStore((state) => state.setTimerTimeInSeconds);
  const localPlayer = useLocalPlayer();
  const matchStage = useStore((state) => state.matchStage);
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
      // checks if the amount of seconds are present in the trigger array
      const triggerSound = SOUND_TIMER_TRIGGERS.includes(seconds);
      // plays the sound only if it's the player turn and the local player is active
      if (triggerSound && matchStage === "playerTurnLoopStage" && localPlayer?.isActive) playSound(timerSound);
    }
  }, [minutes, seconds, playSound, localPlayer, matchStage]);

  return {
    time,
    count,
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
};

export const useClientTimer = (triggerCondition = true) => {
  const isPlayerReady = useStore((state) => state.isPlayerReady);
  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const { count } = useTimer();
  const { delayBroadcastPlayerReady } = useMatch();

  useEffect(() => {
    if (count <= 0 && triggerCondition && !isPlayerReady) delayBroadcastPlayerReady(TIMEOUT_STAGE_TRANSITION_TIME);
  }, [count, delayBroadcastPlayerReady, triggerCondition, isPlayerReady, setSpinnerVisibility]);

  return { count };
};
