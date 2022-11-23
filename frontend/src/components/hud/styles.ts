import styled from "@emotion/styled";

import { color, margins } from "../../design";
import { avatarHeight } from "../atoms";

interface PlayerOverviewProps {
  isActive: boolean;
}

export const PlayerOverview = styled.section<PlayerOverviewProps>`
  background-color: ${({ isActive }): string => (isActive ? color.white : "transparent")};
  border-top: 1px solid ${color.darkGrey};
  width: 75vw;
  height: 11vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const LocalPlayer = styled.div`
  width: 12.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${margins.small2};
`;

interface AvatarProps {
  height: string;
}

export const PlayerAvatar = styled.img<AvatarProps>`
  height: ${({ height }): string => height || `${avatarHeight[5]}`};
  object-fit: contain;
  width: 100%;
`;
