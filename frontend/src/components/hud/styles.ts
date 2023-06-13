import styled from "@emotion/styled";

import { AVATAR_IMAGE_WRAPPER_WIDTH, color, containerWidth, layoutHeight, PLAYER_NAME_WIDTH, spacing, zIndex } from "../../design";
import { BaseColumn, BaseRow, Heading5, PlayerBox } from "../../atoms";
import { AvatarWrapper, PlayerBidWrapper } from "../../molecules";

interface PlayerOverviewProps {
  isActive: boolean;
}

// TODO: fix the rest of the hud styles when implementing hud
export const PlayerOverview = styled.section<PlayerOverviewProps>`
  background-color: ${({ isActive }): string => (isActive ? color.cloudWhite : color.grey)};
  border-top: 1px solid ${color.mediumGrey};
  width: 75vw;
  height: ${layoutHeight.md};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  max-height: ${layoutHeight.md};
  overflow: hidden;
  z-index: ${zIndex.modal};
  ${PlayerBox} {
    border-right: none;
  }
  ${PlayerBidWrapper} {
    height: ${layoutHeight.md};
  }
`;

export const PlayerBadgeWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: ${zIndex.cookieBanner};
`;

export const HudPlayerWrapper = styled(BaseColumn)`
  height: ${layoutHeight.md};
  width: ${containerWidth.fluid};
  padding: ${spacing.xs};
  padding-left: 0px;
  padding-bottom: 0px;
  ${AvatarWrapper} {
    width: ${AVATAR_IMAGE_WRAPPER_WIDTH};
  }
`;

export const HudPlayerContainer = styled(BaseRow)`
  width: ${containerWidth.fluid};
`;

export const PlayerName = styled(Heading5)`
  width: ${PLAYER_NAME_WIDTH};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: ${spacing.s};
  padding-bottom: ${spacing.xs};
`;
