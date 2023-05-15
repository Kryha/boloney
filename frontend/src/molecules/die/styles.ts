import styled from "@emotion/styled";
import { BaseColumn, BaseGrid, BaseIcon, BaseIconWrapper, BaseRow, DiceIconWrapper, fadeInPop } from "../../atoms";
import { dieSizes, opacity, radius, shadows, spacing } from "../../design";

export const TemporaryIconWrapper = styled(BaseIcon)``;

interface TemporaryDiceWrapperProps {
  height?: string;
  width?: string;
}

export const TemporaryDiceWrapper = styled(BaseColumn)<TemporaryDiceWrapperProps>`
  width: ${({ width }): string => width ?? "70px"};
  height: ${({ height }): string => height ?? "70px"};
  ${BaseIconWrapper} {
    position: relative;
    bottom: 30%;
    left: 9%;
  }
`;

export const DieWrapper = styled.div``;

interface DieProps {
  isSelected: boolean;
  disabled?: boolean;
}

export const DieSelectionGrid = styled(BaseGrid)`
  position: relative;
  max-width: ${dieSizes.maxWidth};
  ${DieWrapper} {
    cursor: pointer;
    min-height: ${dieSizes.minHeight};
  }
  bottom: 1vh;
`;

export const DieSelectionWrapper = styled(BaseRow)<DieProps>`
  opacity: ${({ disabled }): string => (disabled ? "0.1" : "1")};
  box-sizing: border-box;
  width: ${dieSizes.selectedDie};
  height: ${dieSizes.selectedDie};
  border-radius: ${dieSizes.borderRadius};
  box-shadow: ${({ isSelected, disabled }): string => (isSelected && !disabled ? shadows.lg : "none")};
  :hover {
    ${DiceIconWrapper} {
      svg {
        cursor: ${({ disabled }): string => (disabled ? "arrow" : "pointer")};
      }
      box-shadow: ${shadows.lg};
      border-radius: ${radius.sm}};
    }
  }
`;

interface DiceRowWarpperProps {
  isDubbleRow?: boolean;
}

export const DiceGridWrapper = styled(BaseGrid)<DiceRowWarpperProps>`
  margin-left: ${spacing.xs};

  ${DieWrapper} {
    animation-name: ${fadeInPop};
    animation-timing-function: cubic-bezier(0.4, -0.38, 1, 1.92);
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }
  ${DieWrapper}:nth-of-type(1) {
    animation-delay: 0s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(2) {
    animation-delay: 0.1s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(3) {
    animation-delay: 0.2s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(4) {
    animation-delay: 0.3s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(5) {
    animation-delay: 0.4s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(6) {
    animation-delay: 0.5s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(7) {
    animation-delay: 0.6s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(8) {
    animation-delay: 0.7s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(9) {
    animation-delay: 0.8s;
    opacity: ${opacity.hidden};
  }
  ${DieWrapper}:nth-of-type(10) {
    animation-delay: 0.9s;
    opacity: ${opacity.hidden};
  }
`;
