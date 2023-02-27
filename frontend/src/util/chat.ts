import { ChatMessageContent } from "../types";

export const parseMessages = (messages: ChatMessageContent[]) => {
  const firstMsg = messages.at(0);

  if (!firstMsg) return [];

  const groupedMessages = messages.slice(1).reduce(
    (messageList, message) => {
      const lastMessages = messageList.at(messageList.length - 1);
      if (lastMessages) {
        const lastMsg = lastMessages.at(lastMessages.length - 1);
        // check if the same user has sent a multiple messages in a row and group them
        if (lastMsg && lastMsg.name === message.name) {
          lastMessages.push(message);
          messageList[messageList.length - 1] = lastMessages;
        } else {
          // new user has sent a message
          messageList.push([message]);
        }
      }
      return messageList;
    },
    [[firstMsg]]
  );

  const chatMessages = groupedMessages.map((groupMessage) => {
    if (groupMessage.length === 1) {
      // first message is not grouped
      groupMessage[0] = { ...groupMessage[0], isGroupedMessage: false };
      return groupMessage[0];
    }

    return groupMessage.map((message) => {
      // add boolean to group same user messages together
      if (message) message = { ...message, isGroupedMessage: true };
      return message;
    });
  });

  return chatMessages;
};
