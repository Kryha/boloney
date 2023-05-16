import styled from "@emotion/styled";
import { color, containerWidth, patternSizes } from "../design";

interface Props {
  width?: string;
  height?: string;
  patternWidth?: string;
  patternHeight?: string;
}

/**
 * This component is for box patterns.
 * @param {string} width - width of the pattern container.
 * @param {string} height - height of the pattern container.
 * @param {string} patternWidth - width of each box
 * @param {string} patternHeight - height of each box
 */

export const BoxPattern = styled.div<Props>`
  width: ${({ height }) => height ?? containerWidth.fluid};
  height: ${({ height }) => height ?? patternSizes.lg};
  background-image: linear-gradient(${color.mediumGrey} 1px, transparent 1px),
    linear-gradient(to right, ${color.mediumGrey} 1px, transparent 1px);
  background-size: ${patternSizes.sm} ${patternSizes.sm};
`;

/**
 * This component is for rectangle patterns.
 * @param {string} width - width of the pattern container.
 * @param {string} height - height of the pattern container.
 * @param {string} patternWidth - width of each rectangle
 * @param {string} patternHeight - height of each rectangle
 */

export const RectanglePattern = styled(BoxPattern)`
  background-size: ${patternSizes.xxs} ${patternSizes.sm};
  height: ${({ height }) => height ?? patternSizes.md};
`;
