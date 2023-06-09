import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";
import { color, containerWidth, patternSizes, spacing } from "../../design";

export const LobbyWaitingWrapper = styled(BaseRow)`
  width: ${containerWidth.fluid};
  height: ${patternSizes.md};
`;

export const LobbyWaitingContainer = styled(BaseRow)`
  padding: 0px ${spacing.lg};
  background: ${color.lightGrey};
  height: calc(100% - 2px);
`;
