import { activePlayerTurnData, text } from "../../assets";
import { color } from "../../design";
import { useStore } from "../../store";
import { Heading2 } from "../atoms";
import { GoBackButton } from "../buttons";
import { TimerHeader } from "../timer-header";
import { TurnActionHeaderWrapper, TurnActionHeading } from "./styles";

export const TurnActionHeader = () => {
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const action = useStore((state) => state.action);
  const turnActionStep = useStore((state) => state.turnActionStep);

  // TODO: refractor from computed value
  const headerData = activePlayerTurnData(action, turnActionStep);

  return (
    <TurnActionHeaderWrapper isBackButtonVisible={turnActionStep === "proceedWithAction"}>
      <GoBackButton text={text.playerTurn.back} onClick={() => setTurnActionStep("pickAction")} />
      {turnActionStep === "evaluateWinner" ? (
        <TurnActionHeading>{headerData.timerTitle}</TurnActionHeading>
      ) : (
        <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={headerData.timerTitle} />
      )}
      <Heading2>{headerData.headingTitle}</Heading2>
      <Heading2 customColor={color.darkGrey}>{headerData.subHeadingTitle}</Heading2>
    </TurnActionHeaderWrapper>
  );
};
