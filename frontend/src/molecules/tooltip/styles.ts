import styled from "@emotion/styled";
import { tooltipAnimation } from "../../atoms";
import { iconSize, spacing, TOOLTIP_SIZE, zIndex as designZIndex } from "../../design";

export const TooltipContainer = styled.section`
  height: ${iconSize.xxs};
`;

interface Props {
  zIndex?: number;
}

export const TooltipWrapper = styled.div<Props>`
  position: relative;
  display: inline-block;
  z-index: ${({ zIndex }) => zIndex ?? designZIndex.background};
`;

export const TooltipContentWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  animation: ${tooltipAnimation} 0.5s;
  &.top {
    top: calc(${TOOLTIP_SIZE} * -1);
  }
  &.bottom {
    bottom: calc(${TOOLTIP_SIZE}* -1);
  }
  &.left {
    left: auto;
    right: calc(100% + ${spacing.ms});
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  &.right {
    left: calc(100% + ${spacing.ms});
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
`;
