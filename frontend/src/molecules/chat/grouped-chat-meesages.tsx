import { FC } from "react";
import { CircleIconSVG } from "../../assets";
import { BaseColumn, BaseIcon, BaseRow, GeneralText, PlayerInfoText } from "../../atoms";
import { fontSizes, fontWeights, CHAT_MESSAGE_SIZE, spacing } from "../../design";
import { ChatMessageContent } from "../../types";
import { CircleIconWrapper, Message, MessageWrapper } from "./styles";

interface Props {
  messages: ChatMessageContent[];
}

/**
 * @param {messages} - An array of messages.
 */
export const GroupedChatMessages: FC<Props> = ({ messages }) => {
  const isNameShowing = !messages.at(0)?.isLocalUser;
  return (
    <>
      {messages.map((message, index) => (
        <MessageWrapper key={index} isGroupedMessage={message.isGroupedMessage} isLocalUser={message.isLocalUser}>
          <Message isLocalUser={message.isLocalUser} isGroupedMessage={message.isGroupedMessage} padding={CHAT_MESSAGE_SIZE}>
            <BaseColumn gap={spacing.xxs}>
              {isNameShowing && index === messages.length - 1 && (
                <BaseRow alignItems="flex-end" gap="inherit">
                  <BaseIcon
                    src={
                      <CircleIconWrapper circleColor={message.color}>
                        <CircleIconSVG />
                      </CircleIconWrapper>
                    }
                    iconColor={message.color}
                  />
                  <PlayerInfoText fontWeight={fontWeights.bold} fontSize={fontSizes.playerInfo}>
                    {message.name}
                  </PlayerInfoText>
                </BaseRow>
              )}
            </BaseColumn>
            <GeneralText>{message.content}</GeneralText>
          </Message>
        </MessageWrapper>
      ))}
    </>
  );
};
