import styled from "@emotion/styled";
import { margins } from "../../design";
import { BottomButtonWrapper, Heading1, Heading6 } from "../../atoms";

export const CallBoloneyWrapper = styled.section`
  margin-top: -${margins.large0};
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
  width: 100%;
  height: 100%;
`;

export const BoloneyImageWrapper = styled.div`
  margin-top: ${margins.large3};
  width: 71.73611vw;
  height: 51.25vh;
`;
