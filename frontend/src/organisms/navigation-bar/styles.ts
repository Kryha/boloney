import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";
import { spacing } from "../../design";
import { TopNavigationWrapper } from "../../molecules";

interface Props {
  isMatchOptions?: boolean;
}

export const NavigationWrapper = styled(BaseRow)<Props>`
  position: fixed;
  top: 0;
  ${({ isMatchOptions }) => (isMatchOptions ? `left: ${spacing.md}` : "right: 0")};
  ${TopNavigationWrapper} {
    position: relative;
  }
`;
