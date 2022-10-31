import styled from "@emotion/styled";

import { color, margins } from "../../design";
import { avatarHeight, Heading5 } from "../atoms";

interface GamePlayersProps {
  isActive?: boolean;
  customColor?: string;
  playersAmount: number;
}

export const GamePlayersWrapper = styled.div<GamePlayersProps>`
  padding: 0px;
  width: 12.5vw;
  background: ${({ isActive, customColor }): string => (isActive ? customColor || color.white : color.lightGrey)};
  height: ${({ playersAmount }): string => `${89 / playersAmount}vh` || "89vh"};
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
  playersAmount: number;
}

export const PlayerAvatarContainer = styled.div<AvatarProps>`
  width: 12.5vw;
  // height: ${({ playersAmount }): string => `${89 / playersAmount}vh` || "89vh"};
  padding-top: 0.625em;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const PlayerAvatar = styled.img<AvatarProps>`
  height: ${({ height }): string => height || `${avatarHeight[5]}`};
  object-fit: contain;
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

export const PlayerInfoContainer = styled.section``;

export const GamePlayersContainer = styled.div<AvatarProps>`
  ${({ playersAmount }) => {
    return playersAmount != 1
      ? `
      position: absolute;
      bottom: 0.325em;
    `
      : `
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      ${PlayerInfoContainer} {
        position: absolute;
        bottom: 0.625em;
        left: 0.425em;
      }
      `;
  }}
`;
