import styled from "@emotion/styled";
import { BaseColumn, TertiaryButtonBase } from "../../atoms";
import { color, zIndex } from "../../design";

interface DropdownChildrenProps {
  isHidden: boolean;
}

interface DropdownProps {
  isBorderless?: boolean;
}

export const DropdownContainer = styled(BaseColumn)<DropdownProps>`
  ${TertiaryButtonBase} {
    border-left: ${({ isBorderless }) => (isBorderless ? "none" : `1px solid ${color.mediumGrey}`)};
  }
`;

export const DropdownChildrenContainer = styled.div<DropdownChildrenProps>`
  display: ${({ isHidden }) => (isHidden ? "none" : "block")};
  z-index: ${zIndex.onTop};
`;
