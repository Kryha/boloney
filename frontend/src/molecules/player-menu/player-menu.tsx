import { FC } from "react";
import { text } from "../../assets";
import { Panel } from "../panel";

interface Props {
  isChatOpen: boolean;
  isHistoryOpen?: boolean;
  isPanelExpanded: boolean;
  isSingular?: boolean;

  setIsChatOpen?: () => void;
  setIsHistoryOpen?: () => void;
}

/**
 * This is the player menu, it is used within the match.
 * @param {boolean} isChatOpen - A boolean to define if the chat is open.
 * @param {boolean}  isHistoryOpen - A boolean to define if the history is open.
 * @param {string} isPanelExpanded -  A boolean to define if the panel has been expanded.
 * @param {Function} setIsChatOpen -  A function whose use is to set if the chat is open or not.
 * @param {Function} setIsHistoryOpen - A function whose use is to set if the history is open or not.
 */

export const PlayerMenu: FC<Props> = ({ isChatOpen, isHistoryOpen = false, isPanelExpanded, setIsChatOpen, setIsHistoryOpen }) => {
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
        {/* TODO: add chat molecule */}
      </Panel>
    </>
  );
};
