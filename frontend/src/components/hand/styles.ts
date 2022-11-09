import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { float, shadowAnimation } from "../atoms/animations";
import { color, margins } from "../../design";
import { FLOATING_ANIMATION_SPEED } from "../../constants";

export const HandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: ${({ largeWidth }): string => `${largeWidth}vh`};
  background: ${color.mediumGrey};
  border-radius: 100%;
  margin: 0px 20% 0px 20%;
  opacity: 0.7;
  animation: ${({ smallWidth, largeWidth, speed }) => {
    return css`
      ${shadowAnimation(smallWidth, largeWidth)} ease ${speed || FLOATING_ANIMATION_SPEED}s infinite
    `;
  }};
`;

interface HandContainerProps {
  width: string;
  height: string;
  speed: number;
  isInLobby: boolean;
}

export const HandContainer = styled.div<HandContainerProps>`
  width: ${({ width }): string => width || "clamp(240px, 25vw + 0px, 480px"};
  height: ${({ height, isInLobby }): string => (isInLobby ? "100%" : height || "clamp(383.76px, 39.98vw + -0.01px, 767.53px)")};
  box-sizing: border-box;
  overflow: hidden;
  transform: translateY(0px);
  animation: ${({ speed }) => {
    return css`
      ${float} ${speed || FLOATING_ANIMATION_SPEED}s ease-in-out infinite
    `;
  }};
  margin-left: -15px;
  margin-bottom: ${margins.small2};
  ${Hand} {
    width: 100%;
    height: auto;
    position: absolute;
    pointer-events: none;
  }
  ${Paint} {
    width: 100%;
    height: auto;
    position: absolute;
    pointer-events: none;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  bottom: 20px;
  height: clamp(120px, 13.15vw + 27.58px, 280px);
`;
