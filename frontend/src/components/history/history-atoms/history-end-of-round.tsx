import { FC } from "react";
import { text } from "../../../assets";
import { color } from "../../../design";
import { TimeStamp, Heading6 } from "../../atoms";
import { HistoryPlayerStats, HistoryRoundResults, PlayerPublic } from "../../../types";
import { getNumberWithOrdinal, parseTimeFormat } from "../../../util";
import { EndOfRoundHistoryList, HistoryActionTitle, HistoryOutcome } from "./history-action";
import { HistoryBadgeWrapper, HistoryBadgeContainer, HistoryDivider, TimerRow, EndOfRoundHistoryListWrapper } from "./styles";

export interface Props {
  endOfRound: HistoryRoundResults;
  players: Record<string, PlayerPublic>;
  localPlayer: PlayerPublic;
}

export const HistoryEndOfRound: FC<Props> = ({ endOfRound, players, localPlayer }) => {
  const isLocalPlayer = endOfRound.roundWinner?.playerStats.userId === localPlayer.userId;
  let actionName: string;

  switch (endOfRound.roundEnd.actionName) {
    case "boloney":
    case "exact":
      actionName = endOfRound.roundEnd.actionName;
      break;
    case "lostByTimeOut":
      actionName = text.history.lostByTimeout;
      break;
    case "leftMatch":
      actionName = text.history.playerLeft;
      break;
  }

  const getDiceValues = (stats: HistoryPlayerStats) => {
    return stats.diceValue?.map((dice) => dice.rolledValue).sort((a, b) => a - b);
  };

  return (
    <HistoryBadgeWrapper customBackground={color.cloudWhite}>
      <HistoryBadgeContainer isHeader>
        <TimerRow>
          <Heading6>{text.param.endOfRoundOrdinal(getNumberWithOrdinal(endOfRound.roundEnd.roundNumber))}</Heading6>
          <TimeStamp customColor={color.mediumGrey}>{parseTimeFormat(endOfRound.roundEnd.createdAt)}</TimeStamp>
        </TimerRow>
        <HistoryActionTitle
          headingOne={text.history.action}
          headingOneColor={color.mediumGrey}
          headingTwo={actionName}
          headingTwoColor={color.black}
        />
      </HistoryBadgeContainer>
      {endOfRound.roundWinner && <HistoryDivider />}
      {endOfRound.roundWinner && (
        <HistoryOutcome
          outcome={endOfRound.roundWinner}
          player={players[endOfRound.roundWinner.playerStats.userId]}
          isLocalPlayer={isLocalPlayer}
          actionName={endOfRound.roundEnd.actionName}
        />
      )}
      {endOfRound.roundLoser && <HistoryDivider />}
      {endOfRound.roundLoser && (
        <HistoryOutcome
          outcome={endOfRound.roundLoser}
          player={players[endOfRound.roundLoser.playerStats.userId]}
          isLocalPlayer={isLocalPlayer}
          actionName={endOfRound.roundEnd.actionName}
        />
      )}
      <HistoryDivider />
      <EndOfRoundHistoryListWrapper>
        {endOfRound.roundStats.map((stats, index) => (
          <>
            <EndOfRoundHistoryList
              playerName={players[stats.userId].username}
              diceAmount={stats.diceAmount}
              powerUpAmount={stats.powerUpsAmount}
              key={index}
              diceValues={getDiceValues(stats)}
            />
            <HistoryDivider />
          </>
        ))}
      </EndOfRoundHistoryListWrapper>
    </HistoryBadgeWrapper>
  );
};
