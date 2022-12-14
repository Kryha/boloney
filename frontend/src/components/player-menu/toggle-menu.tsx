import { FC } from "react";

import { text } from "../../assets/text";
import { useIsInMatch } from "../../service";
import { useLayoutStore } from "../../service/layout-config";
import { Heading4 } from "../atoms/text";
import { ChatSection, Plus, TitleContainer, HistorySection } from "./styles";

export const ToggleMenu: FC = () => {
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const toggleChat = useLayoutStore((state) => state.toggleChat);
  const isHistoryToggled = useLayoutStore((state) => state.isHistoryToggled);
  const toggleHistory = useLayoutStore((state) => state.toggleHistory);
  const isInMatch = useIsInMatch();

  return (
    <>
      <HistorySection onClick={() => toggleHistory()} isToggled={isHistoryToggled} isInMatch={isInMatch}>
        <TitleContainer>
          <Heading4>{text.general.history}</Heading4>
          <Plus />
        </TitleContainer>
      </HistorySection>
      <ChatSection onClick={() => toggleChat()} isToggled={isChatToggled} isInMatch={isInMatch}>
        <TitleContainer>
          <Heading4>{text.general.chat}</Heading4>
          <Plus />
        </TitleContainer>
      </ChatSection>
    </>
  );
};
