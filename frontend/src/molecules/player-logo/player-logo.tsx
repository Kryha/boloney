import { FC } from "react";
import { BoloneyLogoIconSVG } from "../../assets";
import { BaseIcon } from "../../atoms";
import { color, iconSize } from "../../design";
import { ChatMessageContent } from "../../types";
import { PlayerMenu } from "../player-menu";
import { PlayerLogoContainer, PlayerLogoWrapper } from "./styles";

// TODO: enable chat handlesend event
interface Props {
  messages: ChatMessageContent[][];
  messageInput?: string;
  // TODO: reintroduce
  // handleSendEvent: (e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLInputElement, MouseEvent>) => void;
  handleKeyEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setMessageInput: (value: string) => void;
}

/** This the component that is displayed in the botoom of the lobby. It includes the boloney logo and the chat.
 * @param {messages} - An array of arrays of messages. Use the parseMessages function to get this.
 * @param {messageInput} - The current value of the message input.
 * @param {handleSendEvent} - A function to handle the send message event.
 * @param {handleKeyEvent} - A function to handle the enter key event that will trigger the send event.
 * @param {setMessageInput} - A function to set/update the messageInput prop value.
 */

export const PlayerLogo: FC<Props> = ({ messages, messageInput, handleKeyEvent, setMessageInput }) => {
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
        // TODO: reintroduce
        // handleSendEvent={handleSendEvent}
        handleKeyEvent={handleKeyEvent}
        setMessageInput={setMessageInput}
        messageInput={messageInput}
      />
    </PlayerLogoWrapper>
  );
};
