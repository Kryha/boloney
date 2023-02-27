import styled from "@emotion/styled";
import { CloseIcon } from "../../assets/icons";
import { color, margins } from "../../design";
import { MessageListContainer, MessageListWrapper } from "../chat-message/styles";
import { ChatWrapperSection } from "../chat/styles";

interface LayoutProps {
  isMenuOpen: boolean;
  isToggled: boolean;
  isInMatch: boolean;
  isChat: boolean;
  isInLobby: boolean;
}

export const MenuToggleSection = styled.section<LayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${margins.small1};
  height: ${({ isMenuOpen }): string => (isMenuOpen ? "47.25vh" : "89vh")};
  width: 25vw;
  border-top: ${({ isChat }): string => (isChat ? "none" : `1px solid ${color.mediumGrey}`)};
  // TODO: Refactor for dryness
  ${({ isMenuOpen, isChat, isInLobby }): string =>
    isMenuOpen && isChat
      ? `
        ${ChatWrapperSection}{
          height: ${isInLobby ? "calc(37.3vh - 60px)!important" : "41.75vh"};
        }
        border-bottom:  none;
  `
      : `
      ${ChatWrapperSection}{
        height: ${isInLobby ? "calc(37.3vh - 60px)!important" : "83.5vh"};
      }
      ${MessageListWrapper}{
        height: ${isInLobby ? "100%" : "78.17vh"};
      }
      ${MessageListContainer}{
        height: ${isInLobby ? "100%" : "78.17vh"};
      }
      border-bottom:1px solid ${color.mediumGrey};
  `};
  border-left: ${({ isInMatch }) => (isInMatch ? `1px solid ${color.mediumGrey}` : "none")};
  display: ${({ isToggled }) => !isToggled && "none"};
`;

export const Close = styled(CloseIcon)``;

export const MenuToggleHeadingSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${margins.small4} ${margins.small4} 0px;
  gap: ${margins.small1};
  cursor: pointer;
  width: 25vw;
  height: 5.2vh;
`;

export const MenuChildrenContainer = styled.div`
  width: 25vw;
  overflow: scroll;
  background: ${color.lightGrey};
`;
