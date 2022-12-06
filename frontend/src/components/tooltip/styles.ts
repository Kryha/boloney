import styled from "@emotion/styled";
import { InfoIcon } from "../../assets";
import { color, fontSize, margins, zIndex } from "../../design";
import { Heading3, tooltipAnimation } from "../atoms";

export const TooltipWrap = styled.section`
  display: inline-block;
  position: relative;
  margin-top: 0.2em;
`;

export const Info = styled(InfoIcon)``;

export const ButtonInfoWrap = styled.span`
  margin-left: ${margins.small1};
`;

export const TooltipContent = styled.div`
  max-width: 250px;
  position: absolute;
  border-radius: ${margins.small0};
  border: solid 1px ${color.mediumGrey};
  left: 50%;
  transform: translateX(-50%);
  padding: ${margins.small2} ${margins.small2};
  color: ${color.black};
  background: ${color.lightGrey};
  font-size: ${fontSize.medium0};
  z-index: ${zIndex.inFront};
  min-width: 150px;
  box-sizing: border-box;
  animation: ${tooltipAnimation} 0.5s;
  ${Heading3} {
    margin-bottom: ${margins.small0};
  }
  &.top {
    top: calc(${margins.medium0} * -1);
  }
  &.bottom {
    bottom: calc(${margins.small0} * -1);
  }
  &.left {
    left: auto;
    right: calc(100% + ${margins.small0});
    top: 50%;
    transform: translateX(0) translateY(0);
  }
  &.right {
    left: calc(100% + ${margins.small0});
    top: 50%;
    transform: translateX(0) translateY(0);
  }
`;
