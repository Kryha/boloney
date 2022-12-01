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

export const ActivePlayerImage = styled.img`
  object-fit: contain;
  width: clamp(619.18px, 38.78vw + 246.93px, 991.43px);
  height: clamp(262.55px, 21.75vw + 53.74px, 471.35px);
`;
