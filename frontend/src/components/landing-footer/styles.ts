import styled from "@emotion/styled";
import { color } from "../../design";
import { PrimaryButtonBase, ticker, PrimaryButtonText } from "../atoms";

export const LandingFooterWrapper = styled.section`
  position: fixed;
  bottom: 0;
  ${PrimaryButtonText} {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-name: ${ticker};
    animation-name: ${ticker};
    -webkit-animation-duration: 30s;
    animation-duration: 30s;
    :hover {
      color: ${color.cloudWhite};
      animation-play-state: paused;
    }
  }
  :hover {
    ${PrimaryButtonBase} {
      background: ${color.black};
    }
  }
`;
