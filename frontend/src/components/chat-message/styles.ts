import styled from "@emotion/styled";

interface Props {
  isMenuOpen: boolean;
}

export const MessageListWrapper = styled.div<Props>`
  height: ${({ isMenuOpen }): string => (isMenuOpen ? "36.13vh" : "78.17vh")};
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const MessageListContainer = styled.span<Props>`
  height: ${({ isMenuOpen }): string => (isMenuOpen ? "36.13vh" : "78.17vh")};
  flex-direction: column-reverse;
  display: flex;
  overflow-y: auto;
`;

interface MessageProps {
  isInLobby: boolean;
}

export const MessageWindowContainer = styled.section<MessageProps>`
  flex-direction: column-reverse;
  display: flex;
  overflow-y: auto;
  height: ${({ isInLobby }): string => (isInLobby ? "calc(32.3vh - 60px)!important" : "auto")};
`;
