import styled from "@emotion/styled";

import { breakpoints, buttonSize, color, fonts, fontSizes, fontWeights, lineHeights, spacing, TransformText } from "../../design";
import { BaseIconWrapper } from "./icon-wrappers";

// Buttons must have capital letter for their original text

export type IconPosition = "row" | "column" | "row-reverse" | "column-reverse" | "start" | "end";

interface Props {
  loading?: boolean;
  fontColor?: string;
  backgroundColor?: string;
  padding?: string;
  transformText?: TransformText;
  hoverColor?: string;
  borderColor?: string;
  gap?: string;
  iconPosition?: IconPosition;
  disabledColor?: string;
  active?: boolean;
  width?: string;
  justifyContent?: string;
  fontWeight?: string;
}

export const PrimaryButtonBase = styled.button<Props>`
  user-select: none;
  font-family: ${fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.regular};
  font-size: ${fontSizes.primaryButton.md};
  line-height: ${lineHeights.primaryButton.md};
  text-transform: ${({ transformText }): string => transformText || "uppercase"};
  letter-spacing: -0.02em;
  border: none;
  background: ${({ backgroundColor }): string => backgroundColor ?? color.white};
  color: ${({ fontColor }): string => fontColor ?? color.black};
  width: ${({ width }): string => width ?? buttonSize.auto};
  padding: ${buttonSize.lg};
  position: relative;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  justify-content: ${({ justifyContent }): string => justifyContent ?? "center"};

  :disabled {
    color: ${color.mediumGrey};
    background: ${color.translucentGrey};
    cursor: default;
  }

  ${({ loading }) =>
    loading &&
    `
    background: ${color.translucentGrey};
    backdrop-filter: blur(5px);
    color: ${color.lightGrey};
      && {
        cursor: default;
      }
    `};
  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.primaryButton.sm};
    line-height: ${lineHeights.primaryButton.sm};
  }

  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.primaryButton.lg};
    line-height: ${lineHeights.primaryButton.lg};
  }
`;

export const SecondaryButtonBase = styled.button<Props>`
  user-select: none;
  font-family: ${fonts.primary};
  font-weight: ${fontWeights.light};
  font-size: ${fontSizes.body.md};
  line-height: ${lineHeights.body.md};
  border: 1px solid ${({ borderColor }): string => borderColor ?? color.mediumGrey};
  background: ${({ backgroundColor }): string => backgroundColor ?? color.transparent};
  color: ${({ fontColor }): string => fontColor ?? color.black};
  padding: ${({ padding }): string => padding ?? `${spacing.s} ${spacing.ms}`};
  text-align: center;
  display: inline-flex;
  gap: ${spacing.xs};
  flex-direction: ${({ iconPosition }): string => iconPosition ?? "row"};
  width: ${({ width }): string => width ?? buttonSize.auto};
  align-items: center;
  justify-content: ${({ justifyContent }): string => justifyContent ?? "center"};
  cursor: pointer;
  min-width: fit-content;

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.body.sm};
    line-height: ${lineHeights.body.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.body.lg};
    line-height: ${lineHeights.body.lg};
  }

  :active {
    background: ${({ hoverColor }): string => hoverColor ?? color.cloudWhite};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }

  :hover {
    background: ${({ hoverColor }): string => hoverColor ?? color.grey};
  }

  :disabled {
    cursor: default;
    background: ${({ backgroundColor }): string => backgroundColor ?? color.transparent};
    color: ${color.darkGrey};
    border: none;
    ${BaseIconWrapper} {
      > svg {
        path {
          stroke: ${({ disabledColor }): string => disabledColor ?? color.darkGrey};
          fill: ${({ disabledColor }): string => disabledColor ?? color.darkGrey};
        }
      }
    }
  }
`;

export const TertiaryButtonBase = styled(SecondaryButtonBase)<Props>`
  border: none;
`;
