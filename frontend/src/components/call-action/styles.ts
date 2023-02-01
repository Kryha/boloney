import styled from "@emotion/styled";
import { margins, zIndex } from "../../design";
import { BottomButtonWrapper, Heading1, Heading6 } from "../atoms";
import { SecondaryButtonContainer } from "../buttons/styles";

export const CallActionWrapper = styled.section`
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

interface ActionProps {
  isCallBoloney: boolean;
}

export const ActionImage = styled.img<ActionProps>`
  object-fit: contain;
  height: 50vh;
  margin-top: 4.1vh;
  margin-top: ${({ isCallBoloney }): string => (isCallBoloney ? "4.1vh" : "0vw")};
`;
