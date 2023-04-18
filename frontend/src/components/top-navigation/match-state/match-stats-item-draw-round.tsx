import { FC } from "react";
import { LightningIconSVG, text } from "../../../assets";

import { param } from "../../../assets/text/param";
import { color } from "../../../design";
import { LightningContainer } from "../../../pages/new-match/styles";
import { BaseIcon, GeneralText } from "../../../atoms";
import { MatchStateItemContainer } from "../styles";

interface PropItem {
  powerUpsAmount?: number;
  drawRoundCounter: number;
  customcolor?: string;
}

export const MatchStateItemDrawRound: FC<PropItem> = ({ powerUpsAmount, drawRoundCounter, customcolor }) => {
  return (
    <MatchStateItemContainer>
      <LightningContainer>
        <BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />
      </LightningContainer>
      <GeneralText customcolor={customcolor}>{param.drawPowerUpsRound(powerUpsAmount)}</GeneralText>
      <GeneralText customcolor={customcolor}>{text.match.inXAmountOfRounds}</GeneralText>
      <GeneralText customcolor={customcolor}>{param.matchStatusItemNumber(drawRoundCounter)}</GeneralText>
      <GeneralText customcolor={customcolor}>{param.round(drawRoundCounter)}</GeneralText>
    </MatchStateItemContainer>
  );
};
