import styled from "@emotion/styled";
import { Heading1 } from "../../components";
import { color, margins } from "../../design";

export const GameName = styled(Heading1)`
  color: transparent;
  -webkit-text-stroke: 1px ${color.black};
  font-size: 24.5vw;
  position: absolute;
  bottom: clamp(3.75rem, 3.13vw + 1.88rem, 5.63rem);
  margin-left: 19px;
`;
export const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LobbyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LobbyLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.29vw + -6px, 38px);
  width: 100%;
  background: linear-gradient(to right, ${color.mediumGrey} 1px, transparent 1px);
  background-size: clamp(16px, 2.29vw + -6px, 38px);
`;

export const LobbyHorizontalLine = styled.div`
  height: 1px;
  border-bottom: 1px solid ${color.mediumGrey};
  width: 100%;
`;

export const LobbyHorizontalLineInitial = styled.div`
  height: 1px;
  border-bottom: 1px solid ${color.lightGrey};
  width: 100%;
`;

export const LobbyVerticalLineInitial = styled.div`
  height: 1px;
  border-right: 1px solid ${color.lightGrey};
  width: 100%;
`;

export const LobbyVerticalLine = styled.div`
  width: 1px;
  border-right: 1px solid ${color.mediumGrey};
  height: 45vh;
  margin-left: 57vw;
`;

export const WaitForOthersContainer = styled.div`
  background: ${color.lightGrey};
  position: absolute;
  padding: ${margins.small2} ${margins.small2} ${margins.small2} 1.5em;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  width: 358.5px;
  height: clamp(34px, 4.58vw + -10px, 78px);
  display: flex;
  align-items: center;
`;

export const WaitingText = styled.h3`
  font-family: ibm-plex-mono;
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 16px;
  color: ${color.black};
  margin-top: clamp(0px, 3.13vw + -30px, 30px);
  :first-letter {
    text-transform: capitalize;
  }
`;
