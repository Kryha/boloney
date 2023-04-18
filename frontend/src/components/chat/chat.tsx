import { FC, useState } from "react";

import { text } from "../../assets/text";
import { sendMessage } from "../../service";
import { useLayoutStore } from "../../service/layout-config";
import { useStore } from "../../store";
import { ChatInput } from "../../atoms";
import { MessageList } from "../chat-message";
import { MenuToggle } from "../menu-toggle";
import { ChatWrapperSection, ChatInputContainer } from "./styles";

interface ChatProps {
  isInLobby?: boolean;
}

export const Chat: FC<ChatProps> = ({ isInLobby = false }) => {
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const toggleChat = useLayoutStore((state) => state.toggleChat);
  const channelId = useStore((state) => state.channelId);
  const [messageInput, setMessageInput] = useState("");

  const handleSendEvent = (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.currentTarget.value === "") return;
    sendMessage(channelId, e.currentTarget.value);
    setMessageInput("");
  };

  const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendEvent(e);
  };

  return (
    <MenuToggle closeMenuItem={toggleChat} isToggled={isChatToggled} title={text.general.chat} isChat isInLobby={isInLobby}>
      <ChatWrapperSection>
        <MessageList isInLobby={isInLobby} />
        <ChatInputContainer>
          <ChatInput
            placeholder={text.general.typeHere}
            type="text"
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
            onClick={(event) => handleSendEvent(event)}
            onKeyDownCapture={(event) => handleKeyEvent(event)}
          />
        </ChatInputContainer>
      </ChatWrapperSection>
    </MenuToggle>
  );
};
