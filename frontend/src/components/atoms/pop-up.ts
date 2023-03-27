import styled from "@emotion/styled";
import { color, containerHeight, containerWidth, radius, shadows } from "../../design";
import { BaseBlock } from "./block";

/**
 * This file is for pop ups i.e notifications tooltips etc
 */

export const PopUp = styled(BaseBlock)`
  width: ${containerWidth.xl};
  height: ${containerHeight.xl}; ;
`;

export const PopUpBlock = styled(BaseBlock)`
  width: ${containerWidth.lg};
  height: ${containerHeight.xxs};
  border-radius: ${radius.md} ${radius.md} 0px 0px;
`;

export const TooltipBlock = styled(BaseBlock)`
  min-width: ${containerWidth.sm};
  max-width: ${containerWidth.md};
  border-radius: ${radius.none};
  box-shadow: ${shadows.xl};
`;

export const CopyBlock = styled(BaseBlock)`
  width: fit-content;
  border-radius: ${radius.xxl};
  box-shadow: ${shadows.xl};
  background-color: ${({ backgroundColor }): string => (backgroundColor ? backgroundColor : color.white)};
`;
