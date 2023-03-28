import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { CloseIcon, EllipsisIcon, ExitIcon, InfoIcon, LeftArrowIcon, RightArrowIcon } from "../../assets/icons";
import { color, margins, opacity, zIndex } from "../../design";
import { SecondaryButtonBase, PrimaryButtonText } from "../atoms";

interface ButtonProps {
  disabled?: boolean;
  width?: number;
  isLoading?: boolean;
}

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

export const Span = styled.span`
  transform-origin: top center;
  transform-style: preserve-3d;
  transition: opacity 0.4s, black 0.4s, transform 0.4s;
`;

export const InitialButtonView = styled.span`
  transform: translateZ(0);
  transform: translate3d(0, 100%, 0);
  transition: opacity 0.4s, black 0.4s, transform 0.4s;
  visibility: visible;
`;

export const SecondaryView = styled.span`
  left: 0;
  opacity: ${opacity.hidden};
  position: absolute;
  top: 0;
  transform: rotateX(-90deg) translate3d(0, 50%, 0);
  transform-origin: bottom center;
  transition: opacity 0.4s, visibility 1ms 0.4s, white 0.4s, transform 0.4s;
  visibility: hidden;
`;

export const PrimaryButtonContainer = styled.div<ButtonProps>`
  ${({ disabled, width, isLoading }) =>
    disabled || isLoading
      ? css`
          ${PrimaryButtonText} {
            color: ${isLoading ? color.lightGrey : color.mediumGrey};
          }
        `
      : `
       transform-origin: center;
        transform-style: preserve-3d;
        transition: transform 0.4s;
        :hover {
          width: ${width ? `${width}px` : "fit-content"};
          ${SecondaryView} {
            opacity: ${opacity.visible};
            transition: opacity 0.4s, white 0.4s, transform 0.4s;
            visibility: visible;
          }
          ${InitialButtonView} {
            transform: translateZ(0)
            transform: translate3d(0,100%,0);
            transition: opacity .4s, red .4s,transform .4s;
          }
          transform: rotateX(90deg);
        }
  `};
`;

export const PrimaryButtonWrapper = styled.div<ButtonProps>`
  cursor: ${({ disabled }) => !disabled && "pointer"};
  ${PrimaryArrow} {
    path {
      fill: ${({ disabled, isLoading }): string => (disabled || isLoading ? `${color.darkGrey}` : `${color.black}`)};
    }
  }
  cursor: ${({ isLoading }) => !isLoading && "pointer"};
`;

export const SecondaryArrow = styled(RightArrowIcon)``;

export const LeftArrow = styled(LeftArrowIcon)``;

export const SecondaryButtonContainer = styled.div<ButtonProps>`
  display: flex;
  align-items: center;
  padding: 10px;
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

export const RightButtonContainer = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${margins.small1};
  ${SecondaryButtonBase} {
    padding: 0px;
  }
  gap: 0em;
  cursor: pointer;
  justify-content: flex-end;
`;

export const LinkContainer = styled.span<ButtonProps>``;
