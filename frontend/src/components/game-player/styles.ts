import styled from "styled-components";

import { color, margins } from "../../design";
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
  width: ${margins.small2};
  height: ${margins.small2};
  border-radius: 100px;
  min-width:  ${margins.small2};
  min-height:  ${margins.small2};
  ${({ customColor }): string => `background: ${customColor || color.black};`};
`;

export const PlayerNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px ${margins.small1};
  gap: ${margins.small0};
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
