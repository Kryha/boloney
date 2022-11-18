import styled from "@emotion/styled";

import { GAME_PLAYER_HEIGHT } from "../../constants";
import { color } from "../../design";
import { GamePlayersWrapper } from "../game-player/styles";
import { HandWrapper } from "../hand/styles";

export const GamePlayersOverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  height: ${GAME_PLAYER_HEIGHT}vh;
  left: 0px;
  top: 0px;
  border-right: 1px solid ${color.darkGrey};
  ${GamePlayersWrapper}:first-of-type {
    border-top: none;
  }
  ${GamePlayersWrapper}:last-of-type {
    border-bottom: none;
  }
  ${HandWrapper} {
    align-self: center;
  }
`;
