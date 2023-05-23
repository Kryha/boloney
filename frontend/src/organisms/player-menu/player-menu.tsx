import { FC } from "react";

import { text } from "../../assets";
import { Chat, Panel } from "../../molecules";
import { ChatMessageContent } from "../../types";

interface Props {
  isChatOpen: boolean;
  isHistoryOpen?: boolean;
  isPanelExpanded: boolean;
  isSingular?: boolean;
  messages: ChatMessageContent[][];
  messageInput: string;
  setMessageInput: (value: string) => void;
  handleSendEvent: (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => void;
  handleKeyEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  setIsChatOpen?: () => void;
  setIsHistoryOpen?: () => void;
}

/**
 * This is the player menu, it is used within the match.
 * @param {boolean} isChatOpen - A boolean to define if the chat is open.
 * @param {boolean}  isHistoryOpen - A boolean to define if the history is open.
 * @param {string} isPanelExpanded -  A boolean to define if the panel has been expanded.
 * @param {boolean} isSingular - A boolean to define if the panel is singular.
 * @param {ChatMessageContent[][]} messages - An array of grouped messages.
 * @param {string} chatChannelId - The id of the chat channel provided by nakama.
 * @param {Function} setIsChatOpen -  A function whose use is to set if the chat is open or not.
 * @param {Function} setIsHistoryOpen - A function whose use is to set if the history is open or not.
 */

export const PlayerMenu: FC<Props> = ({
  isChatOpen,
  isHistoryOpen = false,
  isPanelExpanded,
  messages,
  messageInput,
  setMessageInput,
  handleSendEvent,
  handleKeyEvent,
  setIsChatOpen,
  setIsHistoryOpen,
}) => {
  return (
    <>
      {!!setIsHistoryOpen && (
        <Panel
          heading={text.general.history}
          isHeaderSelected={isHistoryOpen}
          setIsHeaderSelected={setIsHistoryOpen}
          isPanelExpanded={isPanelExpanded}
          isMultiplePanels
        >
          {/* TODO: add history molecule */}
        </Panel>
      )}
      <Panel
        heading={text.general.chat}
        isHeaderSelected={isChatOpen}
        setIsHeaderSelected={setIsChatOpen}
        isPanelExpanded={isPanelExpanded}
        isMultiplePanels={!!setIsHistoryOpen}
      >
        <Chat
          messages={messages}
          messageInput={messageInput}
          handleSendEvent={handleSendEvent}
          handleKeyEvent={handleKeyEvent}
          setMessageInput={setMessageInput}
        />
      </Panel>
    </>
  );
};
