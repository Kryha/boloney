import { FC } from "react";
import { text } from "../../assets";
import {
  BaseRow,
  HistoryBadgeContainer,
  HistoryBadgeWrapper,
  HistoryContentWrapper,
  HorizontalDivider,
  PlayerInfoText,
  TimeStamp,
} from "../../atoms";
import { color, containerWidth, fontWeights, spacing } from "../../design";
import { HistoryBidAction, PlayerPublic } from "../../types";
import { parseTimeFormat } from "../../util";
import { LastBidPlayer } from "../die";
import { DiceContainer } from "./styles";

interface HistoryNameProps {
  username: string;
  time: string | number;
}

/**
 *  Molecule component for history player name.
 * @param {username} - Username of player
 * @param {time} - Timestamp of action
 */

export const HistoryName: FC<HistoryNameProps> = ({ username, time }) => {
  return (
    <BaseRow alignItems="center" gap={spacing.xs}>
      <PlayerInfoText fontWeight={fontWeights.regular}>{username}</PlayerInfoText>
      <TimeStamp fontWeight={fontWeights.light} customcolor={color.mediumGrey}>
        {text.param.timerHeader(time)}
      </TimeStamp>
    </BaseRow>
  );
};

interface HistoryBidBadgeProps {
  historyBid: HistoryBidAction;
  player: PlayerPublic;
  dieColor: string;
}

/**
 *  Molecule component for history bid entry.
 * @param {historyBid} - History bid action
 * @param {player} - Player who made the bid
 * @param {dieColor} - Color of die
 */

export const HistoryBadgeBid: FC<HistoryBidBadgeProps> = ({ historyBid, player, dieColor }) => {
  return (
    <HistoryBadgeWrapper alignItems="flex-start" justifyContent="center">
      <HistoryContentWrapper justifyContent="space-between" alignItems="flex-start">
        <HistoryBadgeContainer gap={spacing.xs}>
          <HistoryName username={player.username} time={parseTimeFormat(historyBid.createdAt)} />
          <PlayerInfoText fontWeight={fontWeights.light} customcolor={color.darkGrey}>
            {text.history.bid}
          </PlayerInfoText>
        </HistoryBadgeContainer>
        <DiceContainer gap={spacing.sm} padding={spacing.xs}>
          <LastBidPlayer lastBid={historyBid} dieColor={dieColor} />
        </DiceContainer>
      </HistoryContentWrapper>
      <HorizontalDivider width={containerWidth.md} customcolor={color.grey} />
    </HistoryBadgeWrapper>
  );
};
