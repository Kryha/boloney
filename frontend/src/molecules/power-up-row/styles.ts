import styled from "@emotion/styled";
import { BaseRow, fadeInPop, slideUp } from "../../atoms";
import { PowerUpWrapper } from "../../components/power-up/styles";
import { opacity } from "../../design";

export const PowerUpRowWrapper = styled(BaseRow)`
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
`;
