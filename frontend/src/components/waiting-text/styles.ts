import styled from "@emotion/styled";
import { fadeIn, fadeOut } from "../atoms";

export const AnimatedTextWrapper = styled.div`
  .fade-in {
    animation: ${fadeIn} 0.1s forwards;
  }
  .fade-out {
    animation: ${fadeOut} 0.1s forwards;
  }
`;
