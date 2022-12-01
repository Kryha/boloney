import styled from "@emotion/styled";
import { margins, zIndex } from "../../design";
import { BottomButtonWrapper, Heading1, Heading6 } from "../atoms";
import { SecondaryButtonContainer } from "../buttons/styles";

export const CallBoloneyWrapper = styled.section`
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

export const BoloneyImage = styled.img`
  object-fit: contain;
  width: clamp(687.98px, 71.77vw + -1.03px, 1376.99px);
  height: clamp(291.72px, 30.99vw + -5.75px, 589.19px);
`;
