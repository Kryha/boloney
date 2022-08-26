import { FC } from "react";

import { text } from "../../assets/text";
import { useLayoutStore } from "../../service/layout-config";
import { Heading4 } from "../atoms/text";
import { PlayerMenuWrapper, PlayerMenuContainer, MenuSection, ChatSection, Plus, TitleContainer } from "./styles";
import { History } from "../history";
import { Chat } from "../chat";

export const PlayerMenu: FC = () => {
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const toggleChat = useLayoutStore((state) => state.toggleChat);

  return (
    <PlayerMenuWrapper>
      <PlayerMenuContainer>
        <History />
        <ChatSection onClick={() => toggleChat()} isToggled={isChatToggled}>
          <TitleContainer>
            <Heading4>{text.general.chat}</Heading4>
            <Plus />
          </TitleContainer>
        </ChatSection>
        <Chat />
        <MenuSection />
      </PlayerMenuContainer>
    </PlayerMenuWrapper>
  );
};
