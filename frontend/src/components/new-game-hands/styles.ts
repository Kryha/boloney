import styled from "@emotion/styled";
import { zIndex } from "../../design";
import { HandWrapper } from "../hand/styles";

export const NewGameHandsWrapper = styled.div`
  z-index: ${zIndex.behind};
  ${HandWrapper}:nth-of-type(1) {
    position: absolute;
    left: 17vw;
    bottom: 10vh;
    transform: scale(1.2);
  }
  ${HandWrapper}:nth-of-type(2) {
    position: absolute;
    left: 31vw;
    bottom: 18vh;
    transform: scale(1.4);
  }
  ${HandWrapper}:nth-of-type(3) {
    position: absolute;
    left: 42vw;
    bottom: 29vh;
  }
  ${HandWrapper}:nth-of-type(4) {
    position: absolute;
    left: 53vw;
    bottom: 15vh;
    transform: scale(2.81);
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
