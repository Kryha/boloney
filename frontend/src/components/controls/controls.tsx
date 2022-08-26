import { FC } from "react";

import { Paragraph } from "../atoms/text";
import { text } from "../../assets/text";
import { useCountdownTimer } from "../../hooks/use-countdown";
import { GAME_TIME_MINUTES, GAME_TIME_SECONDS } from "../../constants";
import { ControlContainer, CountdownTimer, Divider, Exit, ExitButton, Timer } from "./styles";

// TODO: complete control component
export const Controls: FC = () => {
  const [time, timer] = useCountdownTimer();

  return (
    <ControlContainer>
      <CountdownTimer>
        {/* TODO: remove onClick */}
        <Paragraph onClick={() => timer.startTimer(GAME_TIME_MINUTES, GAME_TIME_SECONDS)}>{time}</Paragraph>
        <Timer />
      </CountdownTimer>
      <Divider />
      <ExitButton>
        <Paragraph>{text.general.exit}</Paragraph>
        <Exit />
      </ExitButton>
    </ControlContainer>
  );
};
