import styled from "@emotion/styled";
import { margins, zIndex } from "../../design";
import { BottomButtonWrapper, Heading6 } from "../../atoms";

export const TextResultWrapper = styled.section``;

export const ActivePlayerResultWrapper = styled.section`
  margin-top: -${margins.large0};
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
