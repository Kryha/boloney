import styled from "@emotion/styled";

import { color } from "../../design";
import { GamePlayersWrapper } from "../game-player/styles";

export const GamePlayersOverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  height: 100vh;
  left: 0px;
  top: 0px;
  border-right: 1px solid ${color.darkGrey};
  ${GamePlayersWrapper}:first-of-type {
    border-top: none;
  }
  ${GamePlayersWrapper}:last-of-type {
    border-bottom: none;
  }
`;
