import { FC, useCallback, useEffect } from "react";
import { notificationSound } from "../../assets";
import { NOTIFICATION_VISIBILITY_TIME } from "../../constants";
import { usePlaySound } from "../../hooks";
import { useNotificationListener, useDeleteNotification } from "../../service";
import { useStore } from "../../store";

import { ToastMessage } from "../toast-message";

export const MatchNotification: FC = () => {
  const { notifications } = useNotificationListener();
  const { deleteNotification } = useDeleteNotification();
  const isBottomButtonVisible = useStore((state) => state.isBottomButtonVisible);
  const playSound = usePlaySound();

  const notificationData = notifications.at(0);

  const closeNotification = useCallback(() => {
    const notification = notifications.at(0);
    if (notification) deleteNotification([notification.id]);
  }, [deleteNotification, notifications]);

  useEffect(() => {
    if (notificationData) {
      const timer = setTimeout(() => {
        closeNotification();
      }, NOTIFICATION_VISIBILITY_TIME);
      playSound(notificationSound);
      return () => clearTimeout(timer);
    }
  }, [closeNotification, notificationData, playSound]);

  if (!notificationData) return <></>;

  return (
    <ToastMessage
      img={notificationData.img}
      title={notificationData.title}
      description={notificationData.description}
      isMultipleMessage={notifications.length > 1}
      closeToast={closeNotification}
      wordsToBold={notificationData.boldText}
      isButtonVisible={isBottomButtonVisible}
    />
  );
};
