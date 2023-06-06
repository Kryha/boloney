import styled from "@emotion/styled";
import { BaseColumn, GeneralRow } from "../../atoms";

import { breakpoints, color, containerHeight, containerWidth, layoutWidth, MOBILE_HEIGHT } from "../../design";
import { TopNavigationWrapper } from "../top-navigation";

interface Props {
  isLanding?: boolean;
}

export const BaseLayoutWrapper = styled(GeneralRow)<Props>`
  height: 100%;
  ${TopNavigationWrapper} {
    position: ${({ isLanding }): string => (isLanding ? "absolute " : "relative")};
  }
  @media (max-width: ${breakpoints.md}) {
    height: ${({ isLanding }): string => (isLanding ? containerHeight.fluid : MOBILE_HEIGHT)};
    overflow: hidden;
  }
`;

export const LeftSection = styled.section`
  width: ${layoutWidth.sm};
  height: 100vh;
`;

export const MainSection = styled(BaseColumn)`
  height: ${containerHeight.fluid};
  min-height: 100vh;
  width: ${containerWidth.xxl};
  border-right: 1px solid ${color.mediumGrey};
  border-left: 1px solid ${color.mediumGrey};
  justify-content: space-between;
`;

export const RightSection = styled.section`
  width: ${layoutWidth.md};
  height: 100vh;
`;

export const EqualMainSection = styled(MainSection)`
  width: ${layoutWidth.xl};
`;

export const EqualRightSection = styled(RightSection)`
  width: ${layoutWidth.sm};
  min-height: 100vh;
`;
