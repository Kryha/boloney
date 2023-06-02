import { FC } from "react";
import { text } from "../../assets";
import { Heading6, HistoryBadgeContainer, HistoryBadgeWrapper, HorizontalDivider } from "../../atoms";
import { color, containerWidth, spacing } from "../../design";
import { HistoryRoundStart } from "../../types";
import { getNumberWithOrdinal } from "../../util";
import { HistoryStats } from "./history-stats";

interface Props {
  roundStart: HistoryRoundStart;
}

/**
 *  Molecule component for history start of round entry.
 * @param {roundStart} - Round start data
 */

export const RoundBadge: FC<Props> = ({ roundStart }) => {
  return (
    <HistoryBadgeWrapper customBackground={color.cloudWhite} alignItems="flex-start" justifyContent="center">
      <HistoryBadgeContainer gap={spacing.xs}>
        <Heading6>{text.param.roundWithOrdinal(getNumberWithOrdinal(roundStart.roundNumber))}</Heading6>
        <HistoryStats
          totalDice={roundStart.totalDiceAmount}
          stageNumber={roundStart.stageNumber}
          drawRoundCounter={roundStart.roundsUntillDrawRound}
        />
      </HistoryBadgeContainer>
      <HorizontalDivider width={containerWidth.md} customcolor={color.grey} />
    </HistoryBadgeWrapper>
  );
};
