import styled from "@emotion/styled";
import { color } from "../../design";
import { HandWrapper } from "../hand/styles";

interface LobbyPlayerProps {
  isWaiting: boolean;
}

export const LobbyPlayerWrapper = styled.div<LobbyPlayerProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0px;
  gap: 0.375em;
  border-top: 1px solid ${color.mediumGrey};
  border-bottom: 1px solid ${color.mediumGrey};
  border-right: 1px solid ${color.mediumGrey};
  :nth-last-of-type(1) {
    border-right: none;
  }
  ${HandWrapper} {
    margin-top: 2.813em;
    opacity: ${({ isWaiting }) => (isWaiting ? "0.4" : "1")};
    filter: ${({ isWaiting }) => (isWaiting ? "blur(1.2px)" : "blur(0)")};
    height: 35.19vh;
  }
`;
