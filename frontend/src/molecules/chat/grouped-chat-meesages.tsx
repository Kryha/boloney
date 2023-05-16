import { FC } from "react";
import { CircleIconSVG } from "../../assets";
import { BaseIcon, BaseRow, GeneralText, PlayerInfoText } from "../../atoms";
import { fontSizes, fontWeights, spacing } from "../../design";
import { ChatMessageContent } from "../../types";
import { CircleIconWrapper, Message, MessageWrapper } from "./styles";

interface Props {
  messages: ChatMessageContent[];
}

/**
 * @param {messages} - An array of messages.
 */
export const GroupedChatMessages: FC<Props> = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        <MessageWrapper key={index} isGroupedMessage={message.isGroupedMessage} isLocalUser={message.isLocalUser}>
          <Message isLocalUser={message.isLocalUser} isGroupedMessage={message.isGroupedMessage} padding={spacing.xs}>
            {index === 0 && !message.isLocalUser && (
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
            <GeneralText>{message.content}</GeneralText>
          </Message>
        </MessageWrapper>
      ))}
    </>
  );
};
