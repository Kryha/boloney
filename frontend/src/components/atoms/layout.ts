import styled from "@emotion/styled";

import { color, layoutHeight, layoutWidth } from "../../design";
import { getSidebarHeight } from "../../util";

interface Props {
  active?: boolean;
  hover?: boolean;
  enabled?: boolean;
  divisors?: number;
  open?: boolean;
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
  height: ${({ divisors }): string => (divisors ? `${getSidebarHeight(divisors)}vh` : layoutHeight.xl)};
`;

export const HUDBlock = styled(LayoutBase)``;

export const PlayerInformationBlock = styled(LayoutBase)`
  width: ${layoutWidth.lg};
`;

export const PlayerBox = styled(LayoutBase)`
  width: ${layoutWidth.sm};
`;

export const PlayerMenuBox = styled(LayoutBase)`
  width: ${layoutWidth.md};
  height: ${layoutHeight.sm};
  cursor: pointer;
`;

export const PlayerMenuBlock = styled(LayoutBase)`
  width: ${layoutWidth.md};
  height: ${({ open }): string => (open ? layoutHeight.xl : layoutHeight.lg)};
`;
