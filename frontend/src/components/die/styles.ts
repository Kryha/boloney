import styled from "@emotion/styled";

import { color } from "../../design";

interface FaceProps {
  faceColor?: string;
  faceSize?: string;
  padding?: string;
  pipColor?: string;
  isSixDie?: boolean;
}

export const DieWrapper = styled.div<FaceProps>`
  > svg {
    width: ${({ faceSize }): string => faceSize || "clamp(32.97px, 2.82vw + 5.94px, 60px)"};
    height: ${({ faceSize }): string => faceSize || "clamp(32.97px, 2.82vw + 5.94px, 60px)"};
    ${({ isSixDie, faceColor, pipColor }): string => {
    return isSixDie
      ? `
        path: nth-of-type(1) {
          fill: ${pipColor || color.pureWhite};
        }
          `
      : `
        path: nth-of-type(1) {
          fill: ${faceColor || color.darkBlue};
        }
        `;
  }};
    path: nth-of-type(2) {
      fill: ${({ pipColor }): string => pipColor || color.white};
    }
    path: nth-of-type(3) {
      fill: ${({ pipColor }): string => pipColor || color.white};
    }
    path: nth-of-type(4) {
      fill: ${({ pipColor }): string => pipColor || color.white};
    }
    path: nth-of-type(5) {
      fill: ${({ pipColor }): string => pipColor || color.white};
    }
    path: nth-of-type(6) {
      fill: ${({ pipColor }): string => pipColor || color.white};
    }
    g {
      path {
        fill: ${({ faceColor }): string => faceColor || color.darkBlue} !important;
      }
    }
  }
`;
