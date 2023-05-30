import styled from "@emotion/styled";

import { color, spacing, zIndex } from "../../design";
import { Heading6, GeneralText, BaseColumn, BaseRow, PositionContent } from "../../atoms";

interface InputContainerProps {
  isRow: boolean;
  childNode: number;
}

export const InputContainer = styled(BaseColumn)<InputContainerProps>`
  isolation: isolate;
  position: relative;
  flex: 1;
  ${({ isRow, childNode }) =>
    isRow &&
    childNode === 1 &&
    `
    z-index: ${zIndex.overlay};
`};
  ${({ isRow, childNode }) =>
    isRow &&
    childNode === 2 &&
    `
    z-index: ${zIndex.normal};
`};
`;

export const LabelContainer = styled.div`
  position: absolute;
  left: ${spacing.ms};
  top: -${spacing.s};
  ${Heading6} {
    background: ${color.lightGrey};
    padding: 0px ${spacing.xs};
  }
`;

interface CheckboxErrorContainerProps {
  margin?: string;
  position?: PositionContent;
}

export const CheckboxErrorContainer = styled(BaseRow)<CheckboxErrorContainerProps>`
  margin: ${({ margin }) => margin || "0px"};
  position: ${({ position }) => position || "inherit"};
`;

export const TextLabel = styled(GeneralText)`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
`;

export const InputIconContainer = styled.div`
  margin: ${spacing.xxs} ${spacing.sm} 0px ${spacing.ms};
`;
