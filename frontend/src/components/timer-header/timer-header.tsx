import { FC } from "react";
import { useTimer } from "../../hooks";
import { GeneralText, Heading6 } from "../atoms";
import { Divider, TimerRow } from "./styles";

interface TimerHeaderProps {
  timeInSeconds: number;
  isCountDownStarted: boolean;
  title?: string;
}
export const TimerHeader: FC<TimerHeaderProps> = ({ timeInSeconds, isCountDownStarted, title }) => {
  const { time, startCountdown } = useTimer(timeInSeconds);

  if (isCountDownStarted) startCountdown();

  return (
    <TimerRow>
      <GeneralText>{time}</GeneralText>
      {title && (
        <>
          <Divider />
          <Heading6>{title}</Heading6>
        </>
      )}
    </TimerRow>
  );
};
