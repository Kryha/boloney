import styled from "@emotion/styled";
import { InfoIcon } from "../../assets";
import { color, fontWeight, margins } from "../../design";
import { GeneralText, Heading3, tooltipAnimation } from "../atoms";

export const TooltipWrap = styled.section`
  display: inline-block;
  position: relative;
  margin-top: 0.2em;
`;

export const Info = styled(InfoIcon)``;

export const ButtonInfoWrap = styled.span`
  margin-left: ${margins.small1};
`;

export const ToolTipText = styled.span`
  display: block;
  font-family: ibm-plex-mono, sans-serif;
  font-weight: ${fontWeight.light};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  letter-spacing: -0.01em;
  color: ${color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const TooltipDescription = styled(GeneralText)``;

export const TooltipHeading = styled.span`
  font-family: ibm-plex-mono, sans-serif;
  font-weight: ${fontWeight.bold};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  letter-spacing: -0.01em;
  color: ${color.black};
  margin-right: 10px;
  :first-letter {
    text-transform: capitalize;
  }
`;

interface TooltipProps {
  isButtonWithHelper: boolean;
}

export const TooltipContent = styled.div<TooltipProps>`
  max-width: clamp(450px, 10.42vw + 350px, 550px);
  position: absolute;
  left: 40px;
  padding: ${margins.small4};
  color: ${color.black};
  background: ${color.cloudWhite};
  box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.1);
  min-width: clamp(400px, 10.42vw + 300px, 500px);
  box-sizing: border-box;
  animation: ${tooltipAnimation} 0.5s;
  ${Heading3} {
    margin-bottom: ${margins.small0};
  }
  &.top {
    top: ${({ isButtonWithHelper }): string => (isButtonWithHelper ? "calc(5.4em * -1)" : " calc(5.5em * -1)")};
  }
  &.bottom {
    bottom: calc(4.7em * -1);
  }
  &.left {
    left: auto;
    right: calc(100% + 17.25em);
    top: 0%;
    transform: translateX(0) translateY(0);
  }
  &.right {
    left: -31.2vw;
    top: 0%;
    transform: translateX(0) translateY(0);
  }
`;

interface Props {
  zIndex?: number;
}

export const TooltipContentWrapper = styled.div<Props>`
  position: relative;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : "1")};
`;
