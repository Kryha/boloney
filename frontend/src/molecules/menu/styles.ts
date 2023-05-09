import styled from "@emotion/styled";

import { BaseColumn, TertiaryButtonBase } from "../../atoms";
import { color } from "../../design";

interface MenuButtonProps {
  hasDivider?: boolean;
}

export const MenuButtonContainer = styled(BaseColumn)<MenuButtonProps>`
  ${TertiaryButtonBase} {
    border-top: ${({ hasDivider }) => (hasDivider ? `1px solid ${color.mediumGrey}` : "none")};
    border-bottom: 1px solid ${color.mediumGrey};
  }
`;

export const MenuWrapper = styled.div`
  position: absolute;
  right: 0;
  width: max-content;
`;
