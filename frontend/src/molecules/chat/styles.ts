import styled from "@emotion/styled";
import { BaseColumn, BaseIconWrapper, BaseRow, GeneralText, MessageBlock } from "../../atoms";
import { CHAT_MESSAGE_SIZE, color, containerWidth, spacing } from "../../design";

export const ChatContainer = styled(BaseColumn)`
  width: ${containerWidth.fluid};
  height: inherit;
`;

export const ChatMessageListWrapper = styled(BaseColumn)`
  height: inherit;
  width: ${containerWidth.fluid};
  overflow: scroll;
  flex-direction: column-reverse;
  margin-bottom: ${spacing.s};
`;

interface Props {
  circleColor: string;
}

export const CircleIconWrapper = styled(BaseIconWrapper)<Props>`
  > svg {
    fill: ${({ circleColor }): string => circleColor};
    rect {
      fill: ${({ circleColor }): string => circleColor};
    }
  }
`;

interface MessageProps {
  isLocalUser?: boolean;
  isGroupedMessage?: boolean;
}

export const Message = styled(MessageBlock)<MessageProps>`
  box-shadow: none;
  background: ${({ isLocalUser }): string => (isLocalUser ? color.grey : color.cloudWhite)};
  max-width: 23.5vw;
  ${GeneralText} {
    white-space: initial;
  }
`;

export const MessageWrapper = styled.section<MessageProps>`
  padding-left: ${spacing.s};
  padding-right: ${spacing.s};
  padding-top: ${({ isGroupedMessage }): string => (isGroupedMessage ? spacing.xxs : spacing.s)};
  align-self: ${({ isLocalUser }): string => (isLocalUser ? "flex-end" : "flex-start")};
`;

export const ChatMessageInput = styled(BaseRow)`
  margin-bottom: ${CHAT_MESSAGE_SIZE};
  width: ${containerWidth.fluid};
`;
