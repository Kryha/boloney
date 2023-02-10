import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fadeUp, GeneralText, Heading3 } from "../atoms";

export const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 40px 80px;
  gap: 10px;
  margin-top: -3.6vh;
`;

interface Props {
  isVisible: boolean;
}

export const NumberedParagraphContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 0px;
  opacity: 0;

  ${({ isVisible }) =>
    isVisible
      ? css`
          animation: ${fadeUp} 1.2s ease-out 0.25s forwards;
          transform: translate3d(0, 1rem, 0);
        `
      : ""};

  ${Heading3} {
    margin-top: 10px;
    width: 43.5vw;
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
