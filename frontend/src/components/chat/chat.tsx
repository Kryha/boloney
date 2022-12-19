import { FC } from "react";

import { text } from "../../assets/text";
import { useLayoutStore } from "../../service/layout-config";
import { MenuToggle } from "../menu-toggle";
import { ChatWrapperSection } from "./styles";

// TODO: finish chat component
export const Chat: FC = () => {
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const toggleChat = useLayoutStore((state) => state.toggleChat);

  return (
    <MenuToggle closeMenuItem={toggleChat} isToggled={isChatToggled} title={text.general.chat} isChat>
      <ChatWrapperSection></ChatWrapperSection>
    </MenuToggle>
  );
};
