import styled from "@emotion/styled";

import { color, containerHeight, containerWidth, radius, shadows } from "../../design";
import { switchStyle } from "../../util";
import { BlockProps } from "./block";

interface CardProps extends BlockProps {
  isSmall?: boolean;
  isEmpty?: boolean;
}

/**
 * This file is for Cards i.e power-up cards
 */

export const Card = styled.div<CardProps>`
  width: ${({ isSmall, isEmpty }): string => (isSmall ? switchStyle(containerWidth.xxs, containerWidth.xs, isEmpty) : containerWidth.sm)};
  height: ${({ isSmall, isEmpty }): string =>
    isSmall ? switchStyle(containerHeight.xs, containerHeight.sm, isEmpty) : containerHeight.xxl};
  border-radius: ${({ isSmall }): string => (isSmall ? radius.xs : radius.md)};
  box-shadow: ${({ isSmall }): string => (isSmall ? shadows.xxl : shadows.md)};
  background-color: ${({ backgroundColor }): string => (backgroundColor ? backgroundColor : color.cloudWhite)};

  :hover {
    cursor: pointer;
  }
`;
