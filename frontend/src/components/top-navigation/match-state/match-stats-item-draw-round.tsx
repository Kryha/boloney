import { FC } from "react";
import { text } from "../../../assets";

import { param } from "../../../assets/text/param";
import { margins } from "../../../design";
import { GeneralText } from "../../atoms";
import { Lightning, MatchStateItemContainer } from "../styles";

interface PropItem {
  powerUpsAmount?: number;
  drawRoundCounter: number;
  customcolor?: string;
}

export const MatchStateItemDrawRound: FC<PropItem> = ({ powerUpsAmount, drawRoundCounter, customcolor }) => {
  return (
    <MatchStateItemContainer>
      <Lightning size={margins.small5} />
      <GeneralText customcolor={customcolor}>{param.drawPowerUpsRound(powerUpsAmount)}</GeneralText>
      <GeneralText customcolor={customcolor}>{text.match.inXAmountOfRounds}</GeneralText>
      <GeneralText customcolor={customcolor}>{param.matchStatusItemNumber(drawRoundCounter)}</GeneralText>
      <GeneralText customcolor={customcolor}>{param.round(drawRoundCounter)}</GeneralText>
    </MatchStateItemContainer>
  );
};
