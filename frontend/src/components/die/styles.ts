import styled from "@emotion/styled";

export const DieWrapper = styled.div``;

export const DiceContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

interface TempDiePros {
  isRow?: boolean;
}

export const TemporaryDieIconWrapper = styled.div<TempDiePros>`
  position: absolute;
  bottom: ${({ isRow }): string => (isRow ? "-10px" : "-10px")};
  z-index: 100;
`;
