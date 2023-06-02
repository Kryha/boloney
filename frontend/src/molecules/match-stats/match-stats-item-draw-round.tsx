import { FC } from "react";
import { LightningIconSVG, text } from "../../assets";
import { param } from "../../assets/text/param";
import { BaseIcon, BaseRow, GeneralText } from "../../atoms";
import { color } from "../../design";
import { MatchStatsItemContainer } from "./styles";

interface Props {
  powerUpsAmount?: number;
  drawRoundCounter: number;
  customcolor?: string;
}

/**
 * Molecule for match state item draw round.
 * @param {powerUpsAmount} - Amount of power-ups
 * @param {drawRoundCounter} - Rounds until draw round
 * @param {customcolor} - Custom color for text
 */

export const MatchStatsItemDrawRound: FC<Props> = ({ powerUpsAmount, drawRoundCounter, customcolor }) => {
  return (
    <MatchStatsItemContainer alignItems="center" justifyContent="flex-end">
      <BaseRow alignItems="center">
        <BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.mediumGrey} />
      </BaseRow>
      {powerUpsAmount && (
        <GeneralText transformText="none" customcolor={customcolor}>
          {param.drawPowerUpsRound(powerUpsAmount)}
        </GeneralText>
      )}
      <GeneralText transformText="none" customcolor={customcolor}>
        {text.match.inXAmountOfRounds}
      </GeneralText>
      <GeneralText transformText="none" customcolor={customcolor}>
        {param.matchStatusItemNumber(drawRoundCounter)}
      </GeneralText>
      <GeneralText transformText="none" customcolor={customcolor}>
        {param.round(drawRoundCounter)}
      </GeneralText>
    </MatchStatsItemContainer>
  );
};
