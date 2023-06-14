import styled from "@emotion/styled";
import { BaseRow, GeneralText } from "../../atoms";
import { buttonSize, color, spacing } from "../../design";

export const MatchStatsWrapper = styled(BaseRow)`
  background: ${color.grey};
  padding: ${buttonSize.sm};
  width: fit-content;
`;

export const MatchStatsItemContainer = styled(BaseRow)`
  padding: ${spacing.xxs};
  ${GeneralText} {
    padding: ${spacing.xxs};
  }
`;
