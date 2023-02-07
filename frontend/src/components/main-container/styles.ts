import styled from "@emotion/styled";

interface MainProps {
  height: number;
  isOverlayVisible: boolean;
}

export const MainPageContainer = styled.div``;

export const MainWrap = styled.div<MainProps>`
  width: 100%;
  height: 100%;
  flex-direction: row;
  overflow-y: scroll;
  position: relative;
  height: ${({ height }): string => `${height}px`};
  filter: ${({ isOverlayVisible }): string => (isOverlayVisible ? "blur(15px);" : "none;")};
  overflow-x: hidden;
`;
