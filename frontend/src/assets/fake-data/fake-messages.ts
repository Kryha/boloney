import { color } from "../../design";
import { ChatMessageContent } from "../../types";

export const fakeMessages: ChatMessageContent[] = [
  {
    name: "Player 1",
    color: color.red,
    content: "Hello",
    isLocalUser: false,
    isGroupedMessage: false,
  },
  {
    name: "Player 1",
    color: color.green,
    content: "How are you?",
    isLocalUser: false,
    isGroupedMessage: false,
  },
  {
    name: "Player 3",
    color: color.green,
    content: "How are you?",
    isLocalUser: false,
    isGroupedMessage: false,
  },
  {
    name: "Player 2",
    color: color.darkBlue,
    content: "Hi",
    isLocalUser: true,
    isGroupedMessage: false,
  },
];
