import { FC } from "react";
import { useTimer } from "../../hooks";
import { GeneralText, Heading6 } from "../atoms";
import { TimerDivider, TimerRow } from "./styles";

interface TimerProps {
  title?: string;
}

export const Timer: FC<TimerProps> = ({ title }) => {
  const { time } = useTimer();

  return (
    <TimerRow>
      <GeneralText>{time}</GeneralText>
      {title && (
        <>
          <TimerDivider />
          <Heading6>{title}</Heading6>
        </>
      )}
    </TimerRow>
  );
};
