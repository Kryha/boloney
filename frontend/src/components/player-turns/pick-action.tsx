import { FC } from "react";
import { text } from "../../assets";
import { MAX_DIE_FACE } from "../../constants";
import { useLatestBid, useTotalDiceInMatch } from "../../service";
import { useStore } from "../../store";
import { TurnAction } from "../../types";
import { GeneralText } from "../atoms";
import { PrimaryButtonWithHelper } from "../button-with-helper";
import { ActivePlayerWrapper, ActivePlayerContainer, PowerUpButtonContainer, ActionButtonContainer } from "./styles";
import { useCanLocalPlayerHealDice } from "./util";

export const PickAction: FC = () => {
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const setAction = useStore((state) => state.setAction);
  const showModal = useStore((state) => state.showModal);

  const latestBid = useLatestBid();
  const totalDice = useTotalDiceInMatch();
  const canHealDice = useCanLocalPlayerHealDice();

  const maxBidPlaced = latestBid && latestBid.amount === totalDice && latestBid.face === MAX_DIE_FACE;

  const handleBidAction = () => {
    if (latestBid && latestBid.amount === totalDice && latestBid.face === MAX_DIE_FACE) return;
    setTurnActionStep("proceedWithAction");
    setAction("bid");
  };

  const handleOnClickAction = (action: TurnAction) => {
    if (action === "exact" || action === "boloney") {
      if (!latestBid) return;
    }
    if (action === "healDice" && !canHealDice) return;
    setTurnActionStep("proceedWithAction");
    setAction(action);
  };

  const handlePowerUpAction = () => {
    setTurnActionStep("proceedWithAction");
    setAction("powerUp");
    showModal("power-up-use");
  };

  return (
    <ActivePlayerWrapper>
      <ActivePlayerContainer>
        <PowerUpButtonContainer>
          <PrimaryButtonWithHelper
            text={text.match.powerUp}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
            onClick={() => handlePowerUpAction()}
          />
          <PrimaryButtonWithHelper
            disabled={!canHealDice}
            text={text.match.healDice}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
            onClick={() => {
              handleOnClickAction("healDice");
            }}
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
              handleOnClickAction("boloney");
            }}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
          />
          <PrimaryButtonWithHelper
            disabled={!latestBid}
            text={text.match.exact}
            onClick={() => {
              handleOnClickAction("exact");
            }}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
          />
        </ActionButtonContainer>
      </ActivePlayerContainer>
    </ActivePlayerWrapper>
  );
};
