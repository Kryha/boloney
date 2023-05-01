import styled from "@emotion/styled";

import {
  breakpoints,
  color,
  FontProps,
  iconSize,
  images,
  lineHeights,
  radius as borderRadius,
  shadows,
  zIndex as customZIndex,
} from "../design";
import { AlignContent } from "./grid";

export const avatarHeight = ["50vh", "30vh", "15vh", "9vh", "8vh", "6vh"];

export type DisplayProps = "block" | "inline" | "inline-block" | "flex" | "inline-flex" | "grid" | "inline-grid" | "table";

interface Props {
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
  maxHeight?: string;
}

interface MediaProps extends Props {
  mediaSize?: FontProps;
}

export interface IconProps {
  width?: string;
  height?: string;
  iconColor?: string;
  strokeColor?: string;
  cursor?: boolean;
  radius?: string;
  shadow?: string;
  zIndex?: string;
  disabled?: boolean;
  disabledColor?: string;
  pipColor?: string;
  display?: DisplayProps;
  alignSelf?: AlignContent;
}

export const FluidImage = styled.img<Props>`
  min-width: ${({ maxWidth }): string => maxWidth ?? images.auto};
  max-width: ${({ minWidth }): string => minWidth ?? images.fluid};
  width: ${({ width }): string => width ?? images.fluid};
  height: ${({ height }): string => height ?? images.auto};
  max-height: ${({ maxHeight }): string => maxHeight ?? images.auto};
  user-select: none;
`;

export const CenteredImage = styled.img<Props>`
  max-width: ${images.fluid};
  width: ${({ width }): string => width ?? images.fluid};
  height: ${({ height }): string => height ?? images.auto};
  object-fit: contain;
  margin: auto;
  user-select: none;
`;

export const MediaImage = styled(FluidImage)<MediaProps>`
  height: ${({ mediaSize }): string => (mediaSize ? mediaSize.md : lineHeights.heading2.md)};

  @media (max-width: ${breakpoints.md}) {
    height: ${({ mediaSize }): string => (mediaSize ? mediaSize.sm : lineHeights.heading2.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    height: ${({ mediaSize }): string => (mediaSize ? mediaSize.lg : lineHeights.heading2.lg)};
  }
`;

export const IconImage = styled.img<IconProps>`
  height: ${({ height }) => height ?? iconSize.xxs};
  width: ${({ width }) => width ?? iconSize.xxs};
  border-radius: ${({ radius }) => radius ?? borderRadius.none};
  box-shadow: ${({ shadow }) => shadow ?? shadows.none};
  z-index: ${({ zIndex }) => zIndex ?? customZIndex.behind};
  user-select: none;
  background: ${({ iconColor, disabled, disabledColor }): string => (disabled ? disabledColor || color.mediumGrey : iconColor || "none")};

  stroke: ${({ iconColor, disabled, disabledColor }): string =>
    disabled ? disabledColor || color.mediumGrey : iconColor || color.darkGrey};

  :hover {
    cursor: ${({ cursor }): string => (cursor ? "pointer" : "default")};
  }
`;
