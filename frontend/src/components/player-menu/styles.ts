import styled from "@emotion/styled";

import { color, margins } from "../../design";

export const PlayerMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 75vw;
`;

export const PlayerMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${margins.small1};
  width: 25vw;
  height: 60px;
  background: transparent;
  border-top: 1px solid ${color.black};
  border-bottom: 1px solid ${color.black};
`;
