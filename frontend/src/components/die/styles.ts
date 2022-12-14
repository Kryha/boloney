import styled from "@emotion/styled";

import { color } from "../../design";

interface FaceProps {
  faceColor?: string;
  size?: string;
  padding?: string;
  pipColor?: string;
  borderRadius?: string;
  isDiceHidden?: boolean;
}

export const DieWrapper = styled.div<FaceProps>`
  height: ${({ isDiceHidden }): string => (isDiceHidden ? "1em" : "clamp(20px, 2.08vw + 0px, 40px)")};
  > svg {
    width: ${({ size }): string => size || "clamp(20px, 2.08vw + 0px, 40px)"};
    height: ${({ size }): string => size || "clamp(20px, 2.08vw + 0px, 40px)"};
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
