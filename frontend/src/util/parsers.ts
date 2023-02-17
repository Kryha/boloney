import { text } from "../assets";

export const parseMatchData = (data: Uint8Array): unknown => JSON.parse(String.fromCharCode(...data));

export const parseTimeFormat = (time: number): string => {
  const date = new Date(time);
  return text.param.formatTime(date.getHours(), date.getMinutes());
};
