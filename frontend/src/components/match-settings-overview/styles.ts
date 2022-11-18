import styled from "@emotion/styled";
import { margins } from "../../design";

export const MatchSettingsOverviewComponent = styled.section`
  padding: 3.75em;
  max-height: 75.6vh;
  overflow-y: scroll;
`;

export const MatchSettingsFooter = styled.div`
  background: linear-gradient(0deg, #eeeeea 50%, rgba(238, 238, 234, 0) 139.86%);
  border-radius: 0px 0px 10px 10px;
  height: 10vh;
  position: absolute;
  bottom: 0;
`;

export const MatchInfoButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  margin-top: 2.5em;
  margin-bottom: 3.75em;
`;
