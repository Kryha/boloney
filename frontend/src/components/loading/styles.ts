import styled from "@emotion/styled";

interface LoadingContainerProps {
  height: number;
}

export const LoadingContainer = styled.div<LoadingContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${({ height }): string => `${height}px`};
`;
