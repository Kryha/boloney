import styled from "@emotion/styled";
import { color } from "../../design";
import { HandContainer, HandWrapper } from "../hand/styles";

interface LobbyPlayerProps {
  isWaiting: boolean;
}

export const LobbyPlayerWrapper = styled.div<LobbyPlayerProps>`
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 6px;
  border-top: 1px solid ${color.mediumGrey};
  border-bottom: 1px solid ${color.mediumGrey};
  border-right: 1px solid ${color.mediumGrey};
  width: clamp(150px, 13.13vw + 24px, 276px);
  height: clamp(360px, 21.35vw + 155px, 565px);
  :nth-last-of-type(1) {
   border-right: none;
  }
  ${HandWrapper} {
    margin-top: 45px;
    opacity: ${({ isWaiting }) => isWaiting && "0.4"};
    filter: ${({ isWaiting }) => isWaiting && "blur(1.2px)"};
  }

  ${HandContainer} {
    // width: 14.2854vw;
    // height: 43.1666vh;
    // transform: scale(0.5);
  }
`;
