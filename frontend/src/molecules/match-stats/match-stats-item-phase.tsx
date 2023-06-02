import { FC } from "react";
import { text } from "../../assets";
import { param } from "../../assets/text/param";
import { GeneralText } from "../../atoms";
import { color } from "../../design";
import { MatchStatsItemContainer } from "./styles";

interface Props {
  phaseNumber: number;
  customcolor?: string;
}

/**
 * Molecule for match state item stage.
 * @param {phaseNumber} - Phase number
 */

export const MatchStatsItemStage: FC<Props> = ({ phaseNumber, customcolor }) => {
  return (
    <MatchStatsItemContainer>
      <GeneralText customcolor={customcolor || color.black}>{text.match.currentlyAtStage}</GeneralText>
      <GeneralText customcolor={customcolor || color.black}>{param.matchStatusItemNumber(phaseNumber)}</GeneralText>
    </MatchStatsItemContainer>
  );
};
