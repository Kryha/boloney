import styled from "@emotion/styled";
import { margins } from "../../design";

interface ContentProps {
  isStageWithHUD: boolean;
}

export const MainContentContainer = styled.div<ContentProps>`
  left: 12.5vw;
  position: absolute;
  width: 87.5vw;
  height: ${({ isStageWithHUD }) => (isStageWithHUD ? "89vh" : "100vh")};
`;

export const ContentContainer = styled.div`
  margin-left: 1px;
  margin-top: ${margins.large0};
`;
