import styled from "@emotion/styled";
import { margins, zIndex } from "../../design";
import { BottomButtonWrapper, Heading6, Heading1 } from "../atoms";
import { SecondaryButtonContainer } from "../buttons/styles";

export const TextResultWrapper = styled.section``;

export const ActivePlayerResultWrapper = styled.section`
  margin-top: -${margins.large0};
  ${SecondaryButtonContainer} {
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${zIndex.inFront};
  }
  ${BottomButtonWrapper} {
    ${Heading6} {
      margin-bottom: ${margins.small4};
    }
  }
  ${Heading1} {
    margin-top: 0.3em;
    margin-bottom: 0;
  }
`;

interface ActivePlayerProps {
  isBoloney: boolean;
}

export const ActivePlayerImage = styled.img<ActivePlayerProps>`
  object-fit: contain;
  width: ${({ isBoloney }): string => (isBoloney ? "clamp(600px, 62.5vw + 0px, 1200px)" : "clamp(550px, 46.88vw + 100px, 1000px)")};
  height: auto;
  margin-top: -7vw;
`;
