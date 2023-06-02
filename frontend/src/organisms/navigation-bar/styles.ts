import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";
import { TopNavigationWrapper } from "../../molecules";

export const NavigationWrapper = styled(BaseRow)`
  position: fixed;
  top: 0;
  right: 0;
  ${TopNavigationWrapper} {
    position: relative;
  }
`;
