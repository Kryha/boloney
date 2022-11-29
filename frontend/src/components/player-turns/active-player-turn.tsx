import { FC } from "react";

import { text } from "../../assets";
import { color } from "../../design";
import { useMatch } from "../../service";
import { GeneralText, Heading2 } from "../atoms";
import { PrimaryButtonWithHelper } from "../button-with-helper";
import { TimerHeader } from "../timer-header";
import { ActionButtonContainer, ActivePlayerContainer, ActivePlayerWrapper, PowerUpButtonContainer } from "./styles";

export const ActivePlayerTurns: FC = () => {
  const { broadcastPlaceBid, broadcastCallExact, broadcastCallBoloney } = useMatch();

  // TODO: implement actual view
  const handleBid = async () => {
    const face = Number(prompt("face"));
    const amount = Number(prompt("amount"));
    broadcastPlaceBid({ face, amount });
  };

  return (
    <ActivePlayerWrapper>
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={text.match.takeAction} />
      <Heading2>{text.match.whatsYourNextMove}</Heading2>
      <Heading2 customColor={color.darkGrey}>{text.match.timeToPickUpAStrategy}</Heading2>
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
          {/* TODO for adding the actual logic for the bid value */}
          <PrimaryButtonWithHelper
            text={text.match.bid}
            onClick={() => handleBid()}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
          />
          <PrimaryButtonWithHelper
            text={text.match.boloney}
            onClick={() => broadcastCallBoloney()}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
          />
          <PrimaryButtonWithHelper
            text={text.match.exact}
            onClick={() => broadcastCallExact()}
            tooltipTitle={text.general.toolTipTitle}
            tooltipInfo={text.general.toolTipInfo}
          />
        </ActionButtonContainer>
      </ActivePlayerContainer>
    </ActivePlayerWrapper>
  );
};
