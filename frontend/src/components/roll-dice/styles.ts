import styled from "@emotion/styled";
import { margins } from "../../design";

export const AttributesContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 1px;
`;

export const DiceValueContainer = styled.div`
  margin-top: 5em;
  margin-left: ${margins.large0};
  width: clamp(300px, 38.75vw + -72px, 672px);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${margins.large0};
  width: 140px;
`;
