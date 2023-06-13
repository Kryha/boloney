import styled from "@emotion/styled";
import { fadeIn } from "../../atoms";
import { color, spacing } from "../../design";

const TooltipMargin = spacing.ms;
const TooltipArrowSize = spacing.sm;

interface Props {
  tooltipMargin?: string;
}

export const ArrowTooltip = styled.div<Props>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: ${spacing.sm};
  color: ${color.black};
  background: ${color.cloudWhite};
  line-height: 1;
  z-index: 100;
  white-space: nowrap;
  animation: ${fadeIn} 0.5s forwards;
  /* CSS border triangles */
  ::before {
    content: " ";
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: ${TooltipArrowSize};
    margin-left: calc(${TooltipArrowSize} * -1);
  }

  /* Absolute positioning */
  &.top {
    top: calc(7vw * -1);
  }
  /* CSS border triangles */
  &.top::before {
    top: 100%;
    border-top-color: ${color.cloudWhite};
  }

  /* Absolute positioning */
  &.right {
    left: calc(100% + ${({ tooltipMargin }) => (tooltipMargin ? tooltipMargin : TooltipMargin)});
    top: 250%;
    transform: translateX(0) translateY(-50%);
  }
  /* CSS border triangles */
  &.right::before {
    left: calc(${TooltipArrowSize} * -1);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-right-color: ${color.cloudWhite};
  }

  /* Absolute positioning */
  &.bottom {
    bottom: calc(7vw * -1);
  }
  /* CSS border triangles */
  &.bottom::before {
    bottom: 100%;
    border-bottom-color: ${color.cloudWhite};
  }

  /* Absolute positioning */
  &.left {
    left: auto;
    right: calc(100% + ${({ tooltipMargin }) => (tooltipMargin ? tooltipMargin : TooltipMargin)});
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  /* CSS border triangles */
  &.left::before {
    left: auto;
    right: calc(${TooltipArrowSize} * -2);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-left-color: ${color.cloudWhite};
  }
`;

export const TriangleToolTipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;
