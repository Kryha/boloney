import styled from "@emotion/styled";
import { CloseIcon, EllipsisIcon, ExitIcon, InfoIcon, RightArrowIcon } from "../../assets/icons";
import { color, fontSize, fontWeight, margins } from "../../design";
import { zIndex } from "../../design/z-index";
import { SecondaryButtonBase } from "../atoms";

interface ButtonProps {
  disabled?: boolean;
}

interface TextProps {
  customColor?: string;
}

export const Ellipse = styled.div`
  position: absolute;
  background: ${color.pureWhite};
  z-index: ${zIndex.background};
  width: 770px;
  height: 96px;
  border-radius: 50%;
  top: ${margins.medium0};
`;

export const PrimaryArrow = styled(RightArrowIcon)`
  width: 30px;
  height: 15px;
  z-index: ${zIndex.normal};
`;

export const ArrowSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 13px;
`;

export const PrimaryButtonText = styled.h3<TextProps>`
  font-family: ibm-plex-mono;
  font-style: normal;
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize.medium1};
  line-height: 44px;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  max-height: 44px;
  margin-top: -11px;
  color: ${({ customColor }): string => (customColor || color.black)};
`;


export const Span = styled.span`
  transform-origin: top center;
  transform-style: preserve-3d;
  transition: opacity 0.4s, black 0.4s, transform 0.4s;
`;


export const InitialButtonView = styled(Span)`
  --tw-text-opacity: 1;
  transform: translateZ(0)
  transform: translate3d(0, 100%, 0);
  transition: opacity .4s, black .4s,transform .4s;
  visibility: visible;
  height: 70px;
`;

export const SecondaryView = styled(Span)`
  left: 0;
  opacity: 0;
  position: absolute;
  height: 70px;
  top: 0;
  transform: rotateX(-90deg) translate3d(0, 50%, 0);
  transform-origin: bottom center;
  transition: opacity 0.4s, visibility 1ms 0.4s, white 0.4s, transform 0.4s;
  visibility: hidden;
`;

export const PrimaryButtonContainer = styled.div`
  transform-origin: center;
  transform-style: preserve-3d;
  transition: transform 0.4s;
  :hover {
    ${SecondaryView} {
      opacity: 1;
      transition: opacity 0.4s, white 0.4s, transform 0.4s;
      visibility: visible;
    }
    ${InitialButtonView} {
      opacity: 0;
      transform: translateZ(0)
      transform: translate3d(0,100%,0);
      transition: opacity .4s, black .4s,transform .4s;
      visibility: hidden;
    }
    transform: rotateX(90deg);
  }
`;
export const PrimaryButtonWrapper = styled.div<ButtonProps>`
  cursor: ${({ disabled }) => (!disabled && "pointer")};
  ${PrimaryArrow} {
    path {
      fill: ${({ disabled }): string => (disabled ? `${color.darkGrey}` : `${color.black}`)};
    }
  }
`;

export const SecondaryArrow = styled(RightArrowIcon)`
  width: 15px;
  height: 7.5px;
`;

export const SecondaryButtonContainer = styled.div<ButtonProps>`
  ${SecondaryArrow} {
    path {
      fill: ${({ disabled }): string => (disabled ? `${color.darkGrey}` : `${color.black}`)};
    }
  }
`;

export const CloseButton = styled(CloseIcon)`
  margin-top: 4px;
  width: 20px;
`;

export const Ellipsis = styled(EllipsisIcon)`
  margin-top: 5px;
  width: 20px;
`;

export const Exit = styled(ExitIcon)`
  margin-top: 2px;
`;

export const Info = styled(InfoIcon)`
`;

export const ButtonContainer = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px ${margins.small3} 13px ${margins.small2};
  gap: ${margins.small0};
  height: 100%;
  ${SecondaryButtonBase} {
    padding: 0px;
  }
  cursor: pointer;
`;
