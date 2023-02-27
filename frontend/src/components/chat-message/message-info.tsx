import { FC } from "react";
import { ChatMessageContent } from "../../types";
import { MessageWrapper, Message, GeneralMessageText } from "../atoms";
import { PlayerName } from "../match-players-overview";

export interface MessageAtomProps {
  message: ChatMessageContent;
  isNameShowing: boolean;
}

export const MessageInfo: FC<MessageAtomProps> = ({ message, isNameShowing = false }) => {
  return (
    <MessageWrapper isLocalUser={message.isLocalUser} isGroupedMessage={message.isGroupedMessage}>
      <Message isLocalUser={message.isLocalUser}>
        {isNameShowing && <PlayerName name={message.name} color={message.color} />}
        <GeneralMessageText>{message.content}</GeneralMessageText>
      </Message>
    </MessageWrapper>
  );
};
