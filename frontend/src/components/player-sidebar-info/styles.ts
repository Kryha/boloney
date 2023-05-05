import styled from "@emotion/styled";

import { color, wrapperSize, zIndex } from "../../design";
import { BaseColumn, RadioInput } from "../../atoms";

interface SidebarInfoContainerProps {
  isLastBid: boolean;
  isTotalPlayers: boolean;
  isTargetable?: boolean;
}

export const PlayerSidebarInfoContainer = styled.div<SidebarInfoContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: clamp(14px, 1.04vw + 4px, 24px);
  position: absolute;
  ${({ isTargetable }) => isTargetable && "cursor: pointer;"}
  right: 0;
  top: 0;
  width: ${wrapperSize.md};
  height: 100%;
  background: ${({ isLastBid }) => (isLastBid ? color.grey : color.transparent)};
  z-index: ${zIndex.behind};
  justify-content: center;
  ${RadioInput} {
    position: absolute;
    bottom: 5px;
  }
  ${({ isLastBid, isTotalPlayers }) =>
    isLastBid
      ? `
        background: ${color.grey};
        ${BaseColumn} {
          margin-top: ${isTotalPlayers ? "-40px" : "0px"};
        }
      `
      : `
        background: ${color.transparent};
        ${BaseColumn} {
          display: none;
        }
      `};
`;
