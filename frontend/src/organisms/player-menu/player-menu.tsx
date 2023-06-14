import { FC } from "react";

import { text } from "../../assets";
import { MatchHistoryComponent } from "../match-history";
import { HistoryEvent, PlayerPublic, ChatMessageContent } from "../../types";
import { Chat, Panel } from "../../molecules";

interface Props {
  isChatOpen: boolean;
  isHistoryOpen?: boolean;
  isPanelExpanded: boolean;
  isSingular?: boolean;
  historyEvents?: HistoryEvent[];
  players?: Record<string, PlayerPublic>;
  localPlayer?: PlayerPublic;
  messages: ChatMessageContent[][];
  messageInput: string;
  channelId?: string;

  setMessageInput: (value: string) => void;
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
 * @param {string} channelId - The channel id for the match chat
 * @param {ChatMessageContent[][]} messages - An array of grouped messages.
 * @param {string} chatChannelId - The id of the chat channel provided by nakama.
 * @param {Function} setIsChatOpen -  A function whose use is to set if the chat is open or not.
 * @param {Function} setIsHistoryOpen - A function whose use is to set if the history is open or not.
 */

// TODO: Replace MatchHistoryComponent import with organism when implemented
export const PlayerMenu: FC<Props> = ({
  isChatOpen,
  isSingular,
  isHistoryOpen = false,
  isPanelExpanded,
  historyEvents,
  players,
  localPlayer,
  messages,
  messageInput,
  channelId,
  setMessageInput,
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
          {!isSingular && <MatchHistoryComponent historyEvents={historyEvents} players={players} localPlayer={localPlayer} />}
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
          channelId={channelId}
          handleKeyEvent={handleKeyEvent}
          setMessageInput={setMessageInput}
        />
      </Panel>
    </>
  );
};
