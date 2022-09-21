import { css } from "@emotion/react";
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
  color: ${({ customColor }): string => customColor || color.black};
`;

export const InitialButtonView = styled.span``;

export const SecondaryView = styled.span`
  left: 0;
  opacity: 0;
  position: absolute;
  height: 70px;
  top: 0;
  transform: rotateX(-90deg) translate3d(0, 50%, 0);
  transform-origin: bottom center;
  transition: opacity 0.4s, visibility 1ms 0.4s, ${color.white} 0.4s, transform 0.4s;
  visibility: hidden;
  display: block;
`;

export const PrimaryButtonContainer = styled.div<ButtonProps>`
  ${({ disabled }) =>
    !disabled
      ? css`
    transform-origin: center;
    transform-style: preserve-3d;
    transition: transform 0.4s;
    :hover {
      ${SecondaryView} {
        opacity: 1;
        transition: opacity 0.4s, ${color.white} 0.4s, transform 0.4s;
        visibility: visible;
      }
      ${InitialButtonView} {
        transform: translateZ(0)
        transform: translate3d(0,100%,0);
        transition: opacity 0.4s, ${color.white} 0.4s,transform 0.4s;
      }
      transform: rotateX(90deg);
    }
  `
      : `${PrimaryButtonText} {
        color: ${color.mediumGrey};
      }
    `};
`;

export const PrimaryButtonWrapper = styled.div<ButtonProps>`
  cursor: ${({ disabled }) => !disabled && "pointer"};
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

export const Info = styled(InfoIcon)``;

export const ButtonContainer = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px ${margins.small5} 13px ${margins.small4};
  gap: ${margins.small1};
  height: 100%;
  ${SecondaryButtonBase} {
    padding: 0px;
  }
  cursor: pointer;
`;

export const LinkText = styled.a`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.small1};
  line-height: 24px;
  letter-spacing: -0.01em;
  color: ${color.black};
  cursor: pointer;
  position: relative;
  text-decoration: none;
  display: inline-block;
  &:after {
    display: block;
    content: "";
    border-bottom: 1px solid ${color.black};
    transform: scaleX(1);
    transition: transform 250ms ease-in-out;
    transform-origin: bottom left;
  }
  &:hover:after {
    transform: scaleX(0);
    transform-origin: 0 100%;
  }
`;

export const LinkContainer = styled.span<ButtonProps>``;
