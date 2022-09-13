import styled from "@emotion/styled";

import { color, fontSize, fontWeight } from "../../design";

interface ButtonProps {
  backgroundColor?: string;
  fontColor?: string;
  disabled?: boolean;
}

export const PrimaryButtonBase = styled.button<ButtonProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.regular};
  font-size: 60px;
  line-height: 44px;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  background: ${(props): string => props.backgroundColor || color.white};
  color: ${(props): string => props.fontColor || color.black};
  cursor: pointer;
  padding: 13px 16px 10px 16px;
  height: 70px;
  ${({ disabled }) => (disabled && `
      color: ${color.darkGrey};
      background: transparent;
      && {
        cursor: default;
      }
    `
  )};
`;

export const SecondaryButtonBase = styled.button<ButtonProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.small1};
  line-height: 24px;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  background: ${(props): string => props.backgroundColor || "none"};
  color: ${(props): string => props.fontColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
  cursor: pointer;
  cursor: ${({ disabled }) => (!disabled && "pointer")};
  ${({ disabled }) => (disabled && `
      color: ${color.darkGrey};
      && {
        cursor: default;
      }
    `
  )};
`;
