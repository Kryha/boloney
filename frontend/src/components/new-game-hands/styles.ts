import styled from "@emotion/styled";
import { SMALL_VIEWPORT_HEIGHT } from "../../constants";
import { zIndex } from "../../design";
import { ViewProps } from "../../types";
import { HandWrapper } from "../hand/styles";

export const NewGameHandsWrapper = styled.div<ViewProps>`
  z-index: ${zIndex.behind};
  ${HandWrapper}:nth-of-type(1) {
    position: absolute;
    left: 17vw;
    bottom: ${({ height }) => (height < SMALL_VIEWPORT_HEIGHT ? "2vh" : "10vh")};
    transform: ${({ height }) => (height < SMALL_VIEWPORT_HEIGHT ? "scale(0.9)" : "scale(1.2)")};
  }
  ${HandWrapper}:nth-of-type(2) {
    position: absolute;
    left: 31vw;
    bottom: ${({ height }) => (height < SMALL_VIEWPORT_HEIGHT ? "-3vh" : "18vh")};
    transform: ${({ height }) => (height > SMALL_VIEWPORT_HEIGHT ? "scale(1)" : "scale(1.4)")};
  }
  ${HandWrapper}:nth-of-type(3) {
    position: absolute;
    left: ${({ height }) => (height < SMALL_VIEWPORT_HEIGHT ? "46vw" : "42vw")};
    bottom: 29vh;
  }
  ${HandWrapper}:nth-of-type(4) {
    position: absolute;
    left: 53vw;
    bottom: ${({ height }) => (height < SMALL_VIEWPORT_HEIGHT ? "5vh" : "15vh")};
    transform: ${({ height }) => (height < SMALL_VIEWPORT_HEIGHT ? "scale(2.2)" : "scale(2.81)")};
  }
  ${HandWrapper}:nth-of-type(5) {
    position: absolute;
    right: 19vw;
    bottom: 10vh;
    transform: scale(1.4);
  }
  ${HandWrapper}:nth-of-type(6) {
    position: absolute;
    right: 14vw;
    bottom: 32vh;
    transform: scale(0.8);
  }
  ${HandWrapper}:nth-of-type(7) {
    position: absolute;
    right: 8vw;
    bottom: 8.1vh;
    transform: scale(1.5);
  }
`;
