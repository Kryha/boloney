import styled from "@emotion/styled";

import { color, fontWeights, margins } from "../../design";
import { BaseInput, BaseSelect, Heading6, GeneralText } from "../atoms";

interface InputContainerProps {
  isError?: boolean;
  isRow: boolean;
  childNode: number;
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  isolation: isolate;
  position: relative;
  flex: 1;
  ${({ isRow, childNode }) =>
    isRow &&
    childNode === 1 &&
    `
    z-index: 5;
`};
  ${({ isRow, childNode }) =>
    isRow &&
    childNode === 2 &&
    `
    z-index: 2;
`};
`;

export const LabelContainer = styled.div`
  position: absolute;
  left: ${margins.medium0};
  top: -13px;
  ${Heading6} {
    background: ${color.lightGrey};
    padding: 0px ${margins.small1};
  }
`;

export const CheckboxErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: ${margins.small0};
  margin-left: ${margins.large0};
  margin-right: 4px;
  margin-top: ${margins.small2};
`;

export const InputErrorContainer = styled(CheckboxErrorContainer)`
  position: absolute;
  bottom: -50px;
`;

export const TextLabel = styled(GeneralText)`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
  ::after {
    position: absolute;
    content: "% ";
    font-family: ibm-plex-mono, sans-serif;
    font-weight: ${fontWeights.regular};
    font-size: 16px;
    line-height: 24px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 7px;
    color: ${color.black};
    right: clamp(27.2px, 1.17vw + 16px, 38.4px);
  }
`;

export const InputIconContainer = styled.div`
  margin-top: ${margins.small6};
  margin-right: ${margins.small5};
  margin-left: ${margins.small6};
`;

export const FieldSet = styled.fieldset<InputContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  isolation: isolate;
  position: relative;
  flex: 1;
  width: 100%;
  border: 1px solid ${({ isError }) => (isError ? color.red : color.mediumGrey)};
  border-left: 1px solid ${color.transparent};
  border-right: 1px solid ${color.transparent};

  :hover {
    background: ${color.cloudWhite};
  }
  :active {
    border: 1px solid ${color.black} !important;
  }
  :focus {
    border: 1px solid ${color.black} !important;
    outline-width: 0px !important;
    box-shadow: none;
    outline: none;
  }
  :focus-within {
    border: 1px solid ${color.black} !important;
    outline-width: 0px !important;
    box-shadow: none;
    outline: none;
  }
  ${BaseInput} {
    border: none;
    margin-top: -12px;
  }
  ${BaseSelect} {
    border: none;
    margin-top: -12px;
  }
  ${({ isRow, isError, childNode }) =>
    isRow &&
    childNode === 1 &&
    `
    border-right: 1px solid ${isError ? `${color.red}` : color.mediumGrey};
    border-left: ${isError ? `1px solid ${color.red}` : "none"};
`};
  ${({ isRow, childNode, isError }) =>
    isRow &&
    childNode === 2 &&
    `
    width: 31.25vw;
    border-right: ${isError ? `1px solid ${color.red}` : "none"};
    border-left: ${isError ? `1px solid ${color.red}` : "none"};
`};
`;

export const Legend = styled.legend`
  padding: 0px ${margins.small1};
  margin-left: ${margins.medium0};
`;

export const LegendContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
