import styled from "@emotion/styled";
import { color, containerHeight, containerWidth, spacing } from "../design";

interface Props {
  backgroundColor?: boolean;
  borderRadius?: boolean;
  height?: string;
  position?: string;
}

export const PopUpFooter = styled.div<Props>`
  background: ${({ backgroundColor }) => backgroundColor ?? color.translucentWhite};
  border-radius: ${({ borderRadius }) => borderRadius ?? `0px 0px ${spacing.xs} ${spacing.xs}`};
  height: ${({ height }) => height ?? containerHeight.lg};
  width: ${containerWidth.fluid};
  position: ${({ position }) => position ?? "fixed"};
  bottom: 0;
  left: 0px;
`;
