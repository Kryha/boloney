import styled from "@emotion/styled";

interface RollDiceContainerProps {
  height: number;
}

export const RollDiceContainer = styled.section<RollDiceContainerProps>`
  width: 60vw;
  height: ${({ height }) => (height < 900 ? "49vh" : "59vh")};
  background: black;
`;
