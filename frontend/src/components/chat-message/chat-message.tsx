import { FC } from "react";
import { useChat } from "../../service";
import { ChatMessageContent } from "../../types";
import { GeneralMessageText, Message, MessageWrapper } from "../atoms";
import { PlayerName } from "../match-players-overview";
import { MessageListContainer, MessageListWrapper } from "./styles";

export interface ChatMessageProps {
  message: ChatMessageContent;
}

const ChatMessage: FC<ChatMessageProps> = (chatMessageProps) => {
  const message = chatMessageProps.message;

  return (
    <MessageWrapper isLocalUser={message.isLocalUser}>
      <Message isLocalUser={message.isLocalUser}>
        {!message.isLocalUser && <PlayerName name={message.name} color={message.color} />}
        <GeneralMessageText>{message.content}</GeneralMessageText>
      </Message>
    </MessageWrapper>
  );
};

export const MessageList: FC = () => {
  const messages = useChat();

  return (
    <MessageListWrapper>
      <MessageListContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {messages.map((message, index) => {
          return <ChatMessage key={index} message={message} />;
        })}
      </MessageListContainer>
    </MessageListWrapper>
  );
};
