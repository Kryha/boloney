import { FC } from "react";
import { text } from "../../../assets";
import { color } from "../../../design";
import { GeneralText } from "../../atoms";
import { DiceIcon } from "../../icons";
import { MatchStateItemDrawRound } from "../../top-navigation/match-state/match-stats-item-draw-round";
import { HistoryStatsContainer, HistoryVerticalDivider } from "./styles";

export interface StatsProps {
  totalDice: number;
  stageNumber: number;
  drawRoundCounter: number;
  powerUpsAmount?: number;
  roundNumber: number;
}

export const HistoryStats: FC<StatsProps> = ({ totalDice, stageNumber, powerUpsAmount, drawRoundCounter, roundNumber }) => {
  return (
    <HistoryStatsContainer>
      <DiceIcon diceAmount={totalDice} faceColor={color.white} pipColor={color.black} />
      <HistoryVerticalDivider />
      <GeneralText customColor={color.mediumGrey}>{text.param.stageNumber(stageNumber)}</GeneralText>
      <HistoryVerticalDivider />
      <MatchStateItemDrawRound powerUpsAmount={powerUpsAmount} roundNumber={roundNumber} drawRoundCounter={drawRoundCounter} />
    </HistoryStatsContainer>
  );
};
