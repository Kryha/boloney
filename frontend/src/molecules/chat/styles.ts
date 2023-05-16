import styled from "@emotion/styled";
import { BaseColumn, BaseIconWrapper, GeneralText, MessageBlock } from "../../atoms";
import { color } from "../../design";

export const ChatContainer = styled(BaseColumn)`
  width: 100%;
  height: inherit;
`;

export const ChatMessageListWrapper = styled(BaseColumn)`
  height: inherit;
  width: 100%;
  overflow: scroll;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  background: ${({ isLocalUser }): string => (isLocalUser ? color.grey : color.cloudWhite)};
  max-width: 23.5vw;
  ${GeneralText} {
    white-space: initial;
  }
`;

export const MessageWrapper = styled.section<MessageProps>`
  padding-left: 13px;
  padding-right: 13px;
  padding-top: ${({ isGroupedMessage }): string => (isGroupedMessage ? "2px" : "16px")};
  align-self: ${({ isLocalUser }): string => (isLocalUser ? "flex-end" : "flex-start")};
`;
