import styled from "@emotion/styled";

import { CopyBlock } from "../../atoms";
import { color, opacity, spacing } from "../../design";

interface Props {
  isDisabled?: boolean;
}

export const WalletPillContainer = styled(CopyBlock)<Props>`
  padding: ${spacing.s};
  ${({ isDisabled }) =>
    isDisabled
      ? `
      background: ${color.transparent};
      box-shadow: none;
      opacity: ${opacity.background};
      backdrop-filter: blur(5px);
  `
      : `background:${color.cloudWhite};`};
`;
