import styled from "@emotion/styled";
import { margins, zIndex } from "../../design";
import { BottomButtonWrapper, Heading6 } from "../atoms";
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
      margin-bottom: 15px;
    }
  }
`;

interface ActivePlayerProps {
  isBoloney: boolean;
  actionImgMargin?: string;
}

export const ActivePlayerImage = styled.img<ActivePlayerProps>`
  object-fit: contain;
  width: auto;
  height: 50vh;
  margin-top: ${({ actionImgMargin }) => actionImgMargin};
`;
