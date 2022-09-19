import styled from "@emotion/styled";

import { color } from "../../design";
import { TopNavigationSection } from "../top-navigation/styles";

export const BaseLayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
  ${TopNavigationSection} {
    position: relative;
  }
`;

export const LeftSection = styled.section`
  border-right: 1px solid ${color.mediumGrey};
  width: 12.5vw;
  height: 100vh;
`;

export const MainSection = styled.section`
  height: 100vh;
  width: 62.5vw;
  overflow: auto;
`;

export const RightSection = styled.section`
  border-left: 1px solid ${color.mediumGrey};
  width: 25vw;
  height: 100vh;
`;
