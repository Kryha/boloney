import styled from "@emotion/styled";
import { color, containerHeight, spacing } from "../../design";
import { BaseColumn, BaseRow } from "../../atoms";

interface Props {
  padding?: string;
}

export const MatchInfoOverview = styled(BaseColumn)<Props>`
  padding: ${({ padding }): string => padding ?? "0px"};
  background: ${color.lightGrey};
  min-height: ${containerHeight.sm};
`;

export const HandImageWrapper = styled(BaseRow)`
  margin-top: ${spacing.xxs};
`;
