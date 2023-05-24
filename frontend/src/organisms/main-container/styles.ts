import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";

interface MainProps {
  height: number;
  isOverlayVisible: boolean;
}

export const MainPageContainer = styled.div``;

export const MainWrap = styled(BaseRow)<MainProps>`
  width: 100%;
  overflow-y: scroll;
  position: relative;
  height: ${({ height }): string => `${height}px`};
  filter: ${({ isOverlayVisible }): string => (isOverlayVisible ? "blur(15px);" : "none;")};
  overflow-x: hidden;
`;
