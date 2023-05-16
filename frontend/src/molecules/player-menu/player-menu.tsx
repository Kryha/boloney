import { FC } from "react";
import { text } from "../../assets";
import { ChatMessageContent } from "../../types";
import { Chat } from "../chat";
import { Panel } from "../panel";

interface Props {
  isChatOpen: boolean;
  isHistoryOpen?: boolean;
  isPanelExpanded: boolean;
  isSingular?: boolean;
  messages: ChatMessageContent[][];
  messageInput?: string;

  setIsChatOpen?: () => void;
  setIsHistoryOpen?: () => void;

  handleSendEvent: (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => void;
  handleKeyEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setMessageInput: (value: string) => void;
}

/**
 * This is the player menu, it is used within the match.
 * @param {boolean} isChatOpen - A boolean to define if the chat is open.
 * @param {boolean}  isHistoryOpen - A boolean to define if the history is open.
 * @param {string} isPanelExpanded -  A boolean to define if the panel has been expanded.
 * @param {Function} setIsChatOpen -  A function whose use is to set if the chat is open or not.
 * @param {Function} setIsHistoryOpen - A function whose use is to set if the history is open or not.
 */

export const PlayerMenu: FC<Props> = ({
  isChatOpen,
  isHistoryOpen = false,
  isPanelExpanded,
  messages,
  messageInput,
  setIsChatOpen,
  setIsHistoryOpen,
  handleKeyEvent,
  handleSendEvent,
  setMessageInput,
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
