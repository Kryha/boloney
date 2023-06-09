import { FC } from "react";
import { text } from "../../assets";
import { ChatInput } from "../../atoms";
import { CHAT_INPUT_SIZE } from "../../design";
import { sendMessage } from "../../service";
import { ChatMessageContent } from "../../types";
import { GroupedChatMessages } from "./grouped-chat-meesages";
import { ChatContainer, ChatMessageInput, ChatMessageListWrapper } from "./styles";

interface ChatProps {
  messages: ChatMessageContent[][];
  messageInput?: string;
  channelId?: string;

  handleKeyEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setMessageInput: (value: string) => void;
}

/**
 * @param {ChatMessageContent[][]} messages - An array of arrays of messages. Use the parseMessages function to get this.
 * @param {string} messageInput - The current value of the message input.
 * @param {string} channelId - The channel id for the match chat
 * @param {Function} handleKeyEvent - A function to handle the enter key event that will trigger the send event.
 * @param {Function} setMessageInput - A function to set/update the messageInput prop value.
 */
export const Chat: FC<ChatProps> = ({ messages, messageInput, channelId, handleKeyEvent, setMessageInput }) => {
  const handleSendEvent = (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.currentTarget.value === "") return;
    sendMessage(channelId, e.currentTarget.value);
    setMessageInput("");
  };

  return (
    <ChatContainer alignItems="center">
      <ChatMessageListWrapper>
        {messages.map((groupedMessages, index) => (
          <GroupedChatMessages key={index} messages={groupedMessages} />
        ))}
      </ChatMessageListWrapper>
      <ChatMessageInput alignItems="center" justifyContent="center">
        <ChatInput
          placeholder={text.general.typeHere}
          type="text"
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
          onClick={(event) => handleSendEvent(event)}
          onKeyDownCapture={(event) => handleKeyEvent(event)}
          width={CHAT_INPUT_SIZE}
        />
      </ChatMessageInput>
    </ChatContainer>
  );
};
