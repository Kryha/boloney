import Highlighter from "react-highlight-words";
import { activePlayerTurnData, LeftArrowIconSVG, text } from "../../assets";
import { buttonSize, color } from "../../design";
import { useLatestBid, usePlayer } from "../../service";
import { useStore } from "../../store";
import { FadeTransition } from "../page-transition";
import { Timer } from "../timer";
import { TurnActionHeaderWrapper, TurnActionHeading } from "./styles";
import { Heading2 } from "../atoms";
import { TertiaryButton } from "../../molecules";

export const TurnActionHeader = () => {
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const resetPowerUpState = useStore((state) => state.resetPowerUpState);
  const action = useStore((state) => state.action);
  const turnActionStep = useStore((state) => state.turnActionStep);
  const round = useStore((state) => state.round);
  const latestBid = useLatestBid();
  const player = usePlayer(latestBid?.userId || "");
  const powerUpState = useStore((state) => state.powerUpState);

  const matchSettings = useStore((state) => state.matchSettings);
  const headerData = activePlayerTurnData(action, turnActionStep, round, player?.username, matchSettings?.healPowerUpAmount);
  const timerTitle = powerUpState.active ? powerUpState.active.name : headerData.timerTitle;

  const handleGoBack = () => {
    setTurnActionStep("pickAction");
    resetPowerUpState();
  };

  return (
    <FadeTransition animationKey={timerTitle}>
      <TurnActionHeaderWrapper isBackButtonVisible={turnActionStep === "proceedWithAction"}>
        <TertiaryButton
          text={text.playerTurn.back}
          onClick={handleGoBack}
          icon={<LeftArrowIconSVG />}
          iconPosition="row-reverse"
          padding={buttonSize.md}
        />
        {turnActionStep === "evaluateWinner" ? (
          <TurnActionHeading>{headerData.timerTitle}</TurnActionHeading>
        ) : (
          <Timer title={timerTitle} />
        )}
        <Heading2>{headerData.headingTitle}</Heading2>
        <Heading2 customcolor={color.darkGrey}>
          <Highlighter
            highlightClassName="bold"
            searchWords={[player?.username || ""]}
            autoEscape
            textToHighlight={headerData.subHeadingTitle || ""}
          />
        </Heading2>
      </TurnActionHeaderWrapper>
    </FadeTransition>
  );
};
