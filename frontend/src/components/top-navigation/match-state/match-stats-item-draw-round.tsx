import { FC } from "react";
import { text } from "../../../assets";

import { param } from "../../../assets/text/param";
import { margins } from "../../../design";
import { GeneralText } from "../../atoms";

import { Lightning, MatchStateItemContainer } from "../styles";

interface PropItem {
  powerUpsAmount?: number;
  drawRoundCounter: number;
}

export const MatchStateItemDrawRound: FC<PropItem> = ({ powerUpsAmount, drawRoundCounter }) => {
  return (
    <MatchStateItemContainer>
      <Lightning size={margins.small5} />
      <GeneralText>{param.drawPowerUpsRound(powerUpsAmount)}</GeneralText>
      <GeneralText>{text.match.inXAmountOfRounds}</GeneralText>
      <GeneralText>{param.matchStatusItemNumber(drawRoundCounter)}</GeneralText>
      <GeneralText>{param.round(drawRoundCounter)}</GeneralText>
    </MatchStateItemContainer>
  );
};
