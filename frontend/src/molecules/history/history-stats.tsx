import { FC } from "react";
import { text } from "../../assets";
import { BaseRow, GeneralText, HistoryVerticalDivider } from "../../atoms";
import { color, shadows, spacing } from "../../design";
import { DiceIcon } from "../icons";
import { MatchStatsItemDrawRound } from "../match-stats";

export interface StatsProps {
  totalDice: number;
  stageNumber: number;
  drawRoundCounter: number;
  powerUpsAmount?: number;
}

/**
 * Molecule for displaying history stats.
 * @param {totalDice} - Total amount of dice
 * @param {stageNumber} - Current stage number
 * @param {drawRoundCounter} - Rounds until draw round
 * @param {powerUpsAmount} - Amount of power-ups
 */

export const HistoryStats: FC<StatsProps> = ({ totalDice, stageNumber, powerUpsAmount, drawRoundCounter }) => {
  return (
    <BaseRow alignItems="center">
      <DiceIcon
        customcolor={color.mediumGrey}
        diceAmount={totalDice}
        iconColor={color.transparent}
        pipColor={color.mediumGrey}
        shadow={shadows.xs}
      />
      <HistoryVerticalDivider height={spacing.s} customcolor={color.mediumGrey} />
      <GeneralText transformText="none" customcolor={color.mediumGrey}>
        {text.param.stageNumber(stageNumber)}
      </GeneralText>
      <HistoryVerticalDivider height={spacing.s} customcolor={color.mediumGrey} />
      <MatchStatsItemDrawRound customcolor={color.mediumGrey} powerUpsAmount={powerUpsAmount} drawRoundCounter={drawRoundCounter} />
    </BaseRow>
  );
};
