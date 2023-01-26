import Highlighter from "react-highlight-words";
import { activePlayerTurnData, text } from "../../assets";
import { color } from "../../design";
import { useLatestBid, usePlayer } from "../../service";
import { useStore } from "../../store";
import { Heading2 } from "../atoms";
import { GoBackButton } from "../buttons";
import { Timer } from "../timer";
import { TurnActionHeaderWrapper, TurnActionHeading } from "./styles";

export const TurnActionHeader = () => {
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const action = useStore((state) => state.action);
  const turnActionStep = useStore((state) => state.turnActionStep);
  const round = useStore((state) => state.round);
  const latestBid = useLatestBid();
  const player = usePlayer(latestBid?.userId || "");

  const matchSettings = useStore((state) => state.matchSettings);
  const headerData = activePlayerTurnData(action, turnActionStep, round, player?.username, matchSettings?.healPowerUpAmount);

  return (
    <TurnActionHeaderWrapper isBackButtonVisible={turnActionStep === "proceedWithAction"}>
      <GoBackButton primaryText={text.playerTurn.back} onClick={() => setTurnActionStep("pickAction")} />
      {turnActionStep === "evaluateWinner" ? (
        <TurnActionHeading>{headerData.timerTitle}</TurnActionHeading>
      ) : (
        <Timer title={headerData.timerTitle} />
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
