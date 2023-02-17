import { FC } from "react";
import { text } from "../../../assets";

import { color } from "../../../design";
import { HistoryRoundStart } from "../../../types";
import { getNumberWithOrdinal } from "../../../util";
import { Heading6 } from "../../atoms";
import { HistoryStats } from "./history-stats";
import { HistoryBadgeWrapper, HistoryBadgeContainer, HistoryDivider } from "./styles";

interface Props {
  roundStart: HistoryRoundStart;
}

export const RoundBadge: FC<Props> = ({ roundStart }) => {
  return (
    <HistoryBadgeWrapper customBackground={color.offWhite}>
      <HistoryBadgeContainer isHeader>
        <Heading6>{text.param.roundWithOrdinal(getNumberWithOrdinal(roundStart.roundNumber))}</Heading6>
        <HistoryStats
          totalDice={roundStart.totalDiceAmount}
          stageNumber={roundStart.stageNumber}
          drawRoundCounter={roundStart.roundsUntillDrawRound}
          roundNumber={roundStart.roundNumber}
        />
      </HistoryBadgeContainer>
      <HistoryDivider />
    </HistoryBadgeWrapper>
  );
};
