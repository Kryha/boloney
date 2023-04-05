import styled from "@emotion/styled";

import { breakpoints, FontProps, images, lineHeights } from "../../design";

export const avatarHeight = ["50vh", "30vh", "15vh", "9vh", "8vh", "6vh"];

interface Props {
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
}

interface MediaProps extends Props {
  mediaSize?: FontProps;
}

export const FluidImage = styled.img<Props>`
  min-width: ${({ maxWidth }): string => maxWidth ?? images.auto};
  max-width: ${({ minWidth }): string => minWidth ?? images.fluid};
  width: ${({ width }): string => width ?? images.fluid};
  height: ${({ height }): string => height ?? images.auto};
`;

export const CenteredImage = styled.img<Props>`
  max-width: ${images.fluid};
  width: ${({ width }): string => width ?? images.fluid};
  height: ${({ height }): string => height ?? images.auto};
  object-fit: contain;
  margin: auto;
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
