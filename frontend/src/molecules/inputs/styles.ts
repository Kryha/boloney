import styled from "@emotion/styled";

import { color, containerHeight, spacing, zIndex } from "../../design";
import { GeneralText, BaseColumn, BaseRow, PositionContent } from "../../atoms";

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

interface CheckboxErrorContainerProps {
  margin?: string;
  position?: PositionContent;
}

export const CheckboxErrorContainer = styled(BaseRow)<CheckboxErrorContainerProps>`
  margin: ${({ margin }) => margin || "0px"};
  position: ${({ position }) => position || "inherit"};
  bottom: -${containerHeight.sm};
`;

export const TextLabel = styled(GeneralText)`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
`;

export const InputIconContainer = styled.div`
  margin: ${spacing.xxs} ${spacing.sm} 0px ${spacing.ms};
`;

export const InputFieldSet = styled.fieldset`
  isolation: isolate;
  position: relative;
  flex: 1;
  width: 100%;
  border-top: 1px solid ${color.mediumGrey};
  border-left: none;
  border-right: none;
  border-bottom: none;
  padding: 0;
`;
