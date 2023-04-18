import { FC } from "react";
import { useChat, useLayoutStore } from "../../service";
import { ChatMessageContent } from "../../types";
import { ChatMessageListContainer } from "../../atoms";
import { MessageInfo } from "./message-info";
import { MessageListContainer, MessageListWrapper, MessageWindowContainer } from "./styles";

export interface ChatMessageProps {
  message: ChatMessageContent | ChatMessageContent[];
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  if (Array.isArray(message)) return <ChatMessageList messages={message} />;

  const isNameShowing = !message.isLocalUser && !message.isGroupedMessage;
  return <MessageInfo message={message} isNameShowing={isNameShowing} />;
};

export interface ChatMessageListProps {
  messages: ChatMessageContent[];
}

const ChatMessageList: FC<ChatMessageListProps> = ({ messages }) => {
  const isNameShowing = !messages[0].isLocalUser;
  return (
    <ChatMessageListContainer>
      {messages.map((message, index) => (
        <MessageInfo key={index} message={message} isNameShowing={isNameShowing && index === messages.length - 1} />
      ))}
    </ChatMessageListContainer>
  );
};

export interface Props {
  isInLobby: boolean;
}

export const MessageList: FC<Props> = ({ isInLobby }) => {
  const messages = useChat();
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const isHistoryToggled = useLayoutStore((state) => state.isHistoryToggled);
  const isMenuOpen = isChatToggled && isHistoryToggled;

  if (!messages) return <></>;

  return (
    <MessageListWrapper isMenuOpen={isMenuOpen}>
      <MessageWindowContainer isInLobby={isInLobby}>
        <MessageListContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
          isMenuOpen={isMenuOpen}
        >
          {messages.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
          })}
        </MessageListContainer>
      </MessageWindowContainer>
    </MessageListWrapper>
  );
};
