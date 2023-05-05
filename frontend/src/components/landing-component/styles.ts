import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { MEDIUM_VIEWPORT_WIDTH, SMALL_VIEWPORT_HEIGHT } from "../../constants";
import { breakpoints, fontSizes, lineHeights, mobileHeight, mobileWidth, opacity, spacing, zIndex } from "../../design";
import { ViewProps } from "../../types";
import { fadeUp, InfoDisplay, Heading2, FluidImage, GeneralRow } from "../../atoms";
import { GeneralLinkWrapper } from "../links/styles";

interface Props {
  isVisible: boolean;
}

interface ImageProps {
  width: number;
  height: number;
}

export const AppNameContainer = styled.div`
  margin-top: 8.5vh;
  align-items: center;
  display: flex;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  opacity: ${opacity.hidden};
  animation: ${fadeUp} 1.2s ease-out 0.25s forwards;
  transform: translate3d(0, 1rem, 0);
  justify-content: center;
`;

export const LandingComponentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: 100vh;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const BottomHeading = styled.div`
  width: 35.4vw;
  min-width: 35.4vw;
  padding-bottom: 60px;
  position: absolute;
  left: 12.5vw;
  bottom: 60px;
  padding: 60px 40px;
  opacity: ${opacity.hidden};
  animation: ${fadeUp} 1.2s ease-out 0.25s forwards;
  transform: translate3d(0, 1rem, 0);
  ${GeneralLinkWrapper} {
    width: fit-content;
    display: inline-block;
  }
  @media (max-width: ${breakpoints.md}) {
    width: ${mobileWidth.sm};
    top: ${mobileHeight.xxl};
    padding: ${spacing.sm};
  }
`;

export const LandingBottomHeading = styled(Heading2)`
  display: inline;
  margin-right: 10px;
`;

export const LandingImage = styled.img<ImageProps>`
  height: ${({ width, height }) => (width < MEDIUM_VIEWPORT_WIDTH && height > SMALL_VIEWPORT_HEIGHT ? "50vh" : "70.2vh")};
  width: auto;
  object-fit: contain;
  right: -100px;
  bottom: -100px;
  position: absolute;
  z-index: ${zIndex.background};
  pointer-events: none;
  opacity: ${opacity.hidden};
  animation: ${fadeUp} 1.2s ease-out 0.25s forwards;
  transform: translate3d(0, 1rem, 0);
  @media (max-width: ${breakpoints.md}) {
    width: ${mobileWidth.xxl};
    height: auto;
    left: ${mobileHeight.xxs};
    bottom: ${mobileHeight.xxxs};
  }
  @media (max-width: ${breakpoints.xs}) {
    width: ${mobileWidth.xl};
    height: auto;
    left: 0;
    bottom: ${mobileHeight.md};
  }
`;

export const RightDisplaySection = styled.div`
  display: flex;
  align-items: flex-end;
  align-content: flex-end;
  justify-content: flex-end;
`;

export const LandingComponentContainer = styled.div<ViewProps>`
  width: 75vw;
  padding-top: ${({ height }): string => `${height}px`};
  padding-bottom: 60px;
`;

export const TopLandingWrapper = styled.div<Props>`
  opacity: ${opacity.hidden};
  ${({ isVisible }) =>
    isVisible
      ? css`
          -webkit-animation-duration: 0.6s;
          -webkit-animation-timing-function: cubic-bezier(0.4, -0.38, 1, 1.92);
          -webkit-animation-delay: 0.25s;
          -webkit-animation-iteration-count: 1;
          -webkit-animation-direction: normal;
          -webkit-animation-fill-mode: forwards;
          -webkit-animation-play-state: running;
          -webkit-animation-name: ${fadeUp};
          transform: translate3d(0, 1rem, 0);
        `
      : ""};
`;

export const LandingHeading = styled(InfoDisplay)`
  line-height: clamp(8.13rem, 7.29vw + 3.75rem, 12.5rem);
  :first-letter {
    text-transform: none;
  }
`;

export const LargeHeadingWrapper = styled(TopLandingWrapper)<Props>`
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 120px;
  padding-bottom: 60px;
`;

export const VisibilityContainer = styled.div`
  width: 100%;
`;

export const PaintedHand = styled(GeneralRow)`
  position: relative;
  width: 100%;
  height: 19vh;
  margin: ${spacing.sm} 0px;
  ${FluidImage} {
    position: absolute;
  }
`;

export const HeadingContainer = styled.div`
  margin: ${spacing.md} ${spacing.s} ${spacing.xs};
  @media (min-width: 700px) {
    ${InfoDisplay} {
      font-size: ${fontSizes.infoDisplay.sm};
      line-height: ${lineHeights.infoDisplay.sm};
    }
  }
`;

export const ParagraphContainer = styled.div`
  margin: ${spacing.md} ${spacing.s};
`;

export const ChatterHeading = styled(HeadingContainer)`
  margin: ${spacing.xl} ${spacing.s};
`;
