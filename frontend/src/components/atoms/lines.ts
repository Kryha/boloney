import styled from "@emotion/styled";

import { color, layoutHeight } from "../../design";

interface Props {
  height?: string;
  width?: string;
}

/**
 * This file is for lines
 */

export const VerticalDivider = styled.div<Props>`
  height: ${({ height }): string => (height ? height : layoutHeight.sm)};
  max-width: 1px;
  min-width: 1px;
  background: ${color.mediumGrey};
`;

export const HorizontalDivider = styled.div<Props>`
  min-height: 1px;
  max-height: 1px;
  width: 100%;
  width: ${({ width }): string => (width ? width : "100%")};
  background: ${color.mediumGrey};
`;
