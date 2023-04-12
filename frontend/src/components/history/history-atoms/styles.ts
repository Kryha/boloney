import styled from "@emotion/styled";
import { color, margins } from "../../../design";
import { Row, GeneralText } from "../../atoms";
import { BadgeWrapper } from "../../badges/styles";
import { DiceContainer } from "../../match-players-overview/styles";

interface HistoryBadgeProps {
  customBackground?: string;
}

interface HistoryContainerProps {
  isHeader?: boolean;
}

export const HistoryBadgeWrapper = styled.section<HistoryBadgeProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  width: 25vw;
  position: relative;
  background-color: ${({ customBackground }): string => customBackground || color.lightGrey};
  ${BadgeWrapper} {
    right: 0;
    top: 0;
  }
`;

export const HistoryHeader = styled(HistoryBadgeWrapper)``;

export const HistoryBadgeContainer = styled.div<HistoryContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ isHeader }): string => (isHeader ? "16px" : "0px")};
  gap: ${({ isHeader }): string => (isHeader ? "10px" : "0px")};
`;

export const HistoryDivider = styled.div`
  min-height: 1px;
  width: 25vw;
  background: ${color.grey};
`;

export const HistoryStatsContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  height: 20px;
  ${GeneralText}:first-letter {
    text-transform: none;
  }
`;

export const HistoryVerticalDivider = styled.div`
  height: 14px;
  min-width: 1px;
  margin: ${margins.small0};
  background: ${color.mediumGrey};
`;

export const HistoryNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
`;

export const HistoryActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;

export const HistoryContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 25vw;
  position: relative;
  overflow: hidden;
  ${DiceContainer} {
    background: ${color.grey};
    position: absolute;
    right: -5px;
    top: -8px;
    padding: 20px;
  }
`;

export const TimerRow = styled(Row)`
  gap: 10px;
`;

export const EndOfRoundHistoryListWrapper = styled.div`
  background: rgba(238, 238, 234, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 6px 0px 0px;
`;

export const EndOfRoundRow = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 16px;
  gap: 6px;
  ${GeneralText} {
    color: ${color.mediumGrey};
  }
`;

export const InfoRow = styled(Row)`
  gap: 4px;
`;
