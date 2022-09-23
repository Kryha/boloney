import styled from "@emotion/styled";

import { color, margins } from "../../design";
import { avatarHeight, Heading5 } from "../atoms";

interface GamePlayersProps {
  isActive?: boolean;
  customColor?: string;
}

export const GamePlayersWrapper = styled.div<GamePlayersProps>`
  padding: 0px;
  width: 12.5vw;
  background: ${({ isActive, customColor }): string => (isActive ? (customColor || color.white) : (color.lightGrey))};
  height: 14.28vh;
  border-bottom: 1px solid ${color.darkGrey};
`;

export const PlayerColor = styled.div<GamePlayersProps>`
  width: ${margins.small4};
  height: ${margins.small4};
  border-radius: 100px;
  min-width:  ${margins.small4};
  min-height:  ${margins.small4};
  background: ${({ customColor }): string => (customColor || color.white)};
`;

export const PlayerNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px ${margins.small2};
  gap: ${margins.small1};
  margin-top: -${margins.small4};
`;

interface AvatarProps {
  height: string;
}

export const PlayerAvatar = styled.img<AvatarProps>`
  width: 12.5vw;
  height: ${({ height }): string => (height || `${avatarHeight[5]}`)};
  object-fit: contain;
  margin-top: ${margins.small4};
`;

export const PlayerName = styled(Heading5)`
  width: 13.5vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
