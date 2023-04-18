import styled from "@emotion/styled";

import { ChevronDownIconSVG, CrossIconSVG, PercentageIconSVG, RightArrowIconUrl } from "../assets";
import { breakpoints, color, fonts, fontSizes, fontWeights, lineHeights, margins, spacing, inputWidth, inputHeight } from "../design";

interface Props {
  width?: string;
  height?: string;
  radioInnerWidth?: string;
}

export const BaseInput = styled.input<Props>`
  font-family: ${fonts.primary};
  font-weight: ${fontWeights.light};
  font-size: ${fontSizes.body.md};
  line-height: ${lineHeights.body.md};
  letter-spacing: -0.01em;
  text-transform: lowercase;
  color: ${color.black};
  background-color: ${color.transparent};
  width: ${({ width }) => width ?? inputWidth.fluid};
  height: ${({ height }) => height ?? inputWidth.auto};
  -moz-appearance: textfield;
  border-radius: 0px;
  -webkit-border-radius: 0px;
  box-sizing: border-box;
  padding: ${spacing.sm} ${inputWidth.lg};
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

export const BaseSelect = styled.select<Props>`
  font-family: ${fonts.primary};
  font-weight: ${fontWeights.light};
  font-size: ${fontSizes.body.md};
  line-height: ${lineHeights.body.md};
  letter-spacing: -0.01em;
  color: ${color.black};
  background-color: ${color.transparent};
  width: ${({ width }) => width ?? inputWidth.fluid};
  height: ${({ height }) => height ?? inputWidth.auto};
  -moz-appearance: textfield;
  padding: ${spacing.sm} ${inputWidth.lg};
  box-sizing: border-box;
  background-image: url(${ChevronDownIconSVG});
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
    cursor: default;
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

interface SecondaryInputProps extends Props {
  error?: boolean;
}

export const SecondaryInput = styled(BaseInput)<SecondaryInputProps>`
  width: ${({ width }) => width ?? inputWidth.xxl};
  height: ${({ height }) => height ?? "auto"};
  color: ${({ error }) => (error ? color.red : color.black)};
  border: 1px solid ${({ error }) => (error ? color.red : color.mediumGrey)};
  padding: ${inputHeight.xxs};

  :focus {
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 0px !important;
    box-shadow: none;
    border: 1px solid ${color.black};
  }
  :active {
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 0px !important;
    box-shadow: none;
    border: 1px solid ${color.black};
  }
  :hover {
    background-color: ${color.cloudWhite};
  }
  :disabled {
    background-color: ${color.transparent};
    border: 1px solid ${color.mediumGrey};
  }
`;

export const ChatInput = styled(SecondaryInput)<Props>`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "auto")};
  background: ${color.cloudWhite};

  &::placeholder {
    color: ${color.darkGrey};
    text-transform: none;
  }
  :focus {
    background-image: url(${RightArrowIconUrl});
    background-position: right 12px bottom 70%;
    background-repeat: no-repeat;
  }
  :active {
    background-image: url(${RightArrowIconUrl});
    background-position: right 12px bottom 70%;
    background-repeat: no-repeat;
  }
  :disabled {
    background-image: none;
  }
  select::-ms-expand {
    display: none;
  }
`;

export const PercentageInput = styled(SecondaryInput)`
  background-image: url(${PercentageIconSVG});
  background-position: right ${spacing.xs} bottom 50%;
  background-repeat: no-repeat;
`;

export const CheckboxBox = styled.input<Props>`
  appearance: none;
  width: ${({ width }) => (width ? width : inputWidth.lg)};
  height: ${({ width }) => (width ? width : inputWidth.lg)};
  background: ${color.transparent};
  border: 1px solid ${color.mediumGrey};
  cursor: pointer;

  :hover {
    background-image: url(${CrossIconSVG});
    background-position: center;
    background-repeat: no-repeat;
  }
  :disabled {
    background-image: none;
    cursor: default;
  }
  :checked {
    background-image: url(${CrossIconSVG});
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const RadioInput = styled(CheckboxBox)<Props>`
  border-radius: 50%;
  background: ${color.transparent};
  display: flex;
  align-items: center;
  justify-content: center;

  ::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: ${({ radioInnerWidth }) => (radioInnerWidth ? radioInnerWidth : inputWidth.xxs)};
    height: ${({ radioInnerWidth }) => (radioInnerWidth ? radioInnerWidth : inputWidth.xxs)};
  }
  :hover {
    background: ${color.white};
    ::after {
      background-color: ${color.black};
    }
  }
  :focus {
    border: 1px solid ${color.black};
  }
  :checked {
    background: ${color.white};
    ::after {
      background-color: ${color.black};
      ::after {
        width: ${({ radioInnerWidth }) => radioInnerWidth ?? inputWidth.xxs};
        height: ${({ radioInnerWidth }) => radioInnerWidth ?? inputWidth.xxs};
      }
    }
    :hover {
      background-color: ${color.white};
      border: 1px solid ${color.mediumGrey};
      ::after {
        background-color: ${color.black};
      }
    }
  }
  :disabled {
    cursor: not-allowed;
    background-color: ${color.lightGrey};
    :hover {
      ::after {
        background-color: ${color.transparent};
      }
    }
  }
`;
