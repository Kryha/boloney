import styled from "@emotion/styled";
import { color, containerWidth, margins, spacing } from "../design";
import { BaseColumn, BaseRow, FlexDirection } from "./grid";
import { VerticalDivider } from "./lines";

interface HistoryBadgeProps {
  customBackground?: string;
  flexDirection?: FlexDirection;
}

interface HistoryContainerProps {
  isHeader?: boolean;
}

interface EndOfRoundProps {
  padding?: string;
}

export const HistoryBadgeWrapper = styled(BaseColumn)<HistoryBadgeProps>`
  width: ${containerWidth.md};
  position: relative;
  flex-direction: ${({ flexDirection }): string => flexDirection || "column"};
  background-color: ${({ customBackground }): string => customBackground || color.lightGrey};
`;

export const HistoryBadgeContainer = styled(BaseColumn)<HistoryContainerProps>`
  padding: ${spacing.s};
`;

export const HistoryVerticalDivider = styled(VerticalDivider)`
  margin: ${margins.small0};
`;

export const HistoryContentWrapper = styled(BaseRow)`
  width: ${containerWidth.md};
  position: relative;
  overflow: hidden;
`;

export const EndOfRoundHistoryListWrapper = styled(BaseColumn)<EndOfRoundProps>`
  background: ${color.opaqueGrey};
  padding: ${({ padding }): string => padding || "0px"};
`;

export const EndOfRoundRow = styled(BaseRow)<EndOfRoundProps>`
  padding: ${({ padding }): string => padding || "0px"};
`;
