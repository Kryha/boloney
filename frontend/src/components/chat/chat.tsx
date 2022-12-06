import { FC } from "react";

import { Heading4 } from "../atoms/text";
import { text } from "../../assets/text";
import { ChatSection, Close, ChatHeadingSection } from "./styles";
import { useLayoutStore } from "../../service/layout-config";
import { useIsInMatch } from "../../service";

// TODO: finish chat component
export const Chat: FC = () => {
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const toggleChat = useLayoutStore((state) => state.toggleChat);
  const isInMatch = useIsInMatch();

  return (
    <ChatSection isToggled={isChatToggled} isInMatch={isInMatch}>
      <ChatHeadingSection onClick={() => toggleChat()}>
        <Heading4>{text.general.chat}</Heading4>
        <Close />
      </ChatHeadingSection>
    </ChatSection>
  );
};
