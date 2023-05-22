import styled from "@emotion/styled";
import { containerWidth, spacing, zIndex } from "../../design";
import { BaseRow, Card, fadeIn, slideRight } from "../../atoms";
import { PowerUpCardWrapper } from "../power-up/styles";

export const PowerUpPileContainer = styled(BaseRow)`
  position: relative;
  margin-top: ${spacing.ms};
  ${PowerUpCardWrapper} {
    min-width: ${containerWidth.sm};
    z-index: ${zIndex.inFront};
  }
  animation-name: ${fadeIn};
  animation-timing-function: cubic-bezier(0.4, -0.38, 1, 1.92);
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
`;

export const EmptyPowerUpCard = styled(Card)`
  position: absolute;
  transform: rotate(5deg);
  z-index: ${zIndex.behind};
`;

export const PowerUpSpreadContainer = styled(BaseRow)`
  width: ${containerWidth.lg};
  flex-wrap: wrap;
  ${PowerUpCardWrapper} {
    min-width: ${containerWidth.sm};
    animation-name: ${slideRight};
    animation-timing-function: cubic-bezier(0.4, -0.38, 1, 1.92);
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }
`;
