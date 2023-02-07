import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fadeUp } from "../atoms";

interface ImageContainerBoxProps {
  isImageRight: boolean;
}

interface Props {
  isVisible: boolean;
}

export const ImageContainerWrapper = styled.section<Props>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 40px;
  gap: 10px;
  opacity: 0;
  ${({ isVisible }) =>
    isVisible
      ? css`
          animation: ${fadeUp} 1.2s ease-out 0.25s forwards;
          transform: translate3d(0, 1rem, 0);
        `
      : ""};
`;

export const ImageContainerBox = styled.section<ImageContainerBoxProps>`
  display: flex;
  flex-direction: ${({ isImageRight }): string => (isImageRight ? "row-reverse" : "row")};
  align-items: center;
  padding: 0px;
  gap: 10px;
`;

export const Image = styled.img`
  object-fit: contain;
  width: auto;
  height: 31.25vh;
`;
