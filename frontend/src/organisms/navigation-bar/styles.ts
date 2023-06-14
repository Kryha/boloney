import styled from "@emotion/styled";
import { BaseRow, SecondaryButtonBase, TertiaryButtonBase } from "../../atoms";
import { layoutHeight, spacing, zIndex } from "../../design";
import { TopNavigationWrapper } from "../../molecules";

interface Props {
  isMatchOptions?: boolean;
}

export const NavigationWrapper = styled(BaseRow)<Props>`
  z-index: ${zIndex.modal};
  position: fixed;
  top: 0;
  ${SecondaryButtonBase} ${TertiaryButtonBase} {
    max-height: 5.5vh;
  }
  ${({ isMatchOptions }) => (isMatchOptions ? `left: ${spacing.xxxl}` : "right: 0")};
  ${TopNavigationWrapper} {
    position: relative;
  }
`;
