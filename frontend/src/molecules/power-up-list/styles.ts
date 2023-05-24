import styled from "@emotion/styled";
import { BaseRow, TertiaryButtonBase } from "../../atoms";
import { MAX_POWER_UP_VIEW_AMOUNT } from "../../constants";
import { containerWidth, spacing } from "../../design";

interface Props {
  powerUpsAmount: number;
  width?: string;
  height?: string;
}

export const PowerUpListWrapper = styled.div`
  ${TertiaryButtonBase} {
    visibility: hidden;
  }
`;

export const PowerUpListContainer = styled(BaseRow)<Props>`
  flex-wrap: wrap;
  margin-bottom: ${spacing.md};
  width: ${({ width }) => width ?? containerWidth.fluid};
  height: ${({ height }) => height ?? containerWidth.fluid};
  justify-content: ${({ powerUpsAmount }) => (powerUpsAmount <= MAX_POWER_UP_VIEW_AMOUNT ? "center" : "flex-start")};
`;
