import styled from "@emotion/styled";
import { ChevronDownIcon } from "../../assets";

import { color, fontSize, fontWeight, margins } from "../../design";

interface ErrorProps {
  isError?: boolean;
}

export const BaseInput = styled.input<ErrorProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.small2};
  line-height: 24px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: ${color.black};
  background-color: transparent;
  width: 100%;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:-webkit-autofill {
    background-clip: text;
    -webkit-background-clip: text;
  }
  &::placeholder {
    font-family: ibm-plex-mono;
    font-weight: ${fontWeight.light};
    font-size: ${fontSize.small2};
    line-height: 24px;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: ${color.black};
  }
  box-sizing: border-box;
  border: 1px solid ${({ isError }) => (isError ? color.red : color.mediumGrey)};
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  padding: 23px ${margins.large0};
  :hover {
    border: 1px solid ${color.black};
  }
  :active {
    border: 1px solid ${color.black};
  }
  :focus {
    border: 1px solid ${color.black};
  }
  :disabled {
    &::placeholder {
      color: ${color.darkGrey};
    }
  }
`;

// export const ChevronDown = styled(ChevronDownIcon)``;

export const BaseSelect = styled.select<ErrorProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.small1};
  line-height: 24px;
  letter-spacing: -0.01em;
  color: ${color.black};
  background-color: transparent;
  width: 100%;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  box-sizing: border-box;
  border: 1px solid ${({ isError }) => (isError ? color.red : color.mediumGrey)};
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;

  padding: 23px ${margins.large0};
  :hover {
    border: 1px solid ${color.black} !important;
  }
  :active {
    border: 1px solid ${color.black} !important;
  }
  :focus {
    border: 1px solid ${color.black} !important;
  }
  :disabled {
    &::placeholder {
      color: ${color.darkGrey};
    }
  }
  :focus {
    box-shadow: none;
    outline: none;
  }
  background-image: url(${ChevronDownIcon});
  background-position: right ${margins.large0} center;
  background-repeat: no-repeat;
  select::-ms-expand {
    display: none;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
`;

export const BaseOption = styled.option<ErrorProps>``;
