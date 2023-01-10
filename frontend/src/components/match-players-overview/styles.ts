import styled from "@emotion/styled";

import { GAME_PLAYER_HEIGHT } from "../../constants";
import { color, margins, zIndex } from "../../design";
import { avatarHeight, GeneralText, Heading5, Heading6 } from "../atoms";
import { BadgeWrapper } from "../badges/styles";
import { DieWrapper } from "../die/styles";
import { HandWrapper } from "../hand/styles";
import { DiceIconWrapper } from "../icons/styles";

export const DiceCrownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DiceCrownImg = styled.img`
  width: 90%;
  object-fit: cover;
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
  }
`;

interface MatchPlayersProps {
  isActive?: boolean;
  customColor?: string;
  totalPlayers: number;
}

export const MatchPlayersWrapper = styled.div<MatchPlayersProps>`
  padding: 0px;
  width: 12.5vw;
  background: ${({ isActive, customColor }): string => (isActive ? customColor || color.white : color.lightGrey)};
  height: ${({ totalPlayers }): string => `${GAME_PLAYER_HEIGHT / totalPlayers}vh`};
  position: relative;
  border-bottom: 1px solid ${color.mediumGrey};
  ${BadgeWrapper} {
    z-index: ${zIndex.inFront};
  }
`;

interface OverviewProps {
  isWinner?: boolean;
}

export const MatchPlayersOverviewWrapper = styled.div<OverviewProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  height: ${({ isWinner }) => (isWinner ? "100vh" : `${GAME_PLAYER_HEIGHT}vh`)};
  left: 0px;
  top: 0px;
  border-right: 1px solid ${color.mediumGrey};

  ${MatchPlayersWrapper}:first-of-type {
    border-top: none;
  }
  ${MatchPlayersWrapper}:last-of-type {
    border-bottom: none;
  }
  ${HandWrapper} {
    align-self: center;
  }
`;

interface PlayersColorProps {
  customColor?: string;
}

export const PlayerColor = styled.div<PlayersColorProps>`
  width: ${margins.small4};
  height: ${margins.small4};
  border-radius: 100px;
  min-width: ${margins.small4};
  min-height: ${margins.small4};
  background: ${({ customColor }): string => customColor || color.white};
`;

export const PlayerNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${margins.small1};
`;

interface AvatarProps {
  height: string;
}

interface PlayersAvatarProps {
  isWinner?: boolean;
}

export const PlayerAvatarContainer = styled.div<PlayersAvatarProps>`
  width: 10vw;
  align-items: center;
  justify-content: center;
  display: flex;
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

export const PlayerName = styled(Heading5)`
  width: 13.5vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MatchStateContainer = styled(PlayerNameContainer)`
  align-items: flex-start;
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
  ${DiceIconWrapper} {
    ${GeneralText} {
      margin-top: -5px;
    }
  }
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

export const DiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 14px;
  position: absolute;
  right: 0;
  top: 0;
  width: 2.7vw;
  height: 100%;
  background: ${color.grey};
  z-index: ${zIndex.behind};
  justify-content: center;
  ${Heading6} {
    :first-letter {
      text-transform: none;
    }
  }
`;

export const AmountDice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 14px;
`;
