import styled from "@emotion/styled";

import { color, fontSize, fontWeight, margins } from "../../design";
import { ErrorIcon } from "../../assets/icons";
import { BaseInput, BaseSelect, GeneralText } from "../atoms";

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

  ${BaseInput} {
    border: 1px solid ${({ isError }) => (isError ? color.red : color.mediumGrey)};
  }

  ${BaseSelect} {
    border: 1px solid ${({ isError }) => (isError ? color.red : color.mediumGrey)};
    border-left: 1px solid ${({ isError }) => (isError ? color.red : "transparent")};
    border-right: 1px solid ${({ isError }) => (isError ? color.red : "transparent")};
  }

  ${({ isRow, isError, childNode }) => isRow && childNode === 1 && `
    border-right: 1px solid ${isError ? "transparent" : color.mediumGrey};
    border: none;
    ${BaseInput} {
      border-left: ${isError ? `1px solid ${color.red}` : "none"};
      border-right: ${isError ? `1px solid ${color.red}` : "none"};
    }
  `};
  ${({ isRow, childNode }) => isRow && childNode === 2 && `
    ${BaseInput} {
      width: 31.25vw;
    }
  `};
`;

export const InputLabel = styled.h3`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.bolder};
  font-size: ${fontSize.small1};
  line-height: 24px;
  text-transform: uppercase;
  color: ${color.black};
  background: ${color.lightGrey};
  padding: 0px ${margins.small1};
`;

export const LabelContainer = styled.div`
  position: absolute;
  left: ${margins.medium0};
  top: -13px;
`;

export const Error = styled(ErrorIcon)``;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: ${margins.small0};
  margin-left: ${margins.large0};
  margin-right: 4px;
  margin-top: ${margins.small2};
`;

export const TextLabel = styled(GeneralText)`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
  ::after {
    position: absolute;
    content: "% ";
    font-family: ibm-plex-mono, sans-serif;
    font-weight: ${fontWeight.regular};
    font-size: 16px;
    line-height: 24px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 7px;
    color: ${color.black};
    right: ${margins.small6};
  }
`;

export const InputIconContainer = styled.div`
  margin-top: ${margins.small6};
  margin-right: ${margins.small5};
  margin-left: ${margins.small6};
`;
