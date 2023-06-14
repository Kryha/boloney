import { useStore } from "../store";
import { useCallback, useEffect } from "react";

const audioContext = new AudioContext();
const masterGainNode = audioContext.createGain();

export const useChangeVolume = () => {
  const masterVolume = useStore((state) => state.masterVolume);
  const setMasterVolume = useStore((state) => state.setMasterVolume);

  useEffect(() => {
    masterGainNode.gain.setValueAtTime(masterVolume, 0);
    masterGainNode.connect(audioContext.destination);
  }, [masterVolume]);

  const setVolume = (volume: number) => {
    setMasterVolume(volume);
  };

  return { setVolume, masterVolume };
};

export const usePlaySound = () => {
  const playSound = useCallback(async (audioFile: string) => {
    const response = await fetch(audioFile);
    const soundBuffer = await response.arrayBuffer();
    const soundAudioBuffer = await audioContext.decodeAudioData(soundBuffer);

    const soundSource = audioContext.createBufferSource();
    soundSource.buffer = soundAudioBuffer;

    soundSource.connect(masterGainNode);
    soundSource.start();
  }, []);
  return playSound;
};
