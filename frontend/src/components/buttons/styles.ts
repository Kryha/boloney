import styled from "@emotion/styled";
import { CloseIcon, EllipsisIcon, ExitIcon, InfoIcon, RightArrowIcon } from "../../assets/icons";
import { color, margins } from "../../design";
import { zIndex } from "../../design/z-index";
import { PrimaryButtonBase, SecondaryButtonBase } from "../atoms";

interface ButtonProps {
  disabled?: boolean;
}

export const Ellipse = styled.div`
  position: absolute;
  background: ${color.pureWhite};
  z-index: ${zIndex.background};
  width: 770px;
  height: 96px;
  border-radius: 50%;
  top: 30px;
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

export const PrimaryButtonText = styled.h3`
  font-family: ibm-plex-mono;
  font-style: normal;
  font-weight: 500;
  font-size: 60px;
  line-height: 44px;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #292929;
  max-height: 44px;
  margin-top: -11px;
`;


export const Span = styled.span`
transform-origin: top center;
    transform-style: preserve-3d;
    transition: opacity .4s,black .4s,transform .4s;
`;


export const FirstB = styled(Span)`
  --tw-text-opacity: 1;
  background: white;
  font-size: 50px;
  opacity: 1;
  color: black;
  transform: translateZ(0)
  transform: translate3d(0,100%,0);
  transition: opacity .4s, black .4s,transform .4s;
  visibility: visible;
  width: 70px;
  height: 70px;
  `;

export const SecondB = styled(Span)`
  left: 0;
  opacity: 0;
  position: absolute;
  background: black;
  font-size: 50px;
  color: white;
  width: 70px;
  height: 70px;
  top: 0;
  transform: rotateX(-90deg) translate3d(0,50%,0);
  transform-origin: bottom center;
  transition: opacity .4s,visibility 1ms .4s,white .4s,transform .4s;
  visibility: hidden;
  `;

export const BContainer = styled.div`
transform-origin: center;
    transform-style: preserve-3d;
    transition: transform .4s;
  :hover{
    ${SecondB} {
    opacity: 1;
    transition: opacity .4s, white .4s,transform .4s;
    visibility: visible;
    }
    ${FirstB} {
      opacity: 0;
      color: black;
      transform: translateZ(0)
      transform: translate3d(0,100%,0);
      transition: opacity .4s, black .4s,transform .4s;
      visibility: hidden;
    }
    transform: rotateX(90deg);
  }
`;
export const PrimaryButtonContainer = styled.div<ButtonProps>`
  cursor: ${({ disabled }) => (!disabled && "pointer")};
  ${PrimaryButtonBase} {
  }

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
  // position: relative;
  // display: flex;
  // flex-direction: row;
  // justify-content: center;
  // align-items: center;
  // gap: ${margins.small0};
  // width: 236px;
  // height: 50px;
  // cursor: ${({ disabled }) => (!disabled && "pointer")};
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
