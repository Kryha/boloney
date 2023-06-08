import styled from "@emotion/styled";
import { color, containerHeight, containerWidth, mobileWidth, radius, shadows } from "../design";
import { BaseBlock } from "./block";

/**
 * This file is for pop ups i.e notifications tooltips etc
 */

interface PopUpProps {
  width?: string;
  height?: string;
}

export const PopUp = styled(BaseBlock)<PopUpProps>`
  width: ${({ width }): string => width ?? containerWidth.xl};
  height: ${({ height }): string => height ?? containerHeight.xl};
`;

export const PopUpBlock = styled(BaseBlock)`
  width: ${containerWidth.lg};
  height: ${containerHeight.xxs};
  border-radius: ${radius.md} ${radius.md} 0px 0px;
`;

export const TooltipBlock = styled(BaseBlock)`
  min-width: ${containerWidth.md};
  max-width: ${mobileWidth.xs};
  border-radius: ${radius.none};
  box-shadow: ${shadows.xl};
`;

export const CopyBlock = styled(BaseBlock)`
  width: fit-content;
  border-radius: ${radius.xxl};
  box-shadow: ${shadows.xl};
  background-color: ${({ backgroundColor }): string => (backgroundColor ? backgroundColor : color.white)};
`;
