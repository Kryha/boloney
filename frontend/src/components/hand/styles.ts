import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

export const float = keyframes`
0% {
  transform: translateY(0px);
}
50% {
  transform: translateY(-20px);
}
100% {
  transform: translateY(0px);
}
`;

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
  largeWidth: number
  speed: number;
}

export const shadowAnimation = (smallWidth: number, largeWidth: number) => keyframes`
  50% {
    margin: 0px;
    opacity: 0.1;
    width: ${smallWidth}vh;
  }
  100% {
    margin: 0px 20% 0px 20%;
    opacity: 0.7;
    width: ${largeWidth}vh;
  }
`;

export const Shadow = styled.div<ShadowProps>`
  position: relative;
  height: 16px;
  width: ${({ largeWidth }): string => (`${largeWidth}vh`)};
  background: #999;
  border-radius: 100%;
  margin: 0px 20% 0px 20%;
  opacity: 0.7;
  animation: ${({ smallWidth, largeWidth, speed }) => { return css`${shadowAnimation(smallWidth, largeWidth)} ease ${speed || 4}s infinite`; }};
`;

interface HandContainerProps {
  width: string;
  height: string;
  speed: number;
}

export const HandContainer = styled.div<HandContainerProps>`
  width: ${({ width }): string => (width || "clamp(240px, 25vw + 0px, 480px")};
  height: ${({ height }): string => (height || "clamp(383.76px, 39.98vw + -0.01px, 767.53px)")};
  box-sizing: border-box;
  overflow: hidden;
  transform: translateY(0px);
  animation: ${({ speed }) => { return css`${float} ${speed || 4}s ease-in-out infinite`; }};
  margin-left: -15px;
  margin-bottom: 10px;
  ${Hand} {
    width: 100%;
    height: auto;
    position: absolute;
  }
  ${Paint} {
    width: 100%;
    height: auto;
    position: absolute;
  }
`;
