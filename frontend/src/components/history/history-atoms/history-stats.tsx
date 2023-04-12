import { FC } from "react";
import { text } from "../../../assets";
import { color, shadows } from "../../../design";
import { GeneralText } from "../../atoms";
import { DiceIcon } from "../../icons";
import { MatchStateItemDrawRound } from "../../top-navigation/match-state/match-stats-item-draw-round";
import { HistoryStatsContainer, HistoryVerticalDivider } from "./styles";

export interface StatsProps {
  totalDice: number;
  stageNumber: number;
  drawRoundCounter: number;
  powerUpsAmount?: number;
}

export const HistoryStats: FC<StatsProps> = ({ totalDice, stageNumber, powerUpsAmount, drawRoundCounter }) => {
  return (
    <HistoryStatsContainer>
      <DiceIcon customcolor={color.mediumGrey} diceAmount={totalDice} iconColor={color.white} pipColor={color.black} shadow={shadows.xs} />
      <HistoryVerticalDivider />
      <GeneralText transformText="none" customcolor={color.mediumGrey}>
        {text.param.stageNumber(stageNumber)}
      </GeneralText>
      <HistoryVerticalDivider />
      <MatchStateItemDrawRound customcolor={color.mediumGrey} powerUpsAmount={powerUpsAmount} drawRoundCounter={drawRoundCounter} />
    </HistoryStatsContainer>
  );
};
