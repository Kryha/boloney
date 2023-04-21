import { css } from "@emotion/react";
import styled from "@emotion/styled";

import {
  playerOnePercentages,
  playerTwoPercentages,
  playerThreePercentages,
  playerFourPercentages,
  playerFivePercentages,
  playerSixPercentages,
} from "../../assets";
import { FLOATING_ANIMATION_SPEED } from "../../constants";

import { color, margins, zIndex } from "../../design";
import { avatarHeight, BaseColumn, float, Heading5, shuffle } from "../../atoms";
import { BadgeWrapper } from "../badges/styles";
import { DieWrapper } from "../die/styles";
import { HandWrapper } from "../hand/styles";
import { DiceIconWrapper } from "../icons";
import { PlayerSidebarInfoContainer } from "../player-sidebar-info";

const GAME_PLAYER_HEIGHT = 89;

export const DiceCrownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  speed?: number;
}

export const DiceCrownImg = styled.img<Props>`
  width: 300%;
  height: auto;
  object-fit: cover;
  flex-shrink: 0;
  position: relative;
  top: 0px;

  animation: ${({ speed }) => {
    return css`
      ${float} ease ${speed || FLOATING_ANIMATION_SPEED}s infinite;
    `;
  }};
`;

export const MatchWinnerWrapper = styled.div`
  padding: 0px;
  width: 12.5vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${DiceIconWrapper} {
    justify-content: center;
    height: clamp(89.81px, 9.5vw + -1.36px, 180.97px);
  }
`;

interface MatchPlayersProps {
  isActive?: boolean;
  customcolor?: string;
  hasPlayerLost: boolean;
  isTargetable: boolean;
}

export const MatchPlayersWrapper = styled.div<MatchPlayersProps>`
  padding: 0px;
  width: 12.5vw;
  background: ${({ isActive, customcolor }): string => (isActive ? customcolor || color.cloudWhite : color.lightGrey)};
  height: ${({ hasPlayerLost }): string => (hasPlayerLost ? "100px" : `${GAME_PLAYER_HEIGHT}vh`)};
  position: relative;
  border-bottom: 1px solid ${color.mediumGrey};
  ${BadgeWrapper} {
    z-index: ${zIndex.inFront};
  }
  :hover {
    background: ${({ isTargetable }): string => (isTargetable ? color.cloudWhite : "")};
    ${PlayerSidebarInfoContainer} {
      background: ${({ isTargetable }): string => (isTargetable ? color.cloudWhite : "")};
    }
  }
`;

interface OverviewProps {
  isWinner?: boolean;
  isShuffling: boolean;
  isOnePlayer?: boolean;
  isEndOfMatch?: boolean;
  areDeadPlayers?: boolean[];
}

export const MatchPlayersOverviewWrapper = styled.div<OverviewProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  height: ${({ isEndOfMatch }) => (isEndOfMatch ? "100vh" : `${GAME_PLAYER_HEIGHT}vh`)};
  left: 0px;
  top: 0px;
  border-right: 1px solid ${color.mediumGrey};

  ${MatchPlayersWrapper} {
    animation-duration: 5.5s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    transform-origin: bottom;
  }

  ${MatchPlayersWrapper}:first-of-type {
    border-top: none;
  }
  ${MatchPlayersWrapper}:last-of-type {
    border-bottom: none;
  }
  ${HandWrapper} {
    align-self: center;
  }

  ${MatchPlayersWrapper}:nth-of-type(1) {
    animation-name: ${({ isShuffling, isOnePlayer, areDeadPlayers }) =>
      isShuffling && !isOnePlayer && areDeadPlayers && !areDeadPlayers[0] ? shuffle(playerOnePercentages) : null};
    animation-delay: 0s;
  }
  ${MatchPlayersWrapper}:nth-of-type(2) {
    animation-name: ${({ isShuffling, areDeadPlayers }) =>
      isShuffling && areDeadPlayers && !areDeadPlayers[1] ? shuffle(playerTwoPercentages) : null};
    animation-delay: 0.1s;
  }
  ${MatchPlayersWrapper}:nth-of-type(3) {
    animation-name: ${({ isShuffling, areDeadPlayers }) =>
      isShuffling && areDeadPlayers && !areDeadPlayers[2] ? shuffle(playerThreePercentages) : null};
    animation-delay: 0.2s;
  }
  ${MatchPlayersWrapper}:nth-of-type(4) {
    animation-name: ${({ isShuffling, areDeadPlayers }) =>
      isShuffling && areDeadPlayers && !areDeadPlayers[3] ? shuffle(playerFourPercentages) : null};
    animation-delay: 0.3s;
  }
  ${MatchPlayersWrapper}:nth-of-type(5) {
    animation-name: ${({ isShuffling, areDeadPlayers }) =>
      isShuffling && areDeadPlayers && !areDeadPlayers[4] ? shuffle(playerFivePercentages) : null};
    animation-delay: 0.4s;
  }
  ${MatchPlayersWrapper}:nth-of-type(6) {
    animation-name: ${({ isShuffling }) => (isShuffling ? shuffle(playerSixPercentages) : null)};
    animation-delay: 0.5s;
  }
`;

interface PlayersColorProps {
  customcolor?: string;
}

export const PlayerColor = styled.div<PlayersColorProps>`
  width: ${margins.small4};
  height: ${margins.small4};
  border-radius: 100px;
  min-width: ${margins.small4};
  min-height: ${margins.small4};
  background: ${({ customcolor }): string => customcolor || color.cloudWhite};
`;

export const PlayerNameContainer = styled(Heading5)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${margins.small1};
  line-height: normal;
`;

interface AvatarProps {
  height: string;
}

interface PlayersAvatarProps {
  isWinner?: boolean;
  isTargetable?: boolean;
}

export const PlayerAvatarContainer = styled.div<PlayersAvatarProps>`
  width: 10vw;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: ${({ isTargetable }): string => (isTargetable ? "pointer" : "default")};
  ${({ isWinner }): string =>
    isWinner
      ? ""
      : `
      position: absolute;
      height: 100%;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
      transition: all 3s ease-in-out;
  `};
`;

export const PlayerAvatar = styled.img<AvatarProps>`
  height: ${({ height }): string => height || `${avatarHeight[5]}`};
  object-fit: contain;
  width: 100%;
`;

export const DeadPlayerAvatar = styled(PlayerAvatar)<AvatarProps>`
  position: absolute;
  right: 40%;
`;

export const PlayerName = styled(Heading5)`
  width: 13.5vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DeadPlayerName = styled(PlayerName)`
  display: flex;
  justify-content: center;
  position: relative;
  width: 15vh;
`;

export const MatchStateContainer = styled(PlayerNameContainer)`
  position: relative;
  z-index: ${zIndex.inFront};
  align-items: center;
`;

export const PlayerInfoContainer = styled.section`
  gap: ${margins.small0};
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  ${DieWrapper} {
    margin-top: 0 !important;
  }
  padding-left: 0.62em;
`;

interface PlayersContainerProps {
  totalPlayers: number;
}

export const MatchPlayersContainer = styled.div<PlayersContainerProps>`
  z-index: ${zIndex.background};
  height: 14.4vh;
  ${({ totalPlayers }) => {
    return totalPlayers === 1
      ? `
      display: flex;
      height: 100%;
      justify-content: center;
      flex-direction: column;
      ${PlayerInfoContainer} {
        position: absolute;
        bottom: ${margins.small2};
        left: 0.425em;
      }
    `
      : "";
  }}
`;

export const AmountDice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 14px;
`;

export const DiceContainer = styled(BaseColumn)`
  gap: 14px;
`;
