import { z } from "zod";

export type MessageContent = {
  message: string;
};

export const chatMessageContentSchema = z.object({
  name: z.string(),
  color: z.string(),
  content: z.string(),
  isLocalUser: z.boolean(),
  isGroupedMessage: z.boolean(),
});

export type ChatMessageContent = z.infer<typeof chatMessageContentSchema>;
