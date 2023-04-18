import styled from "@emotion/styled";

import { SMALL_VIEWPORT_HEIGHT } from "../../constants";
import { color, margins, opacity } from "../../design";
import { fadeIn, fadeInPop, GeneralText, slideUp } from "../../atoms";
import { PowerUpWrapper } from "../power-up/styles";

export const PowerUpOverviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  margin-left: ${margins.small1};
`;

interface ViewportProps {
  height: number;
}

export const PowerUpOverviewContainer = styled.div<ViewportProps>`
  display: flex;
  align-items: flex-start;
  gap: ${({ height }) => height > SMALL_VIEWPORT_HEIGHT && margins.small2};
  width: 31.25vw;
  height: 9.198vh;
  background: ${color.transparent};
  margin-top: 1.8vh;
  ${GeneralText} {
    color: ${color.black};
  }
  animation: ${fadeIn} 2s;
`;

export const YourPowerUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${margins.small2};
  margin-left: ${margins.small5};
  cursor: pointer;
  :hover {
    animation: ${slideUp};
    animation-duration: 0.7s;
    animation-delay: 0s;
    animation-fill-mode: forwards;
  }
  ${PowerUpWrapper} {
    -webkit-animation-name: ${fadeInPop};
    -webkit-animation-timing-function: cubic-bezier(0.4, -0.38, 0.6, 1.91);
    -webkit-animation-duration: 0.3s;
    -webkit-animation-fill-mode: forwards;
  }
  ${PowerUpWrapper}:nth-of-type(1) {
    animation-delay: 0.7s;
    opacity: ${opacity.hidden};
  }
  ${PowerUpWrapper}:nth-of-type(2) {
    animation-delay: 0.9s;
    opacity: ${opacity.hidden};
  }
  ${PowerUpWrapper}:nth-of-type(3) {
    animation-delay: 1.1s;
    opacity: ${opacity.hidden};
  }
  ${PowerUpWrapper}:nth-of-type(4) {
    animation-delay: 1.3s;
    opacity: ${opacity.hidden};
  }
  ${PowerUpWrapper}:nth-of-type(5) {
    animation-delay: 1.5s;
    opacity: ${opacity.hidden};
  }
  ${PowerUpWrapper}:nth-of-type(6) {
    animation-delay: 1.7s;
    opacity: ${opacity.hidden};
  }
  ${PowerUpWrapper}:nth-of-type(7) {
    animation-delay: 1.9s;
    opacity: ${opacity.hidden};
  }
`;

export const PowerUpOverview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
