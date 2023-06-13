import styled from "@emotion/styled";
import { PlayerBox, shuffle, Sidebar } from "../../atoms";
import {
  playerOnePercentages,
  playerTwoPercentages,
  playerThreePercentages,
  playerFourPercentages,
  playerFivePercentages,
  playerSixPercentages,
} from "../../assets";

interface Props {
  isShuffling: boolean;
  isOnePlayer?: boolean;
  isEndOfMatch?: boolean;
  areDeadPlayers?: boolean[];
}

export const MatchSideBarWrapper = styled(Sidebar)<Props>`
  ${PlayerBox} {
    animation-duration: 5.5s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    transform-origin: bottom;
  }
  ${PlayerBox}:last-of-type {
    border-bottom: none;
  }
  ${PlayerBox}:nth-of-type(1) {
    animation-name: ${({ isShuffling, isOnePlayer, areDeadPlayers }) =>
      isShuffling && !isOnePlayer && areDeadPlayers && !areDeadPlayers[0] ? shuffle(playerOnePercentages) : null};
    animation-delay: 0s;
  }
  ${PlayerBox}:nth-of-type(2) {
    animation-name: ${({ isShuffling, areDeadPlayers }) =>
      isShuffling && areDeadPlayers && !areDeadPlayers[1] ? shuffle(playerTwoPercentages) : null};
    animation-delay: 0.1s;
  }
  ${PlayerBox}:nth-of-type(3) {
    animation-name: ${({ isShuffling, areDeadPlayers }) =>
      isShuffling && areDeadPlayers && !areDeadPlayers[2] ? shuffle(playerThreePercentages) : null};
    animation-delay: 0.2s;
  }
  ${PlayerBox}:nth-of-type(4) {
    animation-name: ${({ isShuffling, areDeadPlayers }) =>
      isShuffling && areDeadPlayers && !areDeadPlayers[3] ? shuffle(playerFourPercentages) : null};
    animation-delay: 0.3s;
  }
  ${PlayerBox}:nth-of-type(5) {
    animation-name: ${({ isShuffling, areDeadPlayers }) =>
      isShuffling && areDeadPlayers && !areDeadPlayers[4] ? shuffle(playerFivePercentages) : null};
    animation-delay: 0.4s;
  }
  ${PlayerBox}:nth-of-type(6) {
    animation-name: ${({ isShuffling }) => (isShuffling ? shuffle(playerSixPercentages) : null)};
    animation-delay: 0.5s;
  }
`;
