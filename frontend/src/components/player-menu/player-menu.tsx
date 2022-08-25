import { FC } from "react";
import { text } from "../../assets/text";

import { Heading4 } from "../atoms";
import { PlayerMenuWrapper, PlayerMenuContainer, MenuSection, HistorySection, ChatSection, Plus, TitleContainer } from "./styles";

interface PlayerMenuProps {}

export const PlayerMenu: FC<PlayerMenuProps> = () => {
  return (
    <PlayerMenuWrapper>
      <PlayerMenuContainer>
        <HistorySection>
          <TitleContainer>
            <Heading4>{text.general.history}</Heading4>
            <Plus />
          </TitleContainer>
        </HistorySection>
        <ChatSection>
          <TitleContainer>
            <Heading4>{text.general.chat}</Heading4>
            <Plus />
          </TitleContainer>
        </ChatSection>
        <MenuSection />
      </PlayerMenuContainer>
    </PlayerMenuWrapper>
  );
};
