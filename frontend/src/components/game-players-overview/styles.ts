import styled from "@emotion/styled";

import { color } from "../../design";
import { GamePlayersWrapper } from "../game-player/styles";
import { HandWrapper } from "../hand/styles";

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
  ${HandWrapper} {
    align-self: center;
  }
`;

export const GamePlayersHandWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  padding: 0px;
  justify-content: center;
  position: absolute;
  height: 100vh;
  left: 0px;
  top: 0px;
  border-right: 1px solid ${color.darkGrey};
  width: 12.5vw;
  ${HandWrapper} {
    align-self: center;
  }
`;
