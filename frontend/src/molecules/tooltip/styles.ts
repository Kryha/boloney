import styled from "@emotion/styled";
import { tooltipAnimation } from "../../atoms";
import { containerWidth, spacing, zIndex as designZIndex } from "../../design";

export const TooltipContainer = styled.section``;

interface Props {
  zIndex?: number;
}

export const TooltipWrapper = styled.div<Props>`
  position: relative;
  z-index: ${({ zIndex }) => zIndex ?? designZIndex.background};
`;

export const TooltipContentWrapper = styled.div`
  position: absolute;
  animation: ${tooltipAnimation} 0.5s;
  &.top {
    top: "calc(${spacing.xxl} * -1)";
  }
  &.bottom {
    bottom: calc(${spacing.xxl} * -1);
  }
  &.left {
    left: auto;
    right: calc(100% - ${spacing.xxl} * 4);
    top: 0%;
    transform: translateX(0) translateY(0);
  }
  &.right {
    left: -${containerWidth.md};
    top: 0%;
    transform: translateX(0) translateY(0);
  }
`;
