import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { VerticalDivider, BaseRow, IconPosition, TooltipText, Heading1, BaseColumn, Heading2, fadeIn, GeneralText } from "../../atoms";
import { breakpoints, containerWidth, lineHeights, mobileHeight, spacing } from "../../design";

interface TooltipProps {
  gap?: string;
  flexDirection?: IconPosition;
}

export const GeneralWrapper = styled.div``;

interface PowerUpHeadingContentProps {
  isDetailShown?: boolean;
}

export const PowerUpHeadingContent = styled.div<PowerUpHeadingContentProps>`
  ${({ isDetailShown }) =>
    isDetailShown
      ? css`
          animation: ${fadeIn} 0.5s forwards;
        `
      : "display: none;"};
`;

export const PowerUpColumn = styled(BaseColumn)`
  ${GeneralText},${Heading2} {
    opacity: 0;
    animation: ${fadeIn} 0.5s forwards;
  }
`;

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
  @media (max-width: ${breakpoints.md}) {
    padding: ${spacing.xs} ${spacing.md};
  }
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
  @media (max-width: ${breakpoints.md}) {
    width: ${containerWidth.fluid};
  }
`;

export const NumberedColumn = styled(BaseColumn)`
  padding: 0px 0px 0px ${spacing.md};

  @media (max-width: ${breakpoints.md}) {
    padding: 0px ${spacing.sm};
  }
`;

export const NumberedParagraph = styled(BaseColumn)`
  padding: 0px ${spacing.md} ${spacing.sm} ${spacing.md};
  margin-top: -2vw;

  @media (max-width: ${breakpoints.md}) {
    padding: 0px ${spacing.sm} ${spacing.xs} ${spacing.sm};
    margin-top: -${mobileHeight.sm};
    gap: ${spacing.s};
  }
  @media (min-height: ${breakpoints.sm}) and (max-width: ${breakpoints.md}) {
    margin-top: -${mobileHeight.xs};
    gap: ${spacing.s};
  }
`;

export const NotificationHeadingWrapper = styled(BaseColumn)`
  @media (max-width: ${breakpoints.md}) {
    gap: ${spacing.s};
  }
`;
