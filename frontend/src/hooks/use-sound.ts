import { useStore } from "../store";
import { useCallback, useEffect } from "react";

const audioContext = new AudioContext();
const masterGainNode = audioContext.createGain();

export const useChangeVolume = () => {
  const { masterVolume, setMasterVolume } = useStore();

  useEffect(() => {
    masterGainNode.gain.setValueAtTime(masterVolume, 0);
    masterGainNode.connect(audioContext.destination);
  }, [masterVolume]);

  const setVolume = (volume: number) => {
    setMasterVolume(volume);
  };

  return setVolume;
};

export const usePlaySound = () => {
  const isSoundEnabled = useStore((state) => state.isSoundEnabled);

  const playSound = useCallback(
    async (audioFile: string) => {
      if (!isSoundEnabled) return;
      const response = await fetch(audioFile);
      const soundBuffer = await response.arrayBuffer();
      const soundAudioBuffer = await audioContext.decodeAudioData(soundBuffer);

      const soundSource = audioContext.createBufferSource();
      soundSource.buffer = soundAudioBuffer;

      soundSource.connect(masterGainNode);
      soundSource.start();
    },
    [isSoundEnabled]
  );
  return playSound;
};
