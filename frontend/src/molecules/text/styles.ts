import styled from "@emotion/styled";
import { VerticalDivider, BaseRow, IconPosition, TooltipText, Heading1, BaseColumn } from "../../atoms";
import { breakpoints, containerWidth, lineHeights, spacing } from "../../design";

interface TooltipProps {
  gap?: string;
  flexDirection?: IconPosition;
}

export const GeneralWrapper = styled.div``;

export const TimerHeaderDivider = styled(VerticalDivider)`
  height: ${lineHeights.body.md};

  @media (max-width: ${breakpoints.md}) {
    height: ${lineHeights.body.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    height: ${lineHeights.body.lg};
  }
`;

export const TooltipHeading = styled(TooltipText)<TooltipProps>`
  margin-right: ${({ gap }) => gap ?? spacing.xs};
`;

export const FlexibleRow = styled(BaseRow)<TooltipProps>`
  flex-direction: ${({ flexDirection }) => flexDirection ?? "row"};
`;

export const ParagraphContainer = styled.div`
  padding: ${spacing.xs} ${spacing.s};
`;

export const NumberedSection = styled.section`
  counter-reset: css-counter 0;
  ${Heading1} {
    counter-increment: css-counter 1;
  }
  ${Heading1}:after {
    content: counter(css-counter, decimal-leading-zero) "";
  }
  width: ${containerWidth.xxl};
`;

export const NumberedColumn = styled(BaseColumn)`
  padding: 0px 0px 0px ${spacing.md};
`;

export const NumberedParagraph = styled(BaseColumn)`
  padding: 0px 0px ${spacing.sm} ${spacing.md};
  margin-top: -2vw;
`;
