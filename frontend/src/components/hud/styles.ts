import styled from "@emotion/styled";

import { color, margins, zIndex } from "../../design";
import { avatarHeight, RadioCheckbox } from "../atoms";
import { DiceContainer, PlayerInfoContainer } from "../match-players-overview/styles";

interface PlayerOverviewProps {
  isActive: boolean;
}

export const PlayerOverview = styled.section<PlayerOverviewProps>`
  background-color: ${({ isActive }): string => (isActive ? color.cloudWhite : color.transparent)};
  border-top: 1px solid ${color.mediumGrey};
  width: 75vw;
  height: 11vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: ${zIndex.modal};
`;

interface LocalPlayerProps {
  isLastBid: boolean;
  isTargetable: boolean;
}

export const LocalPlayerAvatar = styled.img<AvatarProps>`
  height: ${({ height }): string => height || `${avatarHeight[5]}`};
  object-fit: contain;
  width: 100%;
`;

export const LocalPlayerInfoContainer = styled(PlayerInfoContainer)`
  padding-bottom: 0.5vh;
  left: 0.425em;
`;

export const LocalPlayer = styled.div<LocalPlayerProps>`
  width: 12.5vw;
  height: 100%;
  padding: 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  ${RadioCheckbox} {
    margin-left: 10vw;
    margin-bottom: -6vh;
    position: absolute;
  }
  ${DiceContainer} {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: clamp(14px, 1.04vw + 4px, 24px);
    position: absolute;
    right: 0;
    top: 0;
    width: 2.7vw;
    height: 100%;
    background: ${({ isLastBid }): string => (isLastBid ? color.grey : "transparent")};
    justify-content: center;
  }
`;

interface AvatarProps {
  height: string;
}

export const PlayerAvatar = styled.img<AvatarProps>`
  height: ${({ height }): string => height || `${avatarHeight[5]}`};
  object-fit: contain;
  margin-top: ${margins.small2};
  width: 100%;
`;
