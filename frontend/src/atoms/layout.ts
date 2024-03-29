import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { color, layoutHeight, layoutWidth, spacing } from "../design";
import { getSidebarHeight, switchStyle } from "../util";
import { flash } from "./animations";

interface Props {
  active?: boolean;
  hover?: boolean;
  enabled?: boolean;
  divisors?: number;
  open?: boolean;
}

interface PlayerMenuProps {
  isHoverEnabled?: boolean;
}

interface PlayerBlockProps {
  isSingularPanel?: boolean;
}

interface SidebarPlayerProps {
  playerColor: string;
  selected: boolean;
}

/**
 * This file is for general layouts i.e sidebars and HUDs
 */

const LayoutBase = styled.div<Props>`
  background-color: ${({ active }): string => (active ? color.cloudWhite : color.lightGrey)};
  width: ${layoutWidth.xl};
  height: ${layoutHeight.md};

  :hover {
    ${({ enabled }): string => (enabled ? `background-color: ${color.cloudWhite};` : "")};
    cursor: ${({ hover }): string => (hover ? "pointer" : "cursor")};
  }
`;

export const Sidebar = styled(LayoutBase)`
  width: ${layoutWidth.sm};
  height: ${layoutHeight.xxxl};
`;

export const HUDBlock = styled(LayoutBase)``;

export const PlayerInformationBlock = styled(LayoutBase)`
  width: ${layoutWidth.lg};
`;

// Sidebar player
export const PlayerBox = styled(LayoutBase)<SidebarPlayerProps>`
  width: ${layoutWidth.sm};
  height: ${({ divisors }): string => (divisors ? `${getSidebarHeight(divisors)}vh` : layoutHeight.xxxl)};
  background-color: ${({ active }): string => (active ? color.cloudWhite : color.grey)};
  border-bottom: 1px solid ${color.mediumGrey};
  border-right: 1px solid ${color.mediumGrey};
  border-left: ${spacing.xxs} solid ${({ playerColor }): string => playerColor};
  ${({ selected, playerColor }) =>
    selected &&
    `
      border:${spacing.xxs} solid ${playerColor};
      background-color: ${color.cloudWhite};
   `};

  :hover {
    ${({ enabled, playerColor }): string =>
      enabled
        ? `
          border: 2px solid ${playerColor};
          border-left:${spacing.xxs} solid ${playerColor}; `
        : ""};
    cursor: ${({ hover }): string => (hover ? "pointer" : "cursor")};
  }
`;

interface HUDProps {
  showPowerUpAnimation?: boolean;
}

export const HUDPlayerBox = styled(HUDBlock)<HUDProps>`
  width: ${layoutWidth.sm};
  ${({ showPowerUpAnimation }) =>
    showPowerUpAnimation &&
    css`
      animation: ${flash};
      animation-duration: 0.6s;
      animation-delay: 0s;
      animation-fill-mode: forwards;
    `};
`;

export const PlayerMenuBox = styled(LayoutBase)<PlayerMenuProps>`
  width: ${layoutWidth.md};
  height: ${layoutHeight.sm};
`;

export const PlayerMenuBlock = styled(LayoutBase)<PlayerBlockProps>`
  width: ${layoutWidth.md};
  height: ${({ open, isSingularPanel }): string =>
    open ? switchStyle(layoutHeight.lg, layoutHeight.xxl, isSingularPanel) : layoutHeight.xl};
`;
