import styled from "@emotion/styled";
import { breakpoints, color, FontProps, opacity } from "../../design";
import { Heading1 } from "../atoms";

import { DieWrapper } from "../die/styles";

export const selectorDieSize = {
  idle: "clamp(66px, 6.98vw + -1px, 133px)",
  selected: "clamp(70px, 7.6vw + -3px, 143px)",
};

export const DiceSelectorWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const DiceSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3vw;
`;

export const FaceContainer = styled.div`
  width: clamp(260px, 25vw + 20px, 500px);
`;

export const PlayerDiceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-column-gap: clamp(40px, 4.17vw + 0px, 80px);
  max-width: clamp(240px, 25vw + 0px, 480px);
  ${DieWrapper} {
    min-height: clamp(66px, 6.98vw + -1px, 133px);
    > svg {
      border-radius: 8px;
    }
  }
`;

export const DiceContainer = styled.div`
  position: relative;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;
  display: grid;
  max-width: clamp(240px, 25vw + 0px, 480px);
  ${DieWrapper} {
    min-height: clamp(66px, 6.98vw + -1px, 133px);
    > svg {
      border-radius: 8px;
    }
  }
  bottom: 1vh;
`;

export interface DieProps {
  isSelected: boolean;
  disabled?: boolean;
}

export const Die = styled.div<DieProps>`
  cursor: ${({ disabled }): string => (disabled ? "arrow" : "pointer")};
  opacity: ${({ disabled }): string => (disabled ? "0.1" : "1")};
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0.6vw 0.3vw;
  width: clamp(70px, 7.6vw + -3px, 143px);
  border-radius: 8px;
  -webkit-appearance: none;
  -webkit-box-shadow: ${({ isSelected, disabled }): string =>
    isSelected && !disabled ? "0px 0px 10px rgba(0, 0, 0, 0.16), 0px 0px 30px rgba(0, 0, 0, 0.4)" : "none"};
  box-shadow: ${({ isSelected, disabled }): string =>
    isSelected && !disabled ? "0px 0px 10px rgba(0, 0, 0, 0.16), 0px 0px 30px rgba(0, 0, 0, 0.4)" : "none"};
  :hover {
    ${DieWrapper} {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16), 0px 0px 30px rgba(0, 0, 0, 0.4);
      -webkit-box-shadow: 0px 0px 10px rgb(0 0 0 / 16%), 0px 0px 30px rgb(0 0 0 / 40%);
      border-radius: 8px;
      -webkit-appearance: none;
    }
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
  opacity: ${({ disabled }): string => (disabled ? opacity.hidden : opacity.visible)};
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
  height: FontProps;
}

export const Number = styled(Heading1)<ItemProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  height: ${({ height }): string => height.md};
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.md}) {
    height: ${({ height }): string => height.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    height: ${({ height }): string => height.lg};
  }

  opacity: ${({ isDisabled }): string => (isDisabled ? opacity.transparent : opacity.visible)};
  ${({ isCurrent }): string => (isCurrent ? "" : `color: ${color.darkGrey};`)};
`;
