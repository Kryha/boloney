import styled from "@emotion/styled";
import { BaseColumn } from "../../atoms";
import { color, containerHeight, opacity } from "../../design";

interface Props {
  isWaiting?: boolean;
}

export const LobbyPlayerWrapper = styled(BaseColumn)`
  flex: 1;
  border-right: 1px solid ${color.mediumGrey};
  :nth-last-of-type(1) {
    border-right: none;
  }

  height: ${containerHeight.fluid};
`;

export const LobbyPlayerContainer = styled(BaseColumn)<Props>`
  opacity: ${({ isWaiting }) => (isWaiting ? opacity.background : opacity.visible)};
  filter: ${({ isWaiting }) => (isWaiting ? "blur(1.2px)" : "blur(0)")};
`;
