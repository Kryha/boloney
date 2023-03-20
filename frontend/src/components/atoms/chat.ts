import styled from "@emotion/styled";
import { color, fontWeights, margins } from "../../design";
import { GeneralText, PlayerInfoText } from "../atoms";

export const ChatUserName = styled(PlayerInfoText)`
  width: fit-content;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${fontWeights.bold};
  :first-letter {
    text-transform: none;
  }
`;

interface MessageProps {
  isLocalUser?: boolean;
  isGroupedMessage?: boolean;
}

export const Message = styled.div<MessageProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  gap: 6px;
  border-radius: 8px;
  background: ${({ isLocalUser }): string => (isLocalUser ? color.grey : color.cloudWhite)};
  width: fit-content;
  max-width: 23.5vw;
  ${GeneralText} {
    white-space: initial;
  }
`;

export const MessageWrapper = styled.section<MessageProps>`
  padding-left: 13px;
  padding-right: 13px;
  padding-bottom: ${({ isGroupedMessage }): string => (isGroupedMessage ? "2px" : "16px")};
  align-self: ${({ isLocalUser }): string => (isLocalUser ? "flex-end" : "flex-start")};
`;

export const ChatMessageListContainer = styled.section<MessageProps>`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  ${MessageWrapper}:first-of-type {
    padding-bottom: ${margins.small4};
  }

  ${MessageWrapper}:last-of-type {
    padding-top: ${margins.small4};
  }
`;
