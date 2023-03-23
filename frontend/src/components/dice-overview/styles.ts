import styled from "@emotion/styled";

import { color, margins, opacity } from "../../design";
import { SMALL_VIEWPORT_HEIGHT } from "../../constants";
import { DieWrapper } from "../die/styles";
import { fadeInPop, GeneralText } from "../atoms";

export const DieOverviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
`;

interface ViewportProps {
  height: number;
}

export const DieOverviewContainer = styled.div<ViewportProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ height }) => (height > SMALL_VIEWPORT_HEIGHT ? margins.small2 : margins.small0)};
  width: 27.5vw;
  background: ${color.transparent};
  margin-top: 1.8vh;
  ${GeneralText} {
    margin-left: ${margins.large1};
  }
`;
interface DiceProps {
  isRow?: boolean;
}

export const YourDiceContainer = styled.div<DiceProps>`
  display: flex;
  flex-direction: row;
  margin-left: ${margins.small5};
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${({ isRow }) => (isRow ? margins.small2 : margins.small1)};

  ${DieWrapper} {
    -webkit-animation-name: ${fadeInPop};
    -webkit-animation-timing-function: cubic-bezier(0.4, -0.38, 1, 1.92);
    -webkit-animation-duration: 0.3s;
    -webkit-animation-fill-mode: forwards;
  }
  ${DieWrapper}:nth-of-type(1) {
    animation-delay: 0s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(2) {
    animation-delay: 0.1s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(3) {
    animation-delay: 0.2s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(4) {
    animation-delay: 0.3s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(5) {
    animation-delay: 0.4s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(6) {
    animation-delay: 0.5s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(7) {
    animation-delay: 0.6s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(8) {
    animation-delay: 0.7s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(9) {
    animation-delay: 0.8s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(10) {
    animation-delay: 0.9s;
    opacity: ${opacity.hidden};
  }
`;
