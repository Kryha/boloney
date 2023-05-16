import { FC } from "react";
import { text } from "../../assets";
import { ChatInput } from "../../atoms";
import { ChatMessageContent } from "../../types";
import { GroupedChatMessages } from "./grouped-chat-meesages";
import { ChatContainer, ChatMessageListWrapper } from "./styles";

interface ChatProps {
  messages: ChatMessageContent[][];
  messageInput?: string;

  handleSendEvent: (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => void;
  handleKeyEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setMessageInput: (value: string) => void;
}

/**
 * @param {messages} - An array of arrays of messages. Use the parseMessages function to get this.
 * @param {messageInput} - The current value of the message input.
 * @param {handleSendEvent} - A function to handle the send message event.
 * @param {handleKeyEvent} - A function to handle the enter key event that will trigger the send event.
 * @param {setMessageInput} - A function to set/update the messageInput prop value.
 */
export const Chat: FC<ChatProps> = ({ messages, messageInput, handleSendEvent, handleKeyEvent, setMessageInput }) => {
  return (
    <ChatContainer>
      <ChatMessageListWrapper>
        {messages.map((groupedMessages, index) => (
          <GroupedChatMessages key={index} messages={groupedMessages} />
        ))}
      </ChatMessageListWrapper>
      <ChatInput
        placeholder={text.general.typeHere}
        type="text"
        value={messageInput}
        onChange={(event) => setMessageInput(event.target.value)}
        onClick={(event) => handleSendEvent(event)}
        onKeyDownCapture={(event) => handleKeyEvent(event)}
      />
    </ChatContainer>
  );
};
