import styled from "@emotion/styled";

import { color, layoutHeight, layoutWidth, margins } from "../../design";

interface ContentProps {
  isStageWithHUD: boolean;
  isInMatch: boolean;
}

export const MainContentContainer = styled.div<ContentProps>`
  overflow-y: scroll;
  border-right: ${({ isInMatch }) => (isInMatch ? "none" : `1px solid ${color.mediumGrey}`)};
  left: ${layoutWidth.sm};
  position: absolute;
  width: ${layoutWidth.lg};
  height: ${({ isStageWithHUD }) => (isStageWithHUD ? layoutHeight.xxxl : "100vh")};
  top: 0;
  overflow-y: scroll;
`;

export const ContentContainer = styled.div`
  margin-left: 1px;
  margin-top: ${margins.large0};
`;
