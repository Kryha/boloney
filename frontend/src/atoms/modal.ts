import styled from "@emotion/styled";

import { containerWidth, containerHeight, shadows, zIndex, color, opacity, breakpoints, mobileWidth, mobileHeight } from "../design";
import { BaseBlock } from "./block";
import { TertiaryButtonBase } from "./button";

/**
 * This file is for Modals
 */

interface Props {
  isContained?: boolean;
  width?: string;
  height?: string;
}

export const ModalBlock = styled(BaseBlock)<Props>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: ${({ width }): string => width ?? containerWidth.xxxl};
  height: ${({ height }): string => height ?? containerHeight.xxxl};
  background: ${({ isContained }) => (isContained ? color.cloudWhite : color.transparent)};
  box-shadow: ${({ isContained }) => (isContained ? shadows.xl : shadows.none)};
  @media (max-width: ${breakpoints.md}) {
    width: ${mobileWidth.md};
    max-height: ${mobileHeight.xxxl};
    position: fixed;
    z-index: ${zIndex.cookieBanner};
    height: fit-content;
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.modal};
  width: 100vw;
  height: 100vh;
  @media (max-width: ${breakpoints.md}) {
    height: 100dvh;
    background: ${color.ashGrey};
  }
`;

export const ModalOverlay = styled(ModalWrapper)`
  opacity: ${opacity.overlay};
  background: ${color.lightGrey};
`;

export const ModalButtonWrapper = styled.div`
  width: 100vw;
  ${TertiaryButtonBase} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
  }
`;
