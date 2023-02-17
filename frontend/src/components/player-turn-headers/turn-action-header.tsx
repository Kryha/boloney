import Highlighter from "react-highlight-words";
import { activePlayerTurnData, text } from "../../assets";
import { color } from "../../design";
import { useLatestBid, usePlayer } from "../../service";
import { useStore } from "../../store";
import { Heading2 } from "../atoms";
import { GoBackButton } from "../buttons";
import { TimeStamp } from "../history/history-atoms/styles";
import { TurnActionHeaderWrapper, TurnActionHeading } from "./styles";

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
    <TurnActionHeaderWrapper isBackButtonVisible={turnActionStep === "proceedWithAction"}>
      <GoBackButton primaryText={text.playerTurn.back} onClick={handleGoBack} />
      {turnActionStep === "evaluateWinner" ? (
        <TurnActionHeading>{headerData.timerTitle}</TurnActionHeading>
      ) : (
        <TimeStamp title={timerTitle} />
      )}
      <Heading2>{headerData.headingTitle}</Heading2>
      <Heading2 customColor={color.darkGrey}>
        <Highlighter
          highlightClassName="bold"
          searchWords={[player?.username || ""]}
          autoEscape
          textToHighlight={headerData.subHeadingTitle || ""}
        />
      </Heading2>
    </TurnActionHeaderWrapper>
  );
};
