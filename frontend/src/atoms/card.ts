import styled from "@emotion/styled";

import { breakpoints, color, containerHeight, containerWidth, maxHeight, radius, shadows } from "../design";
import { switchStyle } from "../util";
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
  min-height: ${({ isSmall, isEmpty }): string => (isSmall ? switchStyle(containerHeight.xs, containerHeight.sm, isEmpty) : maxHeight.xl)};

  @media screen and (min-device-width: ${breakpoints.xl}) and (max-device-width: ${breakpoints.xxl}) {
    min-height: ${({ isSmall, isEmpty }): string => (isSmall ? switchStyle(maxHeight.xs, maxHeight.sm, isEmpty) : maxHeight.xl)};
  }

  @media (min-width: ${breakpoints.xxl}) {
    min-height: ${({ isSmall, isEmpty }): string => (isSmall ? switchStyle(maxHeight.sm, maxHeight.lg, isEmpty) : maxHeight.xxl)};
  }

  :hover {
    cursor: pointer;
  }
`;
