import { StateCreator } from "zustand";
import { ChatMessageContent } from "../types";

export interface ChatSlice {
  messages: ChatMessageContent[];

  addMessage: (message: ChatMessageContent) => void;
  clearMessages: () => void;
}

export const createChatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (set) => ({
  messages: [],

  addMessage: (message) =>
    set(({ messages }) => {
      return { messages: [message, ...messages] };
    }),
  clearMessages: () => set(() => ({ messages: [] })),
});
