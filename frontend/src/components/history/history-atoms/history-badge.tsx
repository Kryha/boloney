import { FC } from "react";
import { text } from "../../../assets";
import { color } from "../../../design";
import { usePlayer } from "../../../service";
import { HistoryBidAction } from "../../../types";
import { parseTimeFormat } from "../../../util";

import { PlayerLastBid } from "../../match-players-overview";
import {
  HistoryBadgeContainer,
  HistoryBadgeWrapper,
  HistoryContentWrapper,
  HistoryDivider,
  HistoryNameWrapper,
  TimeStamp,
  Username,
} from "./styles";

interface HistoryNameProps {
  username: string;
  time: string | number;
}

export const HistoryName: FC<HistoryNameProps> = ({ username, time }) => {
  return (
    <HistoryNameWrapper>
      <Username>{username}</Username>
      <TimeStamp customColor={color.mediumGrey}>{text.param.timerHeader(time)}</TimeStamp>
    </HistoryNameWrapper>
  );
};

interface HistoryBidBadgeProps {
  historyBid: HistoryBidAction;
}

export const HistoryBadgeBid: FC<HistoryBidBadgeProps> = ({ historyBid }) => {
  const player = usePlayer(historyBid.userId);

  if (!player) return <></>;

  return (
    <HistoryBadgeWrapper>
      <HistoryContentWrapper>
        <HistoryBadgeContainer isHeader>
          <HistoryName username={player.username} time={parseTimeFormat(historyBid.createdAt)} />
          <TimeStamp customColor={color.mediumGrey}>{text.history.bid}</TimeStamp>
        </HistoryBadgeContainer>
        <PlayerLastBid lastBid={historyBid} player={player} />
      </HistoryContentWrapper>
      <HistoryDivider />
    </HistoryBadgeWrapper>
  );
};
