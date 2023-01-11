import styled from "@emotion/styled";

import { ChevronDownIcon, RightArrowIconUrl } from "../../assets";
import { color, fontSize, fontWeight, margins } from "../../design";

export const BaseInput = styled.input`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.small2};
  line-height: 24px;
  letter-spacing: -0.01em;
  text-transform: lowercase;
  color: ${color.black};
  background-color: transparent;
  width: 100%;
  -moz-appearance: textfield;
  border-radius: 0px;
  -webkit-border-radius: 0px;
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
  padding: 23px ${margins.large0};
  border: none;
  :focus {
    outline-width: 0px !important;
    box-shadow: none;
    outline: none;
  }
  :disabled {
    &::placeholder {
      color: ${color.darkGrey};
    }
  }
  -webkit-appearance: none;
  -moz-appearance: none;
`;

export const BaseSelect = styled.select`
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
  cursor: pointer;
  padding: 23px ${margins.large0};
  :focus {
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 0px !important;
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

export const BaseOption = styled.option``;

export const ChatInput = styled(BaseInput)`
  text-transform: initial;
  font-size: ${fontSize.small1};
  line-height: 24px;
  letter-spacing: -0.01em;
  color: ${color.black};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  border-radius: 0px;
  -webkit-border-radius: 0px;
  width: clamp(225px, 25vw + -15px, 465px);
  height: 44px;
  background: ${color.white};
  &::placeholder {
    font-family: ibm-plex-mono;
    font-weight: ${fontWeight.light};
    font-size: ${fontSize.small1};
    line-height: 24px;
    letter-spacing: -0.01em;
    color: ${color.darkGrey};
  }
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  :disabled {
    &::placeholder {
      color: ${color.darkGrey};
    }
  }
  :focus {
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 0px !important;
    outline-width: 0px !important;
    box-shadow: none;
    background-image: url(${RightArrowIconUrl});
    background-position: right 12px bottom 70%;
    background-repeat: no-repeat;
    border: 1px solid ${color.black} !important;
  }
  :active {
    background-image: url(${RightArrowIconUrl});
    background-position: right 12px bottom 70%;
    background-repeat: no-repeat;
  }
  box-sizing: border-box;
  cursor: pointer;
  select::-ms-expand {
    display: none;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
`;
