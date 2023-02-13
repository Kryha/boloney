import { FC } from "react";
import { text } from "../../assets";
import {
  BOLONEY_HELPER_WIDTH,
  HEAL_DICE_HELPER_WIDTH,
  MAX_DIE_FACE,
  POWER_UP_HELPER_WIDTH,
  BID_HELPER_WIDTH,
  EXACT_HELPER_WIDTH,
} from "../../constants";
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
            primaryText={text.match.powerUp}
            secondaryText={text.playerTurn.feelThePower}
            tooltipTitle={text.general.toolTipPowerUpTitle}
            tooltipInfo={text.general.toolTipPowerUpInfo}
            onClick={() => handlePowerUpAction()}
            width={POWER_UP_HELPER_WIDTH}
          />
          <PrimaryButtonWithHelper
            primaryText={text.match.healDice}
            secondaryText={text.playerTurn.healDiceSecondaryView}
            tooltipTitle={text.general.toolTipHealTitle}
            tooltipInfo={text.general.toolTipHealInfo}
            disabled={!canHealDice}
            onClick={() => {
              handleOnClickAction("healDice");
            }}
            width={HEAL_DICE_HELPER_WIDTH}
          />
        </PowerUpButtonContainer>
        <GeneralText>{text.match.or}</GeneralText>
        <ActionButtonContainer>
          <PrimaryButtonWithHelper
            disabled={maxBidPlaced}
            primaryText={text.match.bid}
            secondaryText={text.playerTurn.bidSecondaryView}
            onClick={() => {
              handleBidAction();
            }}
            tooltipTitle={text.general.toolTipBidTitle}
            tooltipInfo={text.general.toolTipBidInfo}
            width={BID_HELPER_WIDTH}
          />
          <PrimaryButtonWithHelper
            disabled={!latestBid}
            primaryText={text.match.boloney}
            secondaryText={text.playerTurn.boloneySecondaryView}
            onClick={() => {
              handleOnClickAction("boloney");
            }}
            tooltipTitle={text.general.toolTipBoloneyTitle}
            tooltipInfo={text.general.toolTipBoloneyInfo}
            width={BOLONEY_HELPER_WIDTH}
          />
          <PrimaryButtonWithHelper
            disabled={!latestBid}
            primaryText={text.match.exact}
            secondaryText={text.playerTurn.exactSecondaryView}
            onClick={() => {
              handleOnClickAction("exact");
            }}
            tooltipTitle={text.general.toolTipExactTitle}
            tooltipInfo={text.general.toolTipExactInfo}
            width={EXACT_HELPER_WIDTH}
          />
        </ActionButtonContainer>
      </ActivePlayerContainer>
    </ActivePlayerWrapper>
  );
};
