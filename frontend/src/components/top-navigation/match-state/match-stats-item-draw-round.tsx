import { FC } from "react";
import { text } from "../../../assets";

import { param } from "../../../assets/text/param";
import { margins } from "../../../design";
import { GeneralText } from "../../atoms";
import { Lightning, MatchStateItemContainer } from "../styles";

interface PropItem {
  powerUpsAmount?: number;
  drawRoundCounter: number;
  customColor?: string;
}

export const MatchStateItemDrawRound: FC<PropItem> = ({ powerUpsAmount, drawRoundCounter, customColor }) => {
  return (
    <MatchStateItemContainer>
      <Lightning size={margins.small5} />
      <GeneralText customColor={customColor}>{param.drawPowerUpsRound(powerUpsAmount)}</GeneralText>
      <GeneralText customColor={customColor}>{text.match.inXAmountOfRounds}</GeneralText>
      <GeneralText customColor={customColor}>{param.matchStatusItemNumber(drawRoundCounter)}</GeneralText>
      <GeneralText customColor={customColor}>{param.round(drawRoundCounter)}</GeneralText>
    </MatchStateItemContainer>
  );
};
