import styled from "@emotion/styled";

import { color, zIndex } from "../../design";
import { Heading6, RadioCheckbox } from "../atoms";
import { DiceContainer } from "../match-players-overview/styles";

interface SidebarInfoContainerProps {
  isLastBid: boolean;
  isTotalPlayers: boolean;
}

export const PlayerSidebarInfoContainer = styled.div<SidebarInfoContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: clamp(14px, 1.04vw + 4px, 24px);
  position: absolute;
  right: 0;
  top: 0;
  width: 2.7vw;
  height: 100%;
  background: ${({ isLastBid }) => (isLastBid ? color.grey : "transparent")};
  z-index: ${zIndex.behind};
  justify-content: center;
  ${RadioCheckbox} {
    position: absolute;
    bottom: 5px;
  }
  ${Heading6} {
    :first-letter {
      text-transform: none;
    }
  }
  ${({ isLastBid, isTotalPlayers }) =>
    isLastBid
      ? `
        background: ${color.grey};
        ${DiceContainer} {
          margin-top: ${isTotalPlayers ? "-40px" : "0px"};
        }
      `
      : `
        background: transparent;
        ${DiceContainer} {
          display: none;
        }
      `};
`;
