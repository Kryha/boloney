import styled from "@emotion/styled";
import { color } from "../../design";
import { UnorderedListItems } from "../atoms";

export const bidDieSize = {
  idle: "100px",
  selected: "110px",
};

export const BidWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const BidContainer = styled.div`
  display: flex;
  margin-top: 3vw;
`;

export const DiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: clamp(14.69rem, 175.52vw + -90.63rem, 120rem);
  min-width: 235px;
  max-width: 333px;
`;

export interface DieProps {
  disabled: boolean;
  isSelected: boolean;
}

export const Die = styled.div<DieProps>`
  cursor: ${({ disabled }): string => (disabled ? "arrow" : "pointer")};
  opacity: ${({ disabled }): string => (disabled ? "0.1" : "1")};
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 110px;
  height: 110px;
  svg {
    border-radius: 22px;
    box-shadow: ${({ isSelected, disabled }): string => (isSelected && !disabled ? `0px 0px 12px 2px ${color.darkGrey}` : "none")};
  }
`;

export const AmountContainer = styled.div`
  width: 50%;
  height: 100%;
`;

export const NumberSliderWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
`;

export const ControlButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export interface ButtonProps {
  downButton?: boolean;
  disabled?: boolean;
}

export const ControlButton = styled.div<ButtonProps>`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  transform: rotate(${({ downButton }): string => (downButton ? "-180deg" : "0")});
  cursor: ${({ disabled }): string => (disabled ? "arrow" : "pointer")};
  opacity: ${({ disabled }): string => (disabled ? "0" : "1")};
`;

export const NumberList = styled.ul`
  display: flex;
  width: auto;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
`;

export interface ItemProps {
  isCurrent: boolean;
  isDisabled: boolean;
  isEmpty?: boolean;
}

export const Number = styled(UnorderedListItems)<ItemProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  width: 60px;
  height: 60px;

  opacity: ${({ isDisabled }): string => (isDisabled ? "0.2" : "1")};
  ${({ isCurrent }): string =>
    isCurrent
      ? ` font-size: 140px;
          line-height: 140px;
          width: 130px;
          height:140px;
          margin-left: 55px;
          `
      : `
      font-size: 22px;
      line-height: 26px;`};
  ${({ isEmpty, isCurrent }): string => (isEmpty || isCurrent ? "" : "&::before{content:'x';}")};
`;

export const ShowX = styled.span`
  font-size: 140px;
  line-height: 140px;
  width: 25px;
  height: 140px;
  position: relative;
  top: 120px;
  left: 15px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  &::before {
    content: "x";
  }
`;
