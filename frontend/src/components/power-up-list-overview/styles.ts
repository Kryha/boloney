import styled from "@emotion/styled";

import { color } from "../../design";

export const PowerUpListOverviewWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
`;

export const PowerUpCardImage = styled.img`
  // TODO:change depending on assets
  height: 100%;
  width: auto;
  margin-left: -15px;
`;
