import styled from "@emotion/styled";

import { color, shadows, radius, containerWidth, containerHeight } from "../design";

export interface BlockProps {
  disabled?: boolean;
  active?: boolean;
  backgroundColor?: string;
  activeColor?: string;
  padding?: string;
}

/**
 * This file is for general blocks and boxes, i.e badges, messages, information
 */

export const BaseBlock = styled.div<BlockProps>`
  background-color: ${({ backgroundColor }): string => backgroundColor ?? color.cloudWhite};
  box-shadow: ${shadows.md};
  border-radius: ${radius.md};
  padding: ${({ padding }): string => padding ?? "0px"};
`;

export const Box = styled(BaseBlock)`
  width: ${containerWidth.xxl};
  height: ${containerHeight.lg};
  border-radius: ${radius.none};
  box-shadow: ${shadows.none};
  background-color: ${({ active }): string => (active ? color.cloudWhite : color.lightGrey)};
  :hover {
    background-color: ${color.cloudWhite};
    cursor: pointer;
  }
`;

export const BlockBox = styled(BaseBlock)`
  width: ${containerWidth.md};
  border-radius: ${radius.none};
  box-shadow: ${shadows.none};
`;

export const BadgeBlock = styled(BaseBlock)`
  width: fit-content;
  border-radius: ${radius.none};
  background-color: ${({ backgroundColor }): string => backgroundColor ?? color.white};
`;

export const MessageBlock = styled(BaseBlock)`
  width: fit-content;
  border-radius: ${radius.sm};
`;

export const InformationBlock = styled(BaseBlock)`
  width: ${containerWidth.md};
  height: ${containerHeight.fluid};
  min-height: 100vh;
  border-radius: ${radius.none};
  box-shadow: ${shadows.xl};
`;
