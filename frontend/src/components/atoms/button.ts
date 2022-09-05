import styled from "@emotion/styled";

import { color } from "../../design";

interface ButtonProps {
  backgroundColor?: string;
  fontColor?: string;
  disabled?: boolean;
}

export const PrimaryButtonBase = styled.button<ButtonProps>`
  font-family: ibm-plex-mono;
  font-weight: 500;
  font-size: 82px;
  line-height: 64px;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  background: ${(props): string => props.backgroundColor || "none"};
  color: ${(props): string => props.fontColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
  cursor: pointer;
  ${({ disabled }): string => {
    return disabled
      ? `
      color: ${color.darkGrey};
      && {
        cursor: default;
      }
        `
      : "";
  }};
`;

export const SecondaryButtonBase = styled.button<ButtonProps>`
  font-family: ibm-plex-mono;
  font-weight: 400;
  font-size: 16px;
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
  ${({ disabled }): string => {
    return disabled
      ? `
      color: ${color.darkGrey};
      && {
        cursor: default;
      }
        `
      : "";
  }};
`;
