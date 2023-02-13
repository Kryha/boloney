import styled from "@emotion/styled";
import { fadeIn, fadeOut } from "../atoms";

export const AnimatedTextWrapper = styled.div`
  .fade-in {
    animation: ${fadeIn} 1s forwards;
  }
  .fade-out {
    animation: ${fadeOut} 1s forwards;
  }
`;
