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
  notificationHealDiceSchema,
  notificationUsePowerUpSchema,
} from "../types";
import { CallBoloney, CallExact, HealDiceCoffin, text } from "../assets";
import { Notification } from "@heroiclabs/nakama-js";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "../store";
import { getPowerUp, parseError } from "../util";

import { useLocalPlayer } from "./match";
import { nakama } from "../service";

export const useNotificationListener = () => {
  const notifications = useStore((state) => state.notifications);

  const addNotifications = useStore((state) => state.addNotification);

  const localPlayer = useLocalPlayer();

  useEffect(() => {
    if (!localPlayer) return;
    nakama.socket.onnotification = (notification) => {
      const parsedCode = notificationOpCodeSchema.safeParse(notification.code);
      if (!parsedCode.success) return;

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
    title: text.error.errorTitle,
    description: text.error.somethingWentWrong,
    boldText: [],
  };
  const parsedCode = notificationOpCodeSchema.safeParse(notification.code);
  if (!notification || !parsedCode.success || !notification.id) return defaultUnknownError;

  const matchOpcode = parsedCode.data;

  switch (matchOpcode) {
    case NotificationOpCode.BOLONEY: {
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
          boldText: [activePlayerName, text.general.you],
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
      return {
        id: notification.id,
        img: CallExact,
        title: text.match.exact,
        description: text.notifications.playerIsCallingExactOnYou(activePlayerName),
        boldText: [activePlayerName],
      };
    }
    case NotificationOpCode.HEAL_DICE: {
      const parsedNotificationContent = notificationHealDiceSchema.safeParse(notification.content);

      if (!parsedNotificationContent.success) return defaultUnknownError;

      const { activePlayerName } = parsedNotificationContent.data;

      return {
        id: notification.id,
        img: HealDiceCoffin,
        title: text.match.healDice,
        description: text.notifications.playerIsUsingHealDice(activePlayerName),
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
        title: text.notifications.playerIsDead,
        description: text.notifications.playerIsOutOfTheMatchDescription(activePlayerName),
        boldText: [activePlayerName],
      };
    }
    case NotificationOpCode.ERROR: {
      const parsedNotificationContent = notificationErrorSchema.safeParse(notification.content);

      if (!parsedNotificationContent.success) return defaultUnknownError;

      // TODO: When adding other errors, create a getErrorDescription()
      const { errorMessage } = parsedNotificationContent.data;
      const description = errorMessage === "zkDefaultError" ? text.error.zkSomethingWentWrong : errorMessage;

      return {
        id: notification.id,
        img: CallBoloney,
        title: text.error.somethingWentWrong,
        description,
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
    case NotificationOpCode.USE_POWER_UP: {
      const parsed = notificationUsePowerUpSchema.safeParse(notification.content);
      if (!parsed.success) return defaultUnknownError;

      const { callerName, targetName, id } = parsed.data;

      const powerUp = getPowerUp(id);

      const boldText = targetName ? [callerName, targetName, text.general.you] : [callerName];

      if (!powerUp) return defaultUnknownError;

      return {
        id: notification.id,
        img: powerUp.cardImage,
        title: powerUp.name,
        description: text.notifications.playerIsSpreadingShockwaves(id, localPlayer.username, callerName, targetName || undefined),
        boldText,
      };
    }
    default:
      return defaultUnknownError;
  }
};
