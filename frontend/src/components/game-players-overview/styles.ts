import styled from "@emotion/styled";

import { GAME_PLAYER_HEIGHT } from "../../constants";
import { color, margins, zIndex } from "../../design";
import { avatarHeight, GeneralText, Heading5 } from "../atoms";
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
  width: 100%;
  object-fit: cover;
`;

export const GameWinnerWrapper = styled.div`
  padding: 0px;
  width: 12.5vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${margins.large1};
`;

interface GamePlayersProps {
  isActive?: boolean;
  customColor?: string;
  totalPlayers: number;
}

export const GamePlayersWrapper = styled.div<GamePlayersProps>`
  padding: 0px;
  width: 12.5vw;
  background: ${({ isActive, customColor }): string => (isActive ? customColor || color.white : color.lightGrey)};
  height: ${({ totalPlayers }): string => `${GAME_PLAYER_HEIGHT / totalPlayers}vh`};
  position: relative;
  border-bottom: 1px solid ${color.darkGrey};
  ${BadgeWrapper} {
    min-width: clamp(69.3px, 7.33vw + -1.05px, 139.65px);
    min-height: clamp(18.48px, 1.95vw + -0.28px, 37.24px);
    z-index: ${zIndex.inFront};
  }
`;

interface OverviewProps {
  isWinner?: boolean;
}

export const GamePlayersOverviewWrapper = styled.div<OverviewProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  height: ${({ isWinner }) => (isWinner ? "100vh" : `${GAME_PLAYER_HEIGHT}vh`)};
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
  padding: 0px ${margins.small2};
  gap: ${margins.small1};
`;

interface AvatarProps {
  height: string;
}

export const PlayerAvatarContainer = styled.div`
  width: 10vw;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 16px;
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

export const GameStateContainer = styled(PlayerNameContainer)`
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

export const GamePlayersContainer = styled.div<PlayersContainerProps>`
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
`;

export const AmountDice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 14px;
`;
