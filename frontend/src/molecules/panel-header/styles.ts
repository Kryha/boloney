import styled from "@emotion/styled";
import { GeneralRow, PlayerMenuBox } from "../../atoms";
import { color, containerHeight, containerWidth, spacing } from "../../design";

export const PanelHeaderContainer = styled(GeneralRow)`
  width: ${containerWidth.fluid};
  height: ${containerHeight.fluid};
`;

interface Props {
  isHeaderSelected: boolean;
  isMultipleHeaders?: boolean;
}

export const PanelHeaderWrapper = styled(PlayerMenuBox)<Props>`
  padding: ${spacing.s} ${spacing.s};
  border-bottom: ${({ isHeaderSelected, isMultipleHeaders }) =>
    isHeaderSelected || isMultipleHeaders ? "none" : `1px solid ${color.mediumGrey}`};
`;
