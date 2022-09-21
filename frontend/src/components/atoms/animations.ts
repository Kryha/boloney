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
