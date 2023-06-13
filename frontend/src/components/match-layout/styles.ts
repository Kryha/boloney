import styled from "@emotion/styled";

import { color, margins } from "../../design";

interface ContentProps {
  isStageWithHUD: boolean;
  isInMatch: boolean;
}

export const MainContentContainer = styled.div<ContentProps>`
  overflow-y: scroll;
  border-right: ${({ isInMatch }) => (isInMatch ? "none" : `1px solid ${color.mediumGrey}`)};
  left: 12.5vw;
  position: absolute;
  top: 0;
  width: 62.5vw;
  height: ${({ isStageWithHUD }) => (isStageWithHUD ? "89vh" : "100vh")};
  overflow-y: scroll;
`;

export const ContentContainer = styled.div`
  margin-left: 1px;
  margin-top: ${margins.large0};
`;
