import { FC } from "react";
import { BoloneyLogoIconSVG } from "../../assets";
import { BaseIcon } from "../../atoms";
import { color, iconSize } from "../../design";
import { ChatMessageContent } from "../../types";
import { PlayerMenu } from "../player-menu";
import { PlayerLogoContainer, PlayerLogoWrapper } from "./styles";

interface Props {
  messages: ChatMessageContent[][];
  messageInput: string;
  channelId?: string;

  handleKeyEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setMessageInput: (value: string) => void;
}

/**
 * This the component that is displayed in the bottom of the lobby. It includes the boloney logo and the chat.
 * @param {messages} - An array of arrays of messages. Use the parseMessages function to get this.
 * @param {messageInput} - The current value of the message input.
 * @param {string} channelId - The channel id for the match chat
 * @param {handleKeyEvent} - A function to handle the enter key event that will trigger the send event.
 * @param {setMessageInput} - A function to set/update the messageInput prop value.
 */

export const PlayerLogo: FC<Props> = ({ messages, messageInput, handleKeyEvent, setMessageInput, channelId }) => {
  return (
    <PlayerLogoWrapper>
      <PlayerLogoContainer>
        <BaseIcon
          src={<BoloneyLogoIconSVG />}
          iconColor={color.peach}
          width={iconSize.fluid}
          height={iconSize.auto}
          alignSelf="flex-start"
        />
      </PlayerLogoContainer>
      <PlayerMenu
        isChatOpen
        isPanelExpanded
        messages={messages}
        isSingular
        channelId={channelId}
        handleKeyEvent={handleKeyEvent}
        setMessageInput={setMessageInput}
        messageInput={messageInput}
      />
    </PlayerLogoWrapper>
  );
};
