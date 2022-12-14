import { FC } from "react";
import { text } from "../../assets";
import { MAX_DIE_FACE } from "../../constants";
import { useLatestBid, useTotalDiceInMatch } from "../../service";
import { useStore } from "../../store";
import { GeneralText } from "../atoms";
import { PrimaryButtonWithHelper } from "../button-with-helper";
import { ActivePlayerWrapper, ActivePlayerContainer, PowerUpButtonContainer, ActionButtonContainer } from "./styles";

export const PickAction: FC = () => {
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const setAction = useStore((state) => state.setAction);
  const latestBid = useLatestBid();
  const totalDice = useTotalDiceInMatch();

  const maxBidPlaced = latestBid && latestBid.amount === totalDice && latestBid.face === MAX_DIE_FACE;

  const handleBidAction = () => {
    if (latestBid && latestBid.amount === totalDice && latestBid.face === MAX_DIE_FACE) return;
    setTurnActionStep("proceedWithAction");
    setAction("bid");
  };

  return (
    <ActivePlayerWrapper>
      <ActivePlayerContainer>
        <PowerUpButtonContainer>
          <PrimaryButtonWithHelper
            text={text.match.powerUp}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
          />
          <PrimaryButtonWithHelper
            text={text.match.healDice}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
          />
        </PowerUpButtonContainer>
        <GeneralText>{text.match.or}</GeneralText>
        <ActionButtonContainer>
          <PrimaryButtonWithHelper
            disabled={maxBidPlaced}
            text={text.match.bid}
            onClick={() => {
              handleBidAction();
            }}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
          />
          <PrimaryButtonWithHelper
            disabled={!latestBid}
            text={text.match.boloney}
            onClick={() => {
              setTurnActionStep("proceedWithAction");
              setAction("boloney");
            }}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
          />
          <PrimaryButtonWithHelper
            disabled={!latestBid}
            text={text.match.exact}
            onClick={() => {
              setTurnActionStep("proceedWithAction");
              setAction("exact");
            }}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
          />
        </ActionButtonContainer>
      </ActivePlayerContainer>
    </ActivePlayerWrapper>
  );
};
