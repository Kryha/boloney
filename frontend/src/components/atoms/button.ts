import styled from "@emotion/styled";

import { breakpoints, color, fonts, fontSizes, fontWeights, lineHeights } from "../../design";

interface ButtonProps {
  backgroundColor?: string;
  fontColor?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const PrimaryButtonBase = styled.button<ButtonProps>`
  user-select: none;
  font-family: ${fonts.primary};
  font-weight: ${fontWeights.regular};
  font-size: ${fontSizes.large};
  line-height: ${lineHeights.medium};
  letter-spacing: -0.02em;
  text-transform: uppercase;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  background: ${(props): string => props.backgroundColor || color.white};
  color: ${(props): string => props.fontColor || color.black};
  cursor: pointer;
  padding: 10px;
  position: relative;
  ${({ disabled }) =>
    disabled &&
    `
      color: ${color.darkGrey};
      background: rgba(255, 255, 255, 0.2);
      && {
        cursor: default;
      }
    `};

  ${({ isLoading }) =>
    isLoading &&
    `
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    color: ${color.lightGrey};
      && {
        cursor: default;
      }
    `};
  white-space: nowrap;
  text-align: center;
  @media (max-width: ${breakpoints.md}) {
    max-height: 30px;
  }
`;

export const SecondaryButtonBase = styled.button<ButtonProps>`
  user-select: none;
  font-family: ${fonts.primary};
  font-weight: ${fontWeights.light};
  font-size: ${fontSizes.body.md};
  line-height: ${lineHeights.body.md};
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  background: ${(props): string => props.backgroundColor || "none"};
  color: ${(props): string => props.fontColor || color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.body.sm};
    line-height: ${lineHeights.body.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.body.lg};
    line-height: ${lineHeights.body.lg};
  }

  :first-letter {
    text-transform: capitalize;
  }
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  ${({ disabled }) =>
    disabled &&
    `
      color: ${color.darkGrey};
      && {
        cursor: default;
      }
    `};
  white-space: nowrap;
  text-align: center;
`;
