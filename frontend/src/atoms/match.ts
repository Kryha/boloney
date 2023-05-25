import styled from "@emotion/styled";
import { spacing } from "../design";
import { Heading1, Heading2, Heading3, Heading4, Heading5 } from "./text";

interface Props {
  withoutSideMargins?: boolean;
}

export const MatchContentWrapper = styled.div<Props>`
  margin-left: ${({ withoutSideMargins }) => (withoutSideMargins ? 0 : spacing.md)};
  margin-top: ${spacing.xxl};
  ${Heading1} {
    margin-top: ${spacing.xxs};
    margin-bottom: ${spacing.xxs};
  }
  ${Heading2} {
    margin-bottom: ${spacing.xxs};
  }
  ${Heading3}, ${Heading4}, ${Heading5} {
    margin-bottom: ${spacing.xs};
  }
`;
