import styled from "@emotion/styled";

import { ChevronDownIconSVG, RightArrowIconSVG } from "../../assets";
import { breakpoints, color, fonts, fontSizes, fontWeights, lineHeights, margins } from "../../design";

export const BaseInput = styled.input`
  font-family: ${fonts.primary};
  font-weight: ${fontWeights.light};
  font-size: ${fontSizes.body.md};
  line-height: ${lineHeights.body.md};
  letter-spacing: -0.01em;
  text-transform: lowercase;
  color: ${color.black};
  background-color: ${color.transparent};
  width: 100%;
  -moz-appearance: textfield;
  border-radius: 0px;
  -webkit-border-radius: 0px;
  box-sizing: border-box;
  padding: 23px ${margins.large0};
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.body.sm};
    line-height: ${lineHeights.body.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.body.lg};
    line-height: ${lineHeights.body.lg};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:-webkit-autofill {
    background-clip: text;
    -webkit-background-clip: text;
  }
  &::placeholder {
    font-family: ${fonts.primary};
    font-weight: ${fontWeights.light};
    font-size: ${fontSizes.body.md};
    line-height: ${lineHeights.body.md};
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: ${color.black};
    @media (max-width: ${breakpoints.md}) {
      font-size: ${fontSizes.body.sm};
      line-height: ${lineHeights.body.sm};
    }
    @media (min-width: ${breakpoints.xxl}) {
      font-size: ${fontSizes.body.lg};
      line-height: ${lineHeights.body.lg};
    }
  }
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
`;

export const BaseSelect = styled.select`
  font-family: ${fonts.primary};
  font-weight: ${fontWeights.light};
  font-size: ${fontSizes.body.md};
  line-height: ${lineHeights.body.md};
  letter-spacing: -0.01em;
  color: ${color.black};
  background-color: ${color.transparent};
  width: 100%;
  -moz-appearance: textfield;
  padding: 23px ${margins.large0};
  box-sizing: border-box;
  background-image: url(${ChevronDownIconSVG}});
  background-position: right ${margins.large0} center;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.body.sm};
    line-height: ${lineHeights.body.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.body.lg};
    line-height: ${lineHeights.body.lg};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
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
  select::-ms-expand {
    display: none;
  }
`;

export const BaseOption = styled.option``;

export const ChatInput = styled(BaseInput)`
  text-transform: initial;
  font-family: ${fonts.primary};
  font-weight: ${fontWeights.light};
  font-size: ${fontSizes.body.md};
  line-height: ${lineHeights.body.md};
  letter-spacing: -0.01em;
  color: ${color.black};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  border-radius: 0px;
  -webkit-border-radius: 0px;
  width: 23.75vw;
  height: 44px;
  background: ${color.cloudWhite};
  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.body.sm};
    line-height: ${lineHeights.body.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.body.lg};
    line-height: ${lineHeights.body.lg};
  }

  &::placeholder {
    font-family: ${fonts.primary};
    font-weight: ${fontWeights.light};
    font-size: ${fontSizes.body.md};
    line-height: ${lineHeights.body.md};

    @media (max-width: ${breakpoints.md}) {
      font-size: ${fontSizes.body.sm};
      line-height: ${lineHeights.body.sm};
    }
    @media (min-width: ${breakpoints.xxl}) {
      font-size: ${fontSizes.body.lg};
      line-height: ${lineHeights.body.lg};
    }
    color: ${color.darkGrey};
    text-transform: none;
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
    background-image: url(${RightArrowIconSVG});
    background-position: right 12px bottom 70%;
    background-repeat: no-repeat;
    border: 1px solid ${color.black} !important;
  }
  :active {
    background-image: url(${RightArrowIconSVG});
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
