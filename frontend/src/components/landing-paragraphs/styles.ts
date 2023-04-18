import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { opacity } from "../../design";
import { ViewProps } from "../../types";
import { fadeUp, GeneralText, Heading3 } from "../../atoms";

export const ParagraphContainer = styled.div<ViewProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 40px 0px;
  padding-left: clamp(70px, 3.13vw + 40px, 100px);
  gap: 10px;
  margin-top: -2.1vw;
`;

interface Props {
  isVisible: boolean;
}

export const NumberedParagraphContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 0px;
  opacity: ${opacity.hidden};
  padding-bottom: 40px;

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

  ${Heading3} {
    margin-top: 10px;
    width: 54vw;
  }
`;

export const NeutralContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  ${GeneralText} {
    padding: 10px 0px 10px 20px;
  }
`;
