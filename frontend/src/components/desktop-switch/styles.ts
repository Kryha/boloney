import styled from "@emotion/styled";

import { BaseColumn } from "../../atoms";
import { color, mobileWidth, spacing, zIndex } from "../../design";

export const DesktopSwitchWrapper = styled.div``;

export const MobileColumn = styled(BaseColumn)`
  padding: 0px ${spacing.sm} 0px ${spacing.md};
  position: relative;
  z-index: ${zIndex.inFront};
`;

export const TextLogoContainer = styled.div`
  padding: ${spacing.s};
  position: absolute;
  left: 0;
  width: ${mobileWidth.xs};
  background: ${color.lightGrey};
  cursor: pointer;
`;

export const MobileContainerWrapper = styled(BaseColumn)`
  height: 100vh;
  max-height: 100%;
`;
