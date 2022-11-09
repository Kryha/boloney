import styled from "@emotion/styled";
import { GAME_PLAYER_HEIGHT } from "../../constants";

import { color, margins } from "../../design";
import { avatarHeight, Heading5 } from "../atoms";

interface GamePlayersProps {
  isActive?: boolean;
  customColor?: string;
  totalPlayers: number;
}

export const GamePlayersWrapper = styled.div<GamePlayersProps>`
  padding: 0px;
  width: 12.5vw;
  background: ${({ isActive, customColor }): string => (isActive ? customColor || color.white : color.lightGrey)};
  height: ${({ totalPlayers }): string => `${GAME_PLAYER_HEIGHT / totalPlayers}vh` || "89vh"};
  border-bottom: 1px solid ${color.darkGrey};
  position: relative;
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
  width: 12vw;
  padding-top: ${margins.small2};
  align-items: center;
  justify-content: center;
  display: flex;
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
  gap: ${margins.small1};
  display: flex;
  flex-direction: column;
`;

interface PlayersContainerProps {
  totalPlayers: number;
}

export const GamePlayersContainer = styled.div<PlayersContainerProps>`
  ${({ totalPlayers }) => {
    return totalPlayers === 1
      ? `
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      ${PlayerInfoContainer} {
        position: absolute;
        bottom: ${margins.small2};
        left: 0.425em;
      }
    `
      : `
      position: absolute;
      bottom: 0.325em;
      `;
  }}
`;
