import { keyframes } from "@emotion/react";

// Hands
export const float = keyframes`
  50% {
    top: 55px;
  }
  100% {
    top: 0px;
  }
`;

export const shadowAnimation = (smallWidth: number, largeWidth: number) => keyframes`
  50% {
    margin: 0px ${largeWidth}vw 0px ${smallWidth}vw;
    opacity: 0.7;
  }
  100% {
    margin: 0px 0px 0px 0px;
    opacity: 0.1;
  }
`;

// Text
export const ellipsis = keyframes`
  to {
    width: 2.25em;
  }
`;

// Tooltip
export const tooltipAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

// General
export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const fadeInPop = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 20px) rotate(0deg) scale(0.4);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
`;

export const fadeOutScale = keyframes`
  100% {
    -webkit-transform: scale(0.4);
    opacity: 0;
  }
`;

export const slideUp = keyframes`
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
  }
`;
