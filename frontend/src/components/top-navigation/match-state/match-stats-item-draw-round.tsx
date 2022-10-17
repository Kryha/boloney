import { FC } from "react";
import { text } from "../../../assets";

import { param } from "../../../assets/text/param";
import { margins } from "../../../design";
import { GeneralText } from "../../atoms";

import { Lightning, MatchStateItemContainer } from "../styles";

interface PropItem {
  powerUpAmount: number;
  roundNumber: number;
}

export const MatchStateItemDrawRound: FC<PropItem> = ({ powerUpAmount, roundNumber }) => {
  return (
    <MatchStateItemContainer>
      <Lightning size={margins.small5} />
      <GeneralText>{param.drawPowerupsRound(powerUpAmount)}</GeneralText>
      <GeneralText>{text.match.inXAmountOfRounds}</GeneralText>
      <GeneralText>{param.matchStatusItemNumber(roundNumber)}</GeneralText>
      <GeneralText>{param.round(roundNumber)}</GeneralText>
    </MatchStateItemContainer>
  );
};
