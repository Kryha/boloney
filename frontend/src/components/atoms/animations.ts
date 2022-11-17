import { keyframes } from "@emotion/react";

// Hands
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

export const fadeInScale = keyframes`
  0% {
    transform: scale(0.4);
    opacity: 0;
  }
  100% {
    transform: scale(1);
     opacity: 1;
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
