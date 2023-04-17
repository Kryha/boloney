import { FC, useEffect } from "react";

import { notificationSound } from "../../assets";
import { NOTIFICATION_VISIBILITY_TIME } from "../../constants";
import { usePlaySound } from "../../hooks";
import { useDeleteNotification } from "../../service";
import { useStore } from "../../store";
import { NotificationContent } from "../../types";
import { ToastMessage } from "../toast-message";

interface MatchNotificationProps {
  notification: NotificationContent;
  isMultipleMessage: boolean;
}

export const MatchNotification: FC<MatchNotificationProps> = ({ notification, isMultipleMessage }) => {
  const { deleteNotification } = useDeleteNotification();
  const isBottomButtonVisible = useStore((state) => state.isBottomButtonVisible);

  const playSound = usePlaySound();

  useEffect(() => {
    const timer = setTimeout(() => {
      deleteNotification([notification.id]);
    }, NOTIFICATION_VISIBILITY_TIME);
    return () => clearTimeout(timer);
  }, [deleteNotification, notification]);

  useEffect(() => {
    playSound(notificationSound);
  }, [playSound]);

  return (
    <ToastMessage
      img={notification.img}
      title={notification.title}
      description={notification.description}
      isMultipleMessage={isMultipleMessage}
      closeToast={() => deleteNotification([notification.id])}
      wordsToBold={notification.boldText}
      isButtonVisible={isBottomButtonVisible}
    />
  );
};
