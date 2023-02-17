import styled from "@emotion/styled";
import { color, fontWeight, margins } from "../../../design";
import { GeneralText, Heading6, Row } from "../../atoms";
import { BadgeWrapper } from "../../badges/styles";
import { DieWrapper } from "../../die/styles";
import { DiceContainer } from "../../match-players-overview/styles";
import { Lightning } from "../../top-navigation/styles";

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
  ${Heading6} {
    text-transform: uppercase;
  }
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
  ${GeneralText} {
    color: ${color.mediumGrey};
  }
  ${Lightning} {
    path {
      stroke: ${color.mediumGrey};
    }
  }
  ${DieWrapper} {
    > svg {
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 20px rgba(0, 0, 0, 0.1);
    }
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

export const Username = styled(Heading6)`
  font-weight: ${fontWeight.regular};
`;

export const TimeStamp = styled(Heading6)`
  font-weight: ${fontWeight.light};
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
  ${Lightning} {
    path {
      stroke: ${color.mediumGrey};
    }
  }
`;

export const InfoRow = styled(Row)`
  gap: 4px;
  ${Lightning} {
    path {
      stroke: ${color.mediumGrey};
    }
  }
`;
