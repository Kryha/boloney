import {
  notificationCallExactSchema,
  notificationPlayerLostSchema,
  NotificationContent,
  notificationErrorSchema,
  NotificationOpCode,
  notificationOpCodeSchema,
  PlayerPublic,
  notificationCallBoloneySchema,
  NkResponse,
} from "../types";
import { CallBoloney, CallExact, text } from "../assets";
import { Notification } from "@heroiclabs/nakama-js";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "../store";
import { parseError } from "../util";

import { useLocalPlayer } from "./match";
import { nakama } from "../service";

export const useNotificationListener = () => {
  const notifications = useStore((state) => state.notifications);

  const addNotifications = useStore((state) => state.addNotification);

  const localPlayer = useLocalPlayer();

  useEffect(() => {
    if (!localPlayer) return;
    nakama.socket.onnotification = (notification) => {
      const notificationContent: NotificationContent = getNotificationContent(notification, localPlayer);
      addNotifications(notificationContent);
    };
  }, [addNotifications, localPlayer]);

  return {
    notifications,
  };
};

export const useDeleteNotification = () => {
  const session = useStore((state) => state.session);
  const removeNotification = useStore((state) => state.removeNotification);
  const [isLoading, setIsLoading] = useState(false);

  const deleteNotification = useCallback(
    async (notificationIds: string[]): Promise<NkResponse> => {
      try {
        if (!session || !session.user_id) throw new Error(text.error.noSessionAvailable);
        setIsLoading(true);
        await nakama.client.deleteNotifications(session, [notificationIds[0]]);
        removeNotification(notificationIds[0]);
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [removeNotification, session]
  );
  return {
    isLoading,
    deleteNotification,
  };
};

export const getNotificationContent = (notification: Notification, localPlayer: PlayerPublic): NotificationContent => {
  // TODO: update the text for all opcodes
  const defaultUnknownError: NotificationContent = {
    id: "1001",
    img: CallBoloney,
    title: text.error.somethingWentWrong,
    description: text.error.somethingWentWrong,
    boldText: [],
  };
  const parsedCode = notificationOpCodeSchema.safeParse(notification.code);
  if (!notification || !parsedCode.success || !notification.id) return defaultUnknownError;

  const matchOpcode = parsedCode.data;

  switch (matchOpcode) {
    case NotificationOpCode.BOLONEY: {
      //TODO: Change image to figma design
      const data: NotificationContent = {
        id: notification.id,
        img: CallBoloney,
        title: text.match.boloney,
        description: "",
        boldText: [],
      };
      const parsedNotificationContent = notificationCallBoloneySchema.safeParse(notification.content);

      if (!parsedNotificationContent.success) return defaultUnknownError;

      const { activePlayerName, targetPlayerName } = parsedNotificationContent.data;

      if (localPlayer.username === targetPlayerName) {
        return {
          ...data,
          description: text.notifications.playerIsCallingBoloneyOnYou(activePlayerName),
          boldText: [activePlayerName],
        };
      }

      return {
        ...data,
        description: text.notifications.idlePlayerCallingBoloney(activePlayerName, targetPlayerName),
        boldText: [activePlayerName, targetPlayerName],
      };
    }
    case NotificationOpCode.EXACT: {
      const parsedNotificationContent = notificationCallExactSchema.safeParse(notification.content);

      if (!parsedNotificationContent.success) return defaultUnknownError;

      const { activePlayerName } = parsedNotificationContent.data;
      //TODO: Change image to figma design
      return {
        id: notification.id,
        img: CallExact,
        title: text.match.exact,
        description: text.notifications.playerIsCallingExactOnYou(activePlayerName),
        boldText: [activePlayerName],
      };
    }
    case NotificationOpCode.PLAYER_LOST: {
      const parsedNotificationContent = notificationPlayerLostSchema.safeParse(notification.content);

      if (!parsedNotificationContent.success) return defaultUnknownError;

      const { activePlayerName } = parsedNotificationContent.data;
      return {
        //TODO: Change image to figma design
        id: notification.id,
        img: CallBoloney,
        title: text.notifications.playerIsOutOfTheMatchTitle(activePlayerName),
        description: text.notifications.playerIsOutOfTheMatchDescription(activePlayerName),
        boldText: [activePlayerName],
      };
    }
    case NotificationOpCode.ERROR: {
      const parsedNotificationContent = notificationErrorSchema.safeParse(notification.content);

      if (!parsedNotificationContent.success) return defaultUnknownError;

      const { errorMessage } = parsedNotificationContent.data;
      return {
        id: notification.id,
        img: CallBoloney,
        title: text.error.somethingWentWrong,
        description: errorMessage,
        boldText: [],
      };
    }
    case NotificationOpCode.PLAYER_LEFT: {
      const parsedNotificationContent = notificationPlayerLostSchema.safeParse(notification.content);

      if (!parsedNotificationContent.success) return defaultUnknownError;

      const { activePlayerName } = parsedNotificationContent.data;

      return {
        //TODO: Change image to figma design
        id: notification.id,
        img: CallBoloney,
        title: text.notifications.playerLeftTheMatch(activePlayerName),
        description: "",
        boldText: [activePlayerName],
      };
    }
    default:
      return defaultUnknownError;
  }
};
