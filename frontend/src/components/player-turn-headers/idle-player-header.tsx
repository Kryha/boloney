import { idlePlayerTurnData } from "../../assets";
import { color } from "../../design";
import { useActivePlayer } from "../../service";
import { useStore } from "../../store";
import { Heading2 } from "../atoms";
import { ErrorView } from "../error-view";
import { TimerHeader } from "../timer-header";

export const IdlePlayerHeader = () => {
  const turnActionStep = useStore((state) => state.turnActionStep);
  const activePlayer = useActivePlayer();

  if (!activePlayer) return <ErrorView />;

  const headerData = idlePlayerTurnData(turnActionStep, activePlayer);
  return (
    <>
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={headerData.timerTitle} />
      <Heading2>{headerData.headingTitle}</Heading2>
      <Heading2 customColor={color.darkGrey}>{headerData.subHeadingTitle}</Heading2>
    </>
  );
};
