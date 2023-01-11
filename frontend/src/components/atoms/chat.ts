import styled from "@emotion/styled";
import { color, margins } from "../../design";
import { Paragraph } from "./text";

export const ChatUserName = styled(Paragraph)`
  width: 17.5vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  :first-letter {
    text-transform: none;
  }
`;

interface MessageProps {
  isLocalUser: boolean;
}

export const Message = styled.div<MessageProps>`
  padding: ${margins.small5};
  text-transform: none;
  transform: rotate(180deg);
  direction: ltr;
  background: ${color.white};
  border-radius: ${margins.small1};
  display: flex;
  flex-direction: column;
  padding: ${margins.small2};
  gap: 6px;
  background: ${({ isLocalUser }): string => (isLocalUser ? color.grey : color.white)};
  width: fit-content;
`;

export const MessageWrapper = styled.section<MessageProps>`
  display: flex;
  flex-direction: column;
  padding: ${margins.small1} ${margins.small2} ${margins.small1} ${margins.large0};
  align-items: ${({ isLocalUser }): string => (isLocalUser ? "flex-end" : "flex-start")};
`;
