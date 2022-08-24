import { FC } from "react";
import { text } from "../../assets/text";

import { color } from "../../design";
import { Heading4 } from "../atoms";
import { PlayerMenuWrapper, PlayerMenuContainer, MenuSection, HistorySection, ChatSection } from "./styles";

interface PlayerMenuProps {}

export const PlayerMenu: FC<PlayerMenuProps> = () => {
  return (
    <PlayerMenuWrapper>
      <PlayerMenuContainer>
        <HistorySection>
          <Heading4>{text.general.history}</Heading4>
        </HistorySection>
        <ChatSection>
          <Heading4>{text.general.chat}</Heading4>
        </ChatSection>
        <MenuSection />
      </PlayerMenuContainer>
    </PlayerMenuWrapper>
  );
};
