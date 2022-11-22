import styled from "@emotion/styled";
import { BoloneyIcon } from "../../assets";
import { HorizontalDivider } from "../../components";
import { MEDIUM_VIEWPORT_WIDTH, SMALL_VIEWPORT_HEIGHT } from "../../constants";
import { color, margins } from "../../design";
import { ViewProps } from "../../types";
import { PrimaryButtonWrapper } from "../buttons/styles";
import { ChatSection } from "../chat/styles";
import { HandWrapper } from "../hand/styles";
import { LobbyPlayerWrapper } from "../lobby-player/styles";

export const LineWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  ${ChatSection} {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

export const ChildrenWrapper = styled.div<ViewProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 42.5vh;
  width: 100vw;
  overflow: hidden;
  ${LobbyPlayerWrapper} {
    height: 100%;
    border-top: none;
    border-bottom: none;
    ${HandWrapper} {
      margin-top: ${({ width }) =>
        width > MEDIUM_VIEWPORT_WIDTH ? "clamp(50px, -1.04vw + 60px, 40px)" : "clamp(40px, 8.33vw + -40px, 120px)"};
    }
  }
`;

export const HorizontalLineContainer = styled.div<ViewProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ width }) => (width < MEDIUM_VIEWPORT_WIDTH ? "clamp(21px, 2.81vw + -6px, 48px)" : "clamp(21px, 2.08vw + 1px, 41px)")};
  width: 100%;
  background: linear-gradient(to right, ${color.mediumGrey} 1px, transparent 1px);
  background-size: clamp(2.38rem, 1.15vw + 1.69rem, 3.06rem);
`;

export const HorizontalLine = styled(HorizontalDivider)`
  height: 1px;
  border-bottom: 1px solid ${color.mediumGrey};
  width: 100%;
  background: none;
  margin-top: 5vh;
`;

export const HorizontalContainer = styled(HorizontalLineContainer)`
  position: relative;
  gap: 28px;
  height: 60px;
  border-top: 1px solid ${color.mediumGrey};
  border-bottom: 1px solid ${color.mediumGrey};
  ${HorizontalLine}: nth-of-type(1) {
    margin-top: 30px;
  }
`;

export const HorizontalLineContainerTwo = styled.div<ViewProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ width }) => (width < MEDIUM_VIEWPORT_WIDTH ? "clamp(21px, 2.81vw + -6px, 48px)" : "clamp(21px, 2.08vw + 1px, 41px)")};
  width: 100%;
  background: linear-gradient(to right, ${color.mediumGrey} 1px, transparent 1px);
  background-size: clamp(2.38rem, 1.15vw + 1.69rem, 3.06rem);
  gap: 28px;
  height: 15vh;
  border-top: 1px solid ${color.mediumGrey};
  border-bottom: 1px solid ${color.mediumGrey};
  ${HorizontalLine}: nth-of-type(2) {
    margin-top: ${({ height }) => (height < SMALL_VIEWPORT_HEIGHT ? "1vh" : "2vh")};
  }
`;

export const HorizontalLineInitial = styled(HorizontalDivider)``;

interface WaitingProps {
  isPlayerReady?: boolean;
}

export const WaitForOthersContainer = styled.div<WaitingProps>`
  background: ${({ isPlayerReady }) =>
    isPlayerReady
      ? color.lightGrey
      : `${PrimaryButtonWrapper}{
            display: none;
  }`};
  position: absolute;
  padding: ${margins.small2} ${margins.small2} ${margins.small2} 1.5em;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  width: 358px;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const WaitingText = styled.h3`
  font-family: ibm-plex-mono;
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 16px;
  color: ${color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const AppName = styled(BoloneyIcon)`
  height: 31.5vh;
  width: 100%;
  margin-top: 1vh;
`;

export const LineWrap = styled.section`
  height: 57.5vh;
`;

export const NameContainer = styled.section`
  width: 70vw;
  height: 100%;
  margin-left: 0.875em;
`;

export const NameWrapper = styled.section`
  position: relative;
  height: 100%;

  ${ChatSection} {
    display: block;
    height: 100%;
    border-left: 1px solid ${color.mediumGrey};
  }
`;

export const WaitingWrapper = styled.section`
  height: 42.5vh;
  width: 100vw;
`;
