import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";
import { color, containerWidth, lobbySizes, zIndex } from "../../design";

export const PlayerLineupWrapper = styled(BaseRow)`
  height: ${lobbySizes.md};
  width: ${containerWidth.fluid};
  border-top: 1px solid ${color.mediumGrey};
  position: relative;
  z-index: -${zIndex.background};
`;
