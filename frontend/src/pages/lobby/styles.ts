import styled from "@emotion/styled";
import { Heading1 } from "../../components";
import { color } from "../../design";

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
  gap: 36px;
  width: 100%;
  background: linear-gradient(to right, ${color.mediumGrey} 1px, transparent 1px);
  background-size: 36px;
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

export const LobbyVerticalLine = styled.div`
  height: 1px;
  border-right: 1px solid ${color.mediumGrey};
  width: 100%;
`;

export const LobbyVerticalLineInitial = styled.div`
  height: 1px;
  border-right: 1px solid ${color.lightGrey};
  width: 100%;
`;

export const WaitForOthersContainer = styled.div`
  background: ${color.lightGrey};
  position: absolute;
  padding: 16px 16px 16px 24px;
  margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
text-align: center;
width: 358.5px;
height: 74px;
`;

export const WaitingText = styled.h3`
  font-family: ibm-plex-mono;
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 16px;
  color: #292929;
  margin-top: 10px;
`;
