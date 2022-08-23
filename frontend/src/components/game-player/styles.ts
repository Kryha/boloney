import styled from "styled-components";

import { color } from "../../design";
import { Heading4 } from "../atoms";

interface GamePlayersProps {
  isActive?: boolean;
  customColor?: string;
}

export const GamePlayersWrapper = styled.div<GamePlayersProps>`
  padding: 0px;
  width: 12.5vw;
  ${({ isActive, customColor }): string => {
    return isActive
      ? `
        background: ${customColor};
        `
      : `
      background: ${color.white};
      `;
  }};
  border-top: 0.5px solid ${color.black};
  border-bottom: 0.5px solid ${color.black};
  height: 100vh;
`;

export const PlayerColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  min-width: 16px;
  min-height: 16px;
  ${({ customColor }): string => `background: ${customColor || color.black};`};
`;

export const PlayerNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 10px;
  gap: 8px;
  ${Heading4} {
    width: 13.5vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

interface AvatarProps {
  height: string;
}

export const PlayerAvator = styled.img<AvatarProps>`
  width: 12.5vw;
  ${({ height }): string => `height: ${height || "10.5vh"};`};
  object-fit: contain;
`;
