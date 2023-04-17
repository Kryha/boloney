import styled from "@emotion/styled";
import { color } from "../../design";
import { PrimaryButtonBase, ticker } from "../atoms";

export const LandingFooterWrapper = styled.section`
  position: fixed;
  bottom: 0;
  ${PrimaryButtonBase} {
    animation-iteration-count: infinite;
    animation-timing-function: linear;
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
