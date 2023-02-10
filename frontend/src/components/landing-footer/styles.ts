import styled from "@emotion/styled";
import { ticker } from "../atoms";
import { PrimaryButtonText } from "../buttons/styles";

export const LandingFooterWrapper = styled.section`
  position: fixed;
  bottom: 0;
  ${PrimaryButtonText} {
    :not(:hover) {
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
      -webkit-animation-name: ${ticker};
      animation-name: ${ticker};
      -webkit-animation-duration: 30s;
      animation-duration: 30s;
    }
  }
`;
