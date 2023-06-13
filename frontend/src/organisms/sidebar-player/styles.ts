import styled from "@emotion/styled";
import { BaseColumn, BaseRow, Heading5 } from "../../atoms";
import { color, containerHeight, containerWidth, PLAYER_NAME_WIDTH, spacing, wrapperSize, zIndex } from "../../design";
import { AvatarWrapper } from "../../molecules";

export const SidebarPlayerWrapper = styled(BaseRow)`
  height: ${containerHeight.fluid};
  width: ${containerWidth.fluid};
  padding: ${spacing.xs};
  padding-left: 0px;
  padding-bottom: 0px;
  ${AvatarWrapper} {
    width: ${wrapperSize.xs};
    height: ${containerHeight.fluid};
  }
`;

export const PlayerName = styled(Heading5)`
  width: ${PLAYER_NAME_WIDTH};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: ${spacing.s};
  padding-bottom: ${spacing.xs};
`;

interface Props {
  selected?: boolean;
}

export const PlayerInformationWrapper = styled(BaseRow)<Props>`
  padding: ${spacing.xs} ${spacing.s};
  background: ${color.lightGrey};
  width: ${containerWidth.fluid};
  height: fit-content;
  ${({ selected }) =>
    selected &&
    `
   background-color: ${color.cloudWhite};
   `};
`;

export const PlayerWrapper = styled(BaseRow)`
  height: ${containerHeight.fluid};
`;

export const PlayerContainer = styled(BaseColumn)`
  position: relative;
  width: ${containerWidth.fluid};
  height: ${containerHeight.fluid};
`;

export const SideBarPlayerContainer = styled(BaseRow)`
  position: relative;
`;

export const SideBarItem = styled(BaseColumn)`
  width: ${containerWidth.fluid};
  height: ${containerHeight.fluid};
`;

export const PlayerBadgeWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: ${zIndex.cookieBanner};
`;
