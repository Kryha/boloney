import styled from "@emotion/styled";

import { color } from "../../design";
import { TopNavigationSection } from "../top-navigation/styles";

export const BaseLayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
  ${TopNavigationSection} {
    position: relative;
  }
`;

export const LeftSection = styled.section`
  width: 12.5vw;
  height: 100vh;
`;

export const MainSection = styled.section`
  height: 100%;
  min-height: 100vh;
  width: 62.5vw;
  border-right: 1px solid ${color.mediumGrey};
  border-left: 1px solid ${color.mediumGrey};
`;

export const RightSection = styled.section`
  width: 25vw;
  height: 100vh;
`;
