import styled from "@emotion/styled";

interface MainProps {
  height: number;
}

export const MainPageContainer = styled.div``;

export const MainWrap = styled.div<MainProps>`
  width: 100%;
  height: 100%;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  ${({ height }): string => `height: ${height}px;`};
`;
