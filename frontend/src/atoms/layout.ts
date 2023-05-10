import styled from "@emotion/styled";

import { color, layoutHeight, layoutWidth } from "../design";
import { getSidebarHeight, switchStyle } from "../util";

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
export const PlayerBox = styled(LayoutBase)`
  width: ${layoutWidth.sm};
  height: ${({ divisors }): string => (divisors ? `${getSidebarHeight(divisors)}vh` : layoutHeight.xxxl)};
`;

export const HUDPlayerBox = styled(HUDBlock)`
  width: ${layoutWidth.sm};
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
