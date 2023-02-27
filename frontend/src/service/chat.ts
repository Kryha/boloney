import { ChannelMessage, Session } from "@heroiclabs/nakama-js";
import { useEffect, useState } from "react";
import { avatars } from "../assets";
import { useStore } from "../store";
import { ChatMessageContent, MessageContent, PlayerPublic } from "../types";
import { parseMessages } from "../util";
import { useLocalPlayer } from "./match";
import { nakama } from "./nakama";

export const useChat = () => {
  const addMessage = useStore((state) => state.addMessage);
  const messages = useStore((state) => state.messages);
  const localPlayer = useLocalPlayer();
  const players = useStore((state) => state.players);

  useEffect(() => {
    nakama.socket.onchannelmessage = (channelMessage: ChannelMessage) => {
      if (!channelMessage.sender_id) return;

      const player = players[channelMessage.sender_id];
      const message = parseToChatMessage(channelMessage, player);
      const isLocalUser = channelMessage.sender_id === localPlayer?.userId;

      if (message) {
        message.isLocalUser = isLocalUser;

        addMessage(message);
      }
    };
  }, [addMessage, localPlayer?.userId, messages, players]);

  if (!messages.length) return [];
  const chatMessages = parseMessages(messages);

  return chatMessages;
};

export const useChatHistory = (joinedMatch: boolean) => {
  const [isLoading, setIsLoading] = useState(true);
  const channelId = useStore((state) => state.channelId);
  const session = useStore((state) => state.session);
  const localPlayer = useLocalPlayer();
  const players = useStore((state) => state.players);
  const addMessage = useStore((state) => state.addMessage);
  const messages = useStore((state) => state.messages);

  useEffect(() => {
    if (joinedMatch || messages.length > 0) return;

    const joinChat = async () => {
      try {
        if (!channelId || !session) return;

        const messageHistory = await getChatHistory(channelId, session);
        if (messageHistory?.messages)
          messageHistory.messages.forEach((message: ChannelMessage) => {
            if (message.sender_id === undefined) return;

            const convertedMessage = parseToChatMessage(message, players[message.sender_id]);
            const isLocalUser = message.sender_id === localPlayer?.userId;

            if (convertedMessage) {
              if (isLocalUser) convertedMessage.isLocalUser = true;
              addMessage(convertedMessage);
            }
          });
      } catch (error) {
        console.info(error);
      } finally {
        setIsLoading(false);
      }
    };
    joinChat();
  }, [addMessage, channelId, joinedMatch, localPlayer, messages.length, players, session]);

  return isLoading;
};

export const sendMessage = async (matchId: string | undefined, message: string) => {
  try {
    const payload = { message };
    if (matchId && nakama.socket) await nakama.socket.writeChatMessage(matchId, payload);
  } catch (error) {
    console.error("sendMessage:", error);
  }
};

export const joinChat = async (matchId: string): Promise<string> => {
  try {
    const { id } = await nakama.socket.joinChat(matchId, 1, true, false);
    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatHistory = async (channelId: string, session: Session) => {
  try {
    const messageHistory = await nakama.client.listChannelMessages(session, channelId, 100, true);
    return messageHistory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const parseToChatMessage = (message: ChannelMessage, player: PlayerPublic): ChatMessageContent | undefined => {
  if (!(message.content && message.username)) return;

  const color = avatars[player.avatarId].color;
  const content = message.content as MessageContent;
  const newMessage: ChatMessageContent = {
    name: message.username,
    color: color,
    content: content.message,
    isLocalUser: false,
    isGroupedMessage: false,
  };
  return newMessage;
};
