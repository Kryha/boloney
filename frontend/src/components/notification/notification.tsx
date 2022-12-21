import { FC, useCallback, useEffect } from "react";
import { NOTIFICATION_VISIBILITY_TIME } from "../../constants";
import { useNotificationListener, useDeleteNotification } from "../../service";

import { ToastMessage } from "../toast-message";

export const MatchNotification: FC = () => {
  const { notifications } = useNotificationListener();
  const { deleteNotification } = useDeleteNotification();

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
      return () => clearTimeout(timer);
    }
  }, [closeNotification, notificationData]);

  if (!notificationData) return <></>;

  return (
    <ToastMessage
      img={notificationData.img}
      title={notificationData.title}
      description={notificationData.description}
      isMultipleMessage={notifications.length > 1}
      closeToast={closeNotification}
      wordsToBold={notificationData.boldText}
    />
  );
};
