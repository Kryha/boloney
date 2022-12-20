import { FC } from "react";
import { idlePlayerTurnData } from "../../assets";
import { color } from "../../design";
import { useActivePlayer, useRound } from "../../service";
import { TurnActionStep } from "../../types";
import { Heading2 } from "../atoms";
import { ErrorView } from "../error-view";
import { TimerHeader } from "../timer-header";

interface IdlePlayerHeaderProps {
  step?: TurnActionStep;
}

export const IdlePlayerHeader: FC<IdlePlayerHeaderProps> = ({ step }) => {
  const activePlayer = useActivePlayer();
  const round = useRound();

  if (!activePlayer) return <ErrorView />;

  const headerData = idlePlayerTurnData(activePlayer, round, step);

  return (
    <>
      {/* TODO: add actual time */}
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={headerData.timerTitle} />
      <Heading2>{headerData.headingTitle}</Heading2>
      <Heading2 customColor={color.darkGrey}>{headerData.subHeadingTitle}</Heading2>
    </>
  );
};
