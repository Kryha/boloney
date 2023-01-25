import styled from "@emotion/styled";
import { MAX_POWER_UP_VIEW_AMOUNT } from "../../constants";

import { margins } from "../../design";

interface WrapperProps {
  powerUpsAmount: number;
}

export const PowerUpListOverviewWrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  display: flex;
  gap: ${margins.small4};
  flex-wrap: wrap;
  justify-content: ${({ powerUpsAmount }) => (powerUpsAmount <= MAX_POWER_UP_VIEW_AMOUNT ? "center" : "flex-start")};
  align-items: center;
`;

export const PowerUpImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
