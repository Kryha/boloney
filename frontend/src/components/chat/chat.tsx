import { FC } from "react";

import { Heading4 } from "../atoms/text";
import { text } from "../../assets/text";
import { ChatSection } from "./styles";
import { useLayoutStore } from "../../service/layout-config";

// TODO: finish chat component
export const Chat: FC = () => {
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const toggleChat = useLayoutStore((state) => state.toggleChat);

  return (
    <ChatSection isToggled={isChatToggled}>
      <Heading4 onClick={() => toggleChat()}>{text.general.chat}</Heading4>
    </ChatSection>
  );
};
