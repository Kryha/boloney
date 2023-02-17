import styled from "@emotion/styled";

import { color } from "../../design";

interface FaceProps {
  faceColor?: string;
  size?: string;
  padding?: string;
  pipColor?: string;
  borderRadius?: string;
  isDiceHidden?: boolean;
  isMatchSettings?: boolean;
  isMatchHistory?: boolean;
}

export const DieWrapper = styled.div<FaceProps>`
  height: ${({ isDiceHidden, isMatchSettings }): string =>
    isMatchSettings ? "" : isDiceHidden ? "1em" : "clamp(18px, 2.08vw + -2px, 38px)"};
  padding-top: ${({ isMatchSettings }): string => (isMatchSettings ? "6px" : "")};
  padding-top: ${({ isMatchHistory }): string => (isMatchHistory ? "0.4vh" : "")};
  > svg {
    width: ${({ isMatchHistory, size }): string => (isMatchHistory ? "" : size || "clamp(18px, 2.08vw + -2px, 38px)")};
    height: ${({ isMatchHistory, size }): string => (isMatchHistory ? "" : size || "clamp(18px, 2.08vw + -2px, 38px)")};
    background-color: ${({ faceColor }): string => faceColor || color.darkBlue};
    border-radius: ${({ borderRadius }): string => borderRadius || "clamp(2px, 0.1vw + 1px, 3px)"};
    ${({ isDiceHidden, pipColor }): string =>
      isDiceHidden
        ? `
        path {
          fill: ${pipColor || color.pureWhite};
        }
        `
        : `
        rect {
          fill: ${pipColor || color.pureWhite};
        }
    `};
  }
`;

export const DiceContainer = styled.section<FaceProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

interface TempDiePros {
  isRow?: boolean;
}

export const TemporaryDieIconWrapper = styled.div<TempDiePros>`
  position: absolute;
  bottom: ${({ isRow }): string => (isRow ? "-2.2vh" : "-18px")};
  height: clamp(18px, 2.08vw + -2px, 38px);

  z-index: 100;
  > svg {
    width: clamp(18px, 2.08vw + -2px, 38px);
    height: clamp(18px, 2.08vw + -2px, 38px);
    border-radius: clamp(2px, 0.1vw + 1px, 3px);
  }
`;
