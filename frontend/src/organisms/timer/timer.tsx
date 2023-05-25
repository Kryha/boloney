import { FC } from "react";
import { spacing } from "../../design";
import { useTimer } from "../../hooks";
import { TimerHeader } from "../../molecules";

interface TimerProps {
  title?: string;
}

export const Timer: FC<TimerProps> = ({ title = "" }) => {
  const { time } = useTimer();

  return <TimerHeader time={time} heading={title} gap={spacing.s} />;
};
