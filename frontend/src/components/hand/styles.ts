import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { float, shadowAnimation } from "../../atoms";
import { color, opacity } from "../../design";
import { FLOATING_ANIMATION_SPEED } from "../../constants";

interface WrapperProps {
  isTargetable?: boolean;
}

export const HandWrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: ${({ isTargetable }): string => (isTargetable ? "pointer" : "default")};
`;

export const HandImage = styled.img`
  object-fit: contain;
`;

export const Paint = styled.img``;

export const PaintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 100%;
  height: auto;
  pointer-events: none;
  margin-left: 0px;
`;

interface ShadowProps {
  smallWidth: number;
  largeWidth: number;
  speed: number;
}

export const Shadow = styled.div<ShadowProps>`
  position: relative;
  height: 16px;
  background: ${color.mediumGrey};
  opacity: ${opacity.transparent};
  border-radius: 100%;
  margin: 0px 0px 0px 0px;
  top: 70px;
  animation: ${({ smallWidth, largeWidth, speed }) => {
    return css`
      ${shadowAnimation(smallWidth, largeWidth)} ease ${speed || FLOATING_ANIMATION_SPEED}s infinite;
    `;
  }};
`;

interface HandContainerProps {
  width?: string;
  height?: string;
  speed?: number;
  isAnimationDisabled?: boolean;
  isLeaderboard?: boolean;
}

export const HandContainer = styled.div<HandContainerProps>`
  position: relative;
  width: ${({ width }): string => width || "clamp(240px, 25vw + 0px, 480px"};
  height: ${({ height }) => height ?? "clamp(130px, 15.63vw + -20px, 280px)"};
  top: 0px;
  ${HandImage} {
    width: ${({ isLeaderboard }) => (isLeaderboard ? "60%" : "100%")};
    height: auto;
    position: absolute;
    pointer-events: none;
    margin-left: 0px;
  }
  ${Paint} {
    width: ${({ isLeaderboard }) => (isLeaderboard ? "60%" : "100%")};
    height: auto;
    position: absolute;
    pointer-events: none;
    margin-left: 0px;
  }
  animation: ${({ speed, isAnimationDisabled }) => {
    if (isAnimationDisabled) return;

    return css`
      ${float} ease ${speed || FLOATING_ANIMATION_SPEED}s infinite;
    `;
  }};
`;

export const ImageWrapper = styled.div<HandContainerProps>`
  width: ${({ width }): string => width || "clamp(240px, 25vw + 0px, 480px"};
  height: ${({ height }): string => height ?? "100%"};
  ${HandContainer} {
    align-items: center;
    display: flex;
  }
`;
