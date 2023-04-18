import { FC } from "react";
import { param } from "../../../assets/text/param";
import { text } from "../../../assets";
import { GeneralText } from "../../../atoms";
import { MatchStateItemContainer } from "../styles";

interface PropItem {
  phaseNumber: number;
}

export const MatchStateItemStage: FC<PropItem> = ({ phaseNumber }) => {
  return (
    <MatchStateItemContainer>
      <GeneralText>{text.match.currentlyAtStage}</GeneralText>
      <GeneralText>{param.matchStatusItemNumber(phaseNumber)}</GeneralText>
    </MatchStateItemContainer>
  );
};
