import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { float, shadowAnimation } from "../atoms/animations";
import { color, opacity } from "../../design";
import { FLOATING_ANIMATION_SPEED } from "../../constants";

export const HandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Hand = styled.img``;

export const Paint = styled.img``;

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
  width: string;
  height: string;
  speed?: number;
  isInLobby: boolean;
}

export const HandContainer = styled.div<HandContainerProps>`
  position: relative;
  width: ${({ width }): string => width || "clamp(240px, 25vw + 0px, 480px"};
  height: clamp(130px, 15.63vw + -20px, 280px);
  top: 0px;
  ${Hand} {
    width: 100%;
    height: auto;
    position: absolute;
    pointer-events: none;
    margin-left: 0px;
  }
  ${Paint} {
    width: 100%;
    height: auto;
    position: absolute;
    pointer-events: none;
    margin-left: 0px;
  }
  animation: ${({ speed }) => {
    return css`
      ${float} ease ${speed || FLOATING_ANIMATION_SPEED}s infinite;
    `;
  }};
`;

export const ImageWrapper = styled.div<HandContainerProps>`
  width: ${({ width }): string => width || "clamp(240px, 25vw + 0px, 480px"};
  height: ${({ height, isInLobby }): string => (isInLobby ? "100%" : height || "clamp(383.76px, 39.98vw + -0.01px, 767.53px)")};
  ${HandContainer} {
    align-items: center;
    display: flex;
  }
`;
