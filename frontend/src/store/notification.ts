import { StateCreator } from "zustand";
import { NotificationContent } from "../types";

export interface NotificationSlice {
  notifications: NotificationContent[];

  removeNotification: (notificationId: string) => void;
  addNotification: (notification: NotificationContent) => void;
}

export const createNotificationSlice: StateCreator<NotificationSlice, [], [], NotificationSlice> = (set) => ({
  notifications: [],

  addNotification: (notification: NotificationContent) =>
    set(({ notifications }) => {
      const notificationSet = new Set(notifications);

      notificationSet.add(notification);

      const allNotifications = Array.from(notificationSet);
      return { notifications: allNotifications };
    }),

  removeNotification: (notificationId: string) =>
    set(({ notifications }) => {
      const allNotifications = notifications.filter((notifications) => notifications.id !== notificationId);

      return { notifications: allNotifications };
    }),
});
