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

export const PrimaryButtonContainer = styled.div<ButtonProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 16px 0px;
  gap: 16px;
  width: 770px;
  height: 96px;
  cursor: ${({ disabled }): string => (disabled ? "" : "pointer")};
  ${PrimaryButtonBase} {
    line-height: 72px;
    z-index: ${zIndex.normal};
  }
  :not(:hover){
    ${Ellipse} {
      display: none;
    }
  }
  ${Ellipse} {
    cursor: ${({ disabled }): string => (disabled ? "" : "pointer")};
    display: ${({ disabled }): string => (disabled ? "none" : "")};
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
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 236px;
  height: 50px;
  cursor: ${({ disabled }): string => (disabled ? "" : "pointer")};
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
  width: 62px;
  ${SecondaryButtonBase} {
    padding: 0px;
  }
  cursor: pointer;
`;
