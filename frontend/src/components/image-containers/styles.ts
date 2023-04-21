import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MEDIUM_VIEWPORT_WIDTH } from "../../constants";
import { opacity } from "../../design";
import { BaseRow, fadeUp } from "../../atoms";

interface ImageContainerBoxProps {
  isImageRight: boolean;
}

interface Props {
  isVisible: boolean;
}

interface ImageProps {
  width: number;
}

export const ImageContainerWrapper = styled.section<Props>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 40px;
  gap: 10px;
  opacity: ${opacity.hidden};
  ${({ isVisible }) =>
    isVisible
      ? css`
          -webkit-animation-duration: 0.6s;
          -webkit-animation-timing-function: cubic-bezier(0.4, -0.38, 1, 1.92);
          -webkit-animation-delay: 0.25s;
          -webkit-animation-iteration-count: 1;
          -webkit-animation-direction: normal;
          -webkit-animation-fill-mode: forwards;
          -webkit-animation-play-state: running;
          -webkit-animation-name: ${fadeUp};
          transform: translate3d(0, 1rem, 0);
        `
      : ""};
`;

export const ImageContainerBox = styled(BaseRow)<ImageContainerBoxProps>`
  flex-direction: ${({ isImageRight }): string => (isImageRight ? "row-reverse" : "row")};
  gap: 10px;
`;

export const Image = styled.img<ImageProps>`
  object-fit: contain;
  width: ${({ width }): string => (width > MEDIUM_VIEWPORT_WIDTH ? "35vw" : "auto")};
  height: ${({ width }): string => (width > MEDIUM_VIEWPORT_WIDTH ? "auto" : "31.25vh")};
  min-width: ${({ width }): string => (width > MEDIUM_VIEWPORT_WIDTH ? "35vw" : "auto")};
`;
