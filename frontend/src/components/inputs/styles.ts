import styled from "@emotion/styled";

import { color, margins } from "../../design";
import { Heading6, GeneralText } from "../../atoms";

interface InputContainerProps {
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
`;

export const InputIconContainer = styled.div`
  margin-top: ${margins.small6};
  margin-right: ${margins.small5};
  margin-left: ${margins.small6};
`;

export const LegendContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
