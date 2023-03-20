import { keyframes } from "@emotion/react";
import { color, opacity, zIndex } from "../../design";

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
    opacity: ${opacity.shadow};
  }
  100% {
    margin: 0px 0px 0px 0px;
    opacity:  ${opacity.transparent};
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
    opacity:  ${opacity.hidden};
  }

  to {
    opacity:  ${opacity.visible};
  }
`;

// General
export const fadeIn = keyframes`
  0% { opacity:  ${opacity.hidden}; }
  100% { opacity:  ${opacity.visible}; }
`;

export const fadeInPop = keyframes`
  0% {
    opacity: ${opacity.hidden};
    transform: translate(0, 20px) rotate(0deg) scale(0.4);
  }
  100% {
    opacity: ${opacity.visible};
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
`;

export const fadeOutScale = keyframes`
  100% {
    -webkit-transform: scale(0.4);
    opacity: ${opacity.visible};
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

export const slideRight = keyframes`

  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(5px);
    transform: translateX(5px);
  }
`;

// shuffle
export const shuffle = (percentages: string[]) => keyframes`
  0%   {
    transform: translateY(${percentages[0]});
    background: ${color.lightGrey};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 2px 0px 20px rgba(0, 0, 0, 0.1);
    left: 0px;
    z-index: ${zIndex.overlay};

  }
  10%   {
    transform: translateY(${percentages[1]});
    background: ${color.lightGrey};
    left: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 2px 0px 20px rgba(0, 0, 0, 0.1);
    z-index: ${zIndex.overlay};
  }
  20%   {
    transform: translateY(${percentages[2]});
    background: ${color.lightGrey};
    left: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 2px 0px 20px rgba(0, 0, 0, 0.1);
    z-index: ${zIndex.overlay};
  }
  40%   {
    transform: translateY(${percentages[3]});
    background: ${color.lightGrey};
    left: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 2px 0px 20px rgba(0, 0, 0, 0.1);
    z-index: ${zIndex.overlay};
  }
  55%   {
    transform: translateY(${percentages[4]});
    background: ${color.lightGrey};
    left: 0px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 2px 0px 20px rgba(0, 0, 0, 0.1);
    z-index: ${zIndex.overlay};
  }
  70%  {
    transform: translateY(0%);
    border-right: none;
   }
  80%  {
    transform: translateY(0%);
    border-right: none;
   }
  95%  {
    transform: translateY(0%);
    border-right: none;
   }
  100% {
    transform: translateY(0%);
    border-right: none;
  }
`;

export const fadeUp = keyframes`
  0% {
    opacity: ${opacity.hidden};
    transform: translate3d(0, 1rem, 0);
  }
  75% {
    opacity: ${opacity.shadow};
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: ${opacity.visible};
    transform: translate3d(0, 0, 0);
  }
`;

export const fadeOut = keyframes`
  0% { opacity: ${opacity.visible}; }
  100% { opacity: ${opacity.hidden}; }
`;

export const ticker = keyframes`
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }
`;

export const slideUpFromBottom = keyframes`
  0% {
    opacity: ${opacity.hidden};
    transform: translate(0, 20px) rotate(0deg) scale(0.6);
  }
  100% {
    opacity: ${opacity.visible};
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
`;
